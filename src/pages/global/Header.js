import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { InputBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { makeStyles, alpha } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../redux/actions/userAction";
import Badge from "@mui/material/Badge";
import { Avatar, Drawer, Icon } from "@mui/material";
import { Divider, ListItemIcon } from "@material-ui/core";
import { PersonAdd } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import { Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getCartDataByUser } from "../../redux/actions/userAction";
import { GiHamburgerMenu } from "react-icons/gi";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    height: "12rem",
    width: "100%",
    backgroundColor: "#000000",
  },
  appBarHamBurger: {
    background: "none",
    padding: 10,
    height: "6rem",
    width: "100%",
    backgroundColor: "#000000",
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
    width: "100%",
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
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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

function Header(props) {
  const classes = useStyles();

  //Dimension
  const [showNavBar, setShowNavBar] = useState(false);

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

  const [showSearch, setShowSearch] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { sections, title } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);

  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const { cartData } = userGetCartDataByUser;

  const username = window.localStorage.getItem("username");

  useEffect(() => {
    setCartCount(0);
    cartData &&
      cartData.map((item) => {
        setCartCount((prevState) => prevState + item.quantity);
      });
  }, [cartData]);

  const token = JSON.parse(localStorage.getItem("userInfo"));

  const searchIconClick = () => {
    setShowSearch((prevstate) => !prevstate);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.innerText === "Logout") {
      dispatch(logout());
      navigate("/");
    } else if (e.target.innerText === "Profile") {
      navigate("/profile");
    } else if (e.target.innerText === "My Account") {
      navigate("/myaccount");
    } else if (e.target.innerText === "My Orders") {
      navigate("/myorder");
    } else if (e.target.innerText === "My Collection") {
      navigate("/mycollection");
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
                      {!token && (
                        <Button
                          onClick={() => {
                            navigate("/login");
                          }}
                          style={{ color: "black" }}
                        >
                          Login | Join
                        </Button>
                      )}
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
                              to="/profile"
                              className={classes.drawerLinkUser}
                            >
                              Profile
                            </NavLink>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <NavLink
                              to="/myorder"
                              className={classes.drawerLinkUser}
                            >
                              My Orders
                            </NavLink>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <NavLink
                              to="/mycollection"
                              className={classes.drawerLinkUser}
                            >
                              My Collection
                            </NavLink>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <NavLink
                              to="/viewcart"
                              className={classes.drawerLinkUser}
                            >
                              View Cart
                            </NavLink>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        marginTop: 30,
                        textAlign: "right",
                      }}
                    >
                      {token && (
                        <Button
                          style={{
                            width: "50%",
                            color: "#777777",
                          }}
                          onClick={() => {
                            dispatch(logout());
                            navigate("/");
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

              <div className={classes.search}>
                {showSearch && (
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                )}
              </div>
              <IconButton onClick={searchIconClick}>
                <SearchIcon className={classes.searchIcon} />
              </IconButton>

              {!token && (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ color: "#ffffff" }}
                >
                  Login | Join
                </Button>
              )}
              {token && (
                <div>
                  <IconButton
                    onClick={() => {
                      navigate("/viewcart");
                    }}
                  >
                    <Badge badgeContent={cartCount} color="primary">
                      <ShoppingCartIcon style={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-owns={Boolean(anchorEl) ? "account-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle className={classes.accountCircle} />
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
                    <MenuItem disabled>
                      <Typography style={{ padding: 5, height: 20 }}>
                        Welcome {username}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} id="Profile">
                      <Typography style={{ padding: 5 }}>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Typography style={{ padding: 5 }}>My Orders</Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Typography style={{ padding: 5 }}>
                        My Collection
                      </Typography>
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
              {sections.map((section, index) => (
                <NavLink
                  className={classes.navlink}
                  key={index}
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

export default Header;
