import {
  AppBar,
  Container,
  CssBaseline,
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
import { useDispatch, useSelector } from "react-redux";
import { InputBase } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../../redux/actions/userAction";
import { Avatar } from "@mui/material";
import { Divider, ListItemIcon } from "@material-ui/core";
import { PersonAdd } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import { Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getAdminDetail } from "../../../redux/actions/adminAction";
import {
  ADMIN_DETAILS_RESET,
  ADMIN_LOGOUT,
} from "../../../constants/adminConstants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    height: "12rem",
    width: "100%",
    // backgroundColor: "#2D2D2D",
    // backgroundColor: "#3A3845",
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
    // color: "#F76C27",
    // color: "#F7CCAC",
    color: "#ffffff",
    fontFamily: ["Dancing Script", "cursive"].join(","),
    textDecoration: "none",
  },
  appBarWrapper: {
    width: "100 %",
    // margin: "0 auto",
    marginTop: "3%",
  },
  navlink: {
    textDecoration: "none",
    // color: "#B0B0B0 ",
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
  const location = useLocation();
  const classes = useStyles();
  const [showNavBar, setShowNavBar] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { sections, title } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);

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
    // console.log(anchorEl);
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
                    // onClick={handleClose}
                    getContentAnchorEl={null}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose} id="Profile">
                      {/* <PersonAdd /> */}
                      <Typography style={{ padding: 5 }}>Profile</Typography>
                    </MenuItem>

                    {/* <MenuItem onClick={handleClose}> */}
                    {/* <CreateIcon /> */}
                    {/* <Typography style={{ padding: 5 }}>My Account</Typography>
                    </MenuItem> */}

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
