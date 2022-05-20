import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@mui/icons-material/Create";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  updateUserProfile,
  getUserProfile,
  getCartDataByUser,
} from "../../redux/actions/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  containerWrapper: {
    margin: "50px",
  },
  typographyClass: {
    fontFamily: ["El Messiri", "sans-serif"].join(","),
  },

  formWrapper: {
    backgroundColor: "#ECE5DB",

    padding: "30px",
    // height: "50vh",
    width: "93vh",
    margin: "10px",

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#3F3422",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3F3422",
      },
    },
  },
  btnClass: {
    "&.MuiButton-root": {
      backgroundColor: "#000000",
      width: "30vh",
      color: "#ffffff",
      "&:hover": {
        color: "#000000",
        backgroundColor: "#ffffff",
      },
    },
  },
  deactivateBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#940011",
      width: "30vh",
      color: "#ffffff",
      "&:hover": {
        color: "#940011",
        backgroundColor: "#ffffff",
      },
    },
  },
  linksBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#000000",
      width: "30vh",
      color: "#ffffff",
      "&:hover": {
        color: "#000000",
        backgroundColor: "#ffffff",
      },
    },
  },

  linksWrapper: {
    backgroundColor: "#ECE5DB",
    padding: "30px",
    textAlign: "center",
  },

  links: {
    // border: "1px solid black",
    color: "#583053",
    textDecoration: "none",
    fontSize: 23,
  },
}));

export default function MyAccount() {
  const classes = useStyles();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  //const userLogin = useSelector((state) => state.userLogin);
  const [snackOpen, setSnackOpen] = useState(false);

  // const { token } = userLogin;
  const token = JSON.parse(localStorage.getItem("userInfo"));
  const { success, userInfo } = userUpdateProfile;
  const { user } = userProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [dispatch]);

  useEffect(() => {
    if (!token.access) {
      navigate("/login");
    } else {
      console.log(user);
      if (!user || !user.email || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserProfile());
        console.log(user);
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
    <Fragment>
      <Box className={classes.root}>
        <Container className={classes.containerWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 30 }}
                >
                  Account
                </Grid>
              </Grid>
              <Grid borderBottom={2} margin={1}>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 18 }}
                >
                  Edit Profile
                </Grid>
              </Grid>
              <Grid className={classes.formWrapper}>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 15 }}
                  padding={0.5}
                >
                  Username
                </Grid>
                <Grid>
                  <TextField
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: "#F8F9FB",
                    }}
                    padding={0.5}
                    value={user ? user.username : ""}
                    disabled
                  />
                </Grid>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 15 }}
                  padding={0.5}
                >
                  Name
                </Grid>
                <Grid>
                  <TextField
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#F8F9FB" }}
                    padding={0.5}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 15 }}
                  padding={0.5}
                >
                  Email Address
                </Grid>
                <Grid>
                  <TextField
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#F8F9FB" }}
                    padding={0.5}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid style={{ textAlign: "right" }}>
                  <Button
                    className={classes.btnClass}
                    style={{ marginTop: "30px" }}
                    onClick={profileUpdateHandler}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
              <Grid borderBottom={2} margin={1}>
                <Grid
                  className={classes.typographyClass}
                  style={{ fontSize: 18 }}
                  marginTop={10}
                >
                  Change Password
                </Grid>
              </Grid>

              <Grid className={classes.formWrapper}>
                <Grid style={{ textAlign: "left" }}>
                  <Button className={classes.btnClass}>Change Password</Button>
                </Grid>
              </Grid>

              <Grid className={classes.formWrapper} marginTop={5}>
                <Grid style={{ textAlign: "left" }}>
                  <Button className={classes.deactivateBtn}>
                    Deactivate Account
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Container className={classes.linksWrapper}>
                <Grid margin={1}>
                  {/* <NavLink
                    to="/"
                    className={classes.links}
                    style={{ textAlign: "right" }}
                  >
                    Orders
                  </NavLink> */}
                  <Button
                    className={classes.linksBtn}
                    onClick={() => {
                      navigate("/myorder");
                    }}
                  >
                    Orders
                  </Button>
                </Grid>
                <Grid margin={1}>
                  {/* <NavLink to="/" className={classes.links}>
                    My Collection
                  </NavLink> */}
                  <Button className={classes.linksBtn}>My Collection</Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Container>
        {userInfo && (
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
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
        )}
      </Box>
    </Fragment>
  );
}
