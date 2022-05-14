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

export default function SignUp(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

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
      <Box sx={{ marginTop: "15%" }}>
        <Typography
          component="h1"
          variant="h3"
          style={{ textAlign: "center", color: "#000000" }}
        >
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: "3%" }}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                inputRef={emailInputRef}
                sx={{ width: "155%" }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="UserName"
                label="User Name"
                name="UserName"
                inputRef={usernameInputRef}
                sx={{ width: "155%" }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={passwordInputRef}
                sx={{ width: "155%" }}
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
        </Box>
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
