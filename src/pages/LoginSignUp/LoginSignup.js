import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles, useTheme } from "@material-ui/core";
import { Box } from "@mui/material";
import { Container, Typography } from "@mui/material";
import SignUp from "./SignUp";
import Login from "./Login";
import { register } from "../../redux/actions/userAction";
import { login } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import backLogin from "../../Images/backLogin1.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    height: "100%",
    width: "100%",
    color: "black",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
  },

  boxWrapper: {
    //marginLeft: "20%",
    width: "100%",
    marginTop: "14%",
    [theme.breakpoints.down("md")]: {
      marginTop: "2%",
    },
    marginRight: "5%",
    padding: 50,
    height: "100%",
    textAlign: "center",
    //border: "1px solid black",
  },
  formWrapper: {
    boxShadow: "2px 0px 10px rgb(109,110,110)",
    backdropFilter: "blur(25)",
    borderRadius: "20px",
    height: "90%",
    [theme.breakpoints.down("md")]: { height: "100%" },
    border: "1px solid grey",
    // width: "50%",
    //position: "absolute",
    backgroundColor: "#E9D5DA",

    "& .MuiTextField-root": {
      //margin: theme.spacing(1),
      background: "#ffffff",
      //width: "380px",
      //width: "155%",
      borderRadius: 5,
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
    "& Label.Mui-focused": {
      color: "#000000",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
}));

export default function LoginSignup(props) {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);

  const signupHandler = (user) => {
    dispatch(register(user));
  };

  const loginHandler = (user) => {
    dispatch(login(user));
  };

  let isLoginPage = props.isLoginPage;
  let content = "";

  if (isLoginPage === "login") {
    content = (
      <Login
        classes={classes}
        onLogin={loginHandler}
        userLoginData={userLogin}
      />
    );
  } else if (isLoginPage === "signup") {
    content = (
      <SignUp
        classes={classes}
        onSignup={signupHandler}
        userRegisterData={userRegister}
      />
    );
  }

  return (
    <Fragment>
      <Box className={classes.root}>
        {/* <CssBaseline /> */}
        <Grid container>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            display={{ xs: "none", lg: "block", md: "block" }}
            // sx={{
            //   [theme.breakpoints.down("sm")]: {
            //     height: "2%",
            //   },
            // }}
          >
            <Typography
              variant="h1"
              sx={{
                flex: 1,
                fontFamily: ["Dancing Script", "cursive"].join(","),
                fontWeight: 500,
                margin: "10%",
                marginTop: "25%",
                padding: 10,
                // color: "#663300",
                color: "#000000",
              }}
            >
              Happy Crafting
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            // style={{ backgroundColor: "#000000", height: "102vh" }}
          >
            <Box className={classes.boxWrapper}>{content}</Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
