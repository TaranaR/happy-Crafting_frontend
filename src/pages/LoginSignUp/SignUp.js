import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useTheme } from "@material-ui/core";

export default function SignUp(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const theme = useTheme();

  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackOpen(true);
    const user = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
      email: emailInputRef.current.value,
    };

    props.onSignup(user);
  };
  const { userInfo, error, loading } = props.userRegisterData;
  let errorArr = [];

  if (error) {
    Object.entries(error).forEach((key, value) => {
      errorArr.push(`${key[0].toUpperCase()} : ${key[1][0]}`);
    });
  }
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    // if (userInfo) {
    //   navigate("/login");
    // }
  };

  if (userInfo) {
    if (userInfo.detail) {
      navigate("/login");
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={props.classes.formWrapper}
    >
      <Box
        sx={{
          marginTop: "15%",
          padding: 2,
          [theme.breakpoints.down("sm")]: {
            marginTop: "10%",
          },
        }}
      >
        <Grid item xs={12} display={{ xs: "block", lg: "none", md: "none" }}>
          <Typography
            variant="h3"
            sx={{
              flex: 1,
              fontFamily: ["Dancing Script", "cursive"].join(","),
              fontWeight: "bold",
              backgroundImage:
                "repeating-conic-gradient( #af4261 1%, #764C47 5%)",
              backgroundSize: "100%",
              WebkitBackgroundClip: "text",
              MozBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Happy Crafting
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            color: "#000000",
            [theme.breakpoints.down("sm")]: { marginTop: "3%" },
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: 25,
              },
            }}
          >
            Sign up
          </Typography>
        </Grid>
        <Grid component="form" onSubmit={handleSubmit} sx={{ mt: "10%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                placeholder="Email Address"
                name="email"
                inputRef={emailInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                placeholder="User Name"
                name="UserName"
                inputRef={usernameInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                inputRef={passwordInputRef}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{ width: "75%", alignContent: "center", marginLeft: "10%" }}
          >
            {!loading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: "3%",
                  mb: "2%",
                  background: "#000000",
                  color: "#ffffff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#000000",
                  },
                }}
              >
                Sign Up
              </Button>
            )}
            {loading && (
              <LoadingButton
                loading
                variant="outlined"
                loadingPosition="start"
                type="submit"
                fullWidth
                style={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </LoadingButton>
            )}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" variant="body2" style={{ color: "#000000" }}>
                Already have an account? Login
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* {userInfo && (
        <Snackbar
          open={snackOpen}
          autoHideDuration={5000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Success</AlertTitle>
            {userInfo.detail}
          </Alert>
        </Snackbar>
      )} */}

      {error && (
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorArr.map((item) => {
              return <p>{item}</p>;
            })}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}
