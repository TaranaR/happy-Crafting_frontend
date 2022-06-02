import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Grid, TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../../redux/actions/userAction";
import { USER_UPDATE_PROFILE_RESET } from "../../../../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      textAlign: "center",
    },
  },
}));

export default function MyAccount() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackOpen, setSnackOpen] = useState(false);
  const userProfile = useSelector((state) => state.userProfile);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const token = JSON.parse(localStorage.getItem("userInfo"));
  const { success, userInfo } = userUpdateProfile;
  const { user } = userProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (!token.access) {
      navigate("/login");
    } else {
      if (!user || !user.email || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserProfile());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, user, success]);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
    setSnackOpen(true);

    dispatch(updateUserProfile({ name: name, email: email }));
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
    dispatch(getUserProfile());
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ fontSize: 20 }}>
          My Account
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container style={{ margin: "20px", textAlign: "center" }}>
          <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
            UserName
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            md={9}
            sx={{
              textAlign: "left",
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
              [theme.breakpoints.down("md")]: {
                textAlign: "center",
              },
            }}
          >
            <TextField
              size="small"
              sx={{
                backgroundColor: "#F8F9FB",
                width: "50vh",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
              padding={0.5}
              value={user ? user.username : ""}
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            md={3}
            sx={{
              padding: "15px",
            }}
          >
            Name
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            md={9}
            sx={{
              textAlign: "left",
              [theme.breakpoints.down("sm")]: { textAlign: "center" },
              [theme.breakpoints.down("md")]: { textAlign: "center" },
            }}
          >
            <TextField
              size="small"
              fullWidth
              sx={{
                width: "50vh",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
              padding={0.5}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
            Email Address
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            md={9}
            sx={{
              textAlign: "left",
              [theme.breakpoints.down("sm")]: { textAlign: "center" },
              [theme.breakpoints.down("md")]: { textAlign: "center" },
            }}
          >
            <TextField
              size="small"
              fullWidth
              sx={{
                width: "50vh",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
              padding={0.5}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              padding: "15px",
              marginTop: "2%",
              textAlign: "left",
              //marginLeft: "30%",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                color: "#ffffff",
                width: "180px",
              }}
              onClick={profileUpdateHandler}
            >
              update
            </Button>
          </Grid>
          {userInfo && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                sx={{ width: "30%" }}
              >
                <Alert
                  onClose={handleSnackClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  <AlertTitle>Success</AlertTitle>
                  {userInfo.message}
                </Alert>
              </Snackbar>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
