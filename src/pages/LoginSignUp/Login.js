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
import { useTheme } from "@material-ui/core";

export default function Login(props) {
  const theme = useTheme();
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
              // color: "#00000",
              // backgroundColor: "#f3ec78",
              // backgroundImage:
              //   "linear-gradient(to left, #ccccff 0%, #9900cc 100%)",
              // backgroundImage: "conic-gradient(#af4261, #af4261)",
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
            Login
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: "10%" }}
        >
          {/* <Grid container spacing={2} style={{ marginLeft: "4rem" }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Username"
                name="username"
                inputRef={usernameInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
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
                  mt: "3%",
                  mb: "2%",
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
            <Grid item xs={4}>
              <NavLink to="#" style={{ color: "#000000" }}>
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item xs={8}>
              <NavLink to="/signup" style={{ color: "#000000" }}>
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
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
