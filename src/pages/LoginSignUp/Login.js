import TextField from "@material-ui/core/TextField";
import React, { useState, useRef, Fragment } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink, useNavigate } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export default function Login(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackOpen(true);
    const user = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    props.onLogin(user);
  };

  const { token, error, loading } = props.userLoginData;

  // if (token) {
  //   console.log(token);
  // }

  let errorArr = [];

  if (error) {
    Object.entries(error).forEach((key, value) => {
      errorArr.push(key[0].toUpperCase());
      errorArr.push(key[1]);
    });
  }
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    if (token) {
      navigate("/");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={props.classes.formWrapper}
    >
      <Box
        sx={{
          marginTop: "15%",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          style={{ textAlign: "center", color: "#000000" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: "10%", marginBottom: "10%" }}
        >
          {/* <Grid container spacing={2} style={{ marginLeft: "4rem" }}> */}
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                required
                variant="outlined"
                id="email"
                placeholder="Username"
                name="username"
                inputRef={usernameInputRef}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                inputRef={passwordInputRef}
              />
            </Grid>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Grid
            sx={{
              width: "75%",
              alignContent: "center",
              marginLeft: "10%",
            }}
          >
            {!loading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#000000",
                  color: "#ffffff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#000000",
                  },
                }}
              >
                Login
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
                Login
              </LoadingButton>
            )}
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: "10px" }}
          >
            <Grid item xs>
              <NavLink to="#" style={{ color: "#000000" }}>
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/signup" style={{ color: "#000000" }}>
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {token && (
        <Snackbar
          open={snackOpen}
          autoHideDuration={500}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Success</AlertTitle>
            User Login SuccessFull
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {/* {errorArr.map((item) => {
              return <p>{item}</p>;
            })} */}
            {/* {errorArr.join("\n")} */}
            Invalid username or password
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}
