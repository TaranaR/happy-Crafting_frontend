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
  },
  titleLink: {
    color: "#ffffff",
    fontFamily: ["Dancing Script", "cursive"].join(","),
    textDecoration: "none",
  },
  appBarWrapper: {
    width: "100%",
    //margin: "0 auto",
    marginTop: "3%",
  },
  navlink: {
    textDecoration: "none",
    // color: "#B0B0B0 ",
    color: "#ffffff",
    "&:hover": {
      // textDecoration: "underline",
      // color: "#AC80B8",
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
    color: "#ffffff",
    fontWeight: "bold",
  },
  // accountCircle: {
  //   "&:before": {
  //     transform: "scale3d(1.5, 1.5, 5)",
  //   },
  //   "&:hover": {
  //     transform: "scale3d(1.5, 1.5, 5)",
  //   },
  // },
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
    // console.log(anchorEl);
  };

  const handleClose = (e) => {
    if (e.target.innerText === "Logout") {
      dispatch(logout());
      navigate("/");
    } else if (e.target.innerText === "Profile") {
      navigate("/profile");
    } else if (e.target.innerText === "My Account") {
      navigate("/myaccount");
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
                    backgroundColor: "#000000",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: 10,
                    }}
                  >
                    <Grid item xs={12} style={{ marginTop: 30 }}>
                      {/* <Divider style={{ backgroundColor: "white" }} /> */}
                      {!token && (
                        <Button
                          onClick={() => {
                            navigate("/login");
                          }}
                          style={{ color: "white" }}
                        >
                          Login | Join
                        </Button>
                      )}
                      {token && (
                        <div>
                          <NavLink to="/profile" className={classes.drawerLink}>
                            Profile
                          </NavLink>
                          <br />
                          <NavLink to="/profile" className={classes.drawerLink}>
                            Orders
                          </NavLink>
                          <br />
                          <NavLink to="/profile" className={classes.drawerLink}>
                            My Collection
                          </NavLink>
                          <br />
                          <NavLink
                            to="/viewcart"
                            className={classes.drawerLink}
                          >
                            View Cart
                          </NavLink>
                        </div>
                      )}
                      <Divider style={{ backgroundColor: "white" }} />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 30 }}>
                      {sections.map((section) => (
                        <>
                          <NavLink
                            key={section.title}
                            to={section.url}
                            className={classes.drawerLink}
                          >
                            {section.title}
                          </NavLink>
                          <br />
                        </>
                      ))}
                      <Divider style={{ backgroundColor: "white" }} />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 50 }}>
                      {token && (
                        <Button
                          style={{ width: "100%", color: "white" }}
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
                    // aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                    aria-haspopup="true"
                    // aria-expanded={Boolean(anchorEl) ? "true" : undefined}
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
                    <MenuItem onClick={handleClose} id="Profile">
                      {/* <PersonAdd /> */}
                      <Typography style={{ padding: 5 }}>Profile</Typography>
                    </MenuItem>

                    {/* <MenuItem onClick={handleClose}> */}
                    {/* <CreateIcon /> */}
                    {/* <Typography style={{ padding: 5 }}>My Account</Typography>
                  </MenuItem> */}

                    <MenuItem onClick={handleClose}>
                      {/* <CreateIcon /> */}
                      <Typography style={{ padding: 5 }}>Orders</Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      {/* <CreateIcon /> */}
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

export default Header;
