import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { InputBase } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { makeStyles, alpha } from "@material-ui/core/styles";
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
    backgroundColor: "#2D2D2D",
  },
  searchIcon: {
    color: "#ffffff",
    fontSize: "2rem",
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: "#F76C27",
    fontFamily: ["Dancing Script", "cursive"].join(","),
    textDecoration: "none",
  },
  appBarWrapper: {
    width: "100 %",
    margin: "0 auto",
    marginTop: "2rem",
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
    margin: 10,
    justifyContent: "space-between",
    fontWeight: 700,
  },
}));

export default function AdminHeader(props) {
  const location = useLocation();
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const { sections, title } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);

  const token = JSON.parse(localStorage.getItem("userInfo"));

  //const { token } = userLogin;

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
    } else if (e.target.innerText === "Profile") {
      //navigate("/profile");
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
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
            {/* <IconButton onClick={searchIconClick}>
              <SearchIcon className={classes.searchIcon} />
            </IconButton> */}
            {/* {!token && (
              <Button
                onClick={(e) => {
                  const { token } = userLogin;
                  console.log(token);
                  navigate("/login");
                }}
                style={{ color: "#ffffff" }}
              >
                Login | Join
              </Button>
            )} */}
            {token && (
              <div>
                <IconButton
                  aria-owns={Boolean(anchorEl) ? "account-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{ transform: "scale(1.8)" }} />
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
    </React.Fragment>
  );
}
