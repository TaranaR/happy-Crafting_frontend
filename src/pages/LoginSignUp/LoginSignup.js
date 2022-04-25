import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { Container, Typography } from "@mui/material";
import SignUp from "./SignUp";
import Login from "./Login";
import { register } from "../../redux/actions/userAction";
import { login } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import backLogin from "../../Images/backLogin.jpeg";
import { Balcony, Label } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "102vh",
    color: "black",
  },

  boxWrapper: {
    marginLeft: "5rem",
    marginTop: "6rem",
    padding: 50,
    height: "75vh",
    textAlign: "center",
  },
  formWrapper: {
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "2px 0px 10px rgb(109,110,110)",
    backdropFilter: "blur(25)",
    borderRadius: "20px",
    height: "550px",
    width: "400px",
    position: "absolute",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      background: "#ffffff",
      width: "380px",
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
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="h1"
              sx={{
                flex: 1,
                fontFamily: ["Dancing Script", "cursive"].join(","),
                fontWeight: 500,
                margin: 10,
                marginTop: 25,
                padding: 10,
                color: "#BD8B28",
              }}
            >
              Happy Crafting
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.boxWrapper}>{content}</Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
