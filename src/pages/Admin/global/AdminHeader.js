import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Grid,
  Typography,
} from "@material-ui/core";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { Logout } from "@mui/icons-material";
import { logout } from "../../../redux/actions/userAction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    height: "12rem",
    width: "100%",
    backgroundColor: "#242F9B",
  },
  appBarHamBurger: {
    background: "none",
    padding: 10,
    height: "6rem",
    width: "100%",
    backgroundColor: "#242F9B",
  },
  searchIcon: {
    color: "#ffffff",
    fontSize: "2rem",
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
  },
  titleLink: {
    color: "#ffffff",
    fontFamily: ["Dancing Script", "cursive"].join(","),
    textDecoration: "none",
  },
  appBarWrapper: {
    width: "100 %",
    marginTop: "3%",
  },
  navlink: {
    textDecoration: "none",
    color: "#ffffff",
    "&:hover": {
      color: "#b0b0b0",
      border: "1",
    },
  },
  linkWrapper: {
    margin: "1%",
    justifyContent: "space-between",
    fontWeight: 700,
  },
  drawerLink: {
    textDecoration: "none",
    color: "#000000",
    fontWeight: "bold",
  },
  drawerLinkUser: {
    textDecoration: "none",
    color: "#777777",
  },
}));

export default function AdminHeader(props) {
  const classes = useStyles();
  const [showNavBar, setShowNavBar] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { sections } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const token = JSON.parse(localStorage.getItem("userInfo"));

  const username = window.localStorage.getItem("username");

  useEffect(() => {
    if (window.innerWidth > 900) {
      setShowNavBar(true);
    } else if (window.innerWidth < 900) {
      setShowNavBar(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setShowNavBar(true);
      } else if (window.innerWidth < 900) {
        setShowNavBar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.innerText === "Logout") {
      dispatch(logout());
      navigate("/login");
    } else if (e.target.innerText === "Profile") {
      navigate("/adminprofile");
    }
    setAnchorEl(null);
  };

  const toggleDrawerHandler = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const closeDrawerHandler = () => {
    setShowDrawer(false);
  };

  return (
    <React.Fragment>
      {!showNavBar && (
        <AppBar
          className={classes.appBarHamBurger}
          elevation={0}
          position="static"
        >
          <Container className={classes.appBarWrapper}>
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                <NavLink to="/" className={classes.titleLink}>
                  Happy Crafting
                </NavLink>
              </Typography>
              <IconButton onClick={toggleDrawerHandler}>
                <GiHamburgerMenu style={{ color: "#ffffff", fontSize: 30 }} />
              </IconButton>
              <Drawer
                anchor="right"
                variant="temporary"
                open={showDrawer}
                onClose={closeDrawerHandler}
              >
                <Grid
                  container
                  style={{
                    textAlign: "center",
                    height: "100%",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: 10,
                      marginTop: 20,
                    }}
                  >
                    {token && (
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "5%", marginBottom: "20%" }}
                      >
                        Welcome {username}
                      </Grid>
                    )}

                    {sections.map((section, index) => (
                      <div key={index}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            marginTop: "10%",
                          }}
                        >
                          <NavLink
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            to={section.url}
                            className={classes.drawerLink}
                          >
                            <ArrowBackIosNewIcon
                              style={{ transform: "scale(0.5)" }}
                            />
                            {section.title}
                          </NavLink>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider style={{ backgroundColor: "GrayText" }} />
                        </Grid>
                      </div>
                    ))}
                    <Grid
                      item
                      xs={12}
                      style={{
                        marginTop: 50,
                        marginBottom: 30,
                      }}
                    >
                      {token && (
                        <Grid item xs={12} style={{ color: "#D0C9C0" }}>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <NavLink
                              to="/adminprofile"
                              className={classes.drawerLinkUser}
                            >
                              Profile
                            </NavLink>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        border: "1px silid black",
                        textAlign: "right",
                      }}
                    >
                      {token && (
                        <Button
                          style={{
                            width: "20%",
                            marginLeft: "70%",
                            color: "#777777",
                          }}
                          onClick={() => {
                            dispatch(logout());
                            navigate("/login");
                          }}
                        >
                          Logout
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      {showNavBar && (
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Container className={classes.appBarWrapper}>
            <Toolbar>
              <Typography variant="h3" className={classes.title}>
                <NavLink to="/" className={classes.titleLink}>
                  Happy Crafting
                </NavLink>
              </Typography>

              {token && (
                <div>
                  <IconButton
                    aria-owns={Boolean(anchorEl) ? "account-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle style={{ transform: "scale(1.6)" }} />
                  </IconButton>

                  <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose} id="Profile">
                      <Typography style={{ padding: 5 }}>Profile</Typography>
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      onClick={handleClose}
                      style={{ justifyContent: "space-evenly" }}
                    >
                      <Logout />
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
            <Toolbar className={classes.linkWrapper}>
              {sections.map((section) => (
                <NavLink
                  className={classes.navlink}
                  key={section.title}
                  to={section.url}
                  sx={{ p: 1, flexShrink: 0 }}
                >
                  {section.title}
                </NavLink>
              ))}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </React.Fragment>
  );
}
