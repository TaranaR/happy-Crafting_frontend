import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import { getUserProfile } from "../../../redux/actions/userAction";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { updateUserProfile } from "../../../redux/actions/userAction";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import {
  Container,
  Grid,
  Divider,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import ChangePassword from "../../ChangePassword";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "13%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      textAlign: "center",
    },
  },
  deactivateBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#940011",
      width: "250px",
      color: "#ffffff",
      "&:hover": {
        color: "#940011",
      },
    },
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    maxHeight: "95%",
    //bgcolor: "background.paper",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
  formWrapper: {
    marginTop: "5%",
    marginRight: "5%",
    textAlign: "center",

    // [theme.breakpoints.down("sm")]: {
    //   "&.MuiOutlinedInput-root": {
    //     width: "10px",
    //   },
    // },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#3F3422",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3F3422",
      },
    },
  },
  changePwdBtns: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

export default function SellerAccount() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const userProfile = useSelector((state) => state.userProfile);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const token = JSON.parse(localStorage.getItem("userInfo"));
  const { success, userInfo } = userUpdateProfile;
  const { user } = userProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token.access) {
      navigate("/login");
    } else {
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <ChangePassword classes={classes} />
          </Box>
        </Modal>
      )}
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
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "180px",
                }}
                onClick={profileUpdateHandler}
              >
                update
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Change Password
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ margin: "20px", textAlign: "center" }}>
            <Grid
              xs={12}
              sx={{
                textAlign: "left",
                [theme.breakpoints.down("sm")]: { textAlign: "center" },
                [theme.breakpoints.down("md")]: { textAlign: "center" },
                // [theme.breakpoints.only("sm")]: {
                //   textAlign: "left",
                // },
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "250px",
                }}
                onClick={handleOpen}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{ margin: "20px", textAlign: "center" }}>
            <Grid
              xs={12}
              sx={{
                textAlign: "left",
                [theme.breakpoints.down("sm")]: { textAlign: "center" },
                [theme.breakpoints.down("md")]: { textAlign: "center" },
              }}
            >
              <Button className={classes.deactivateBtn}>
                Deactivate Account
              </Button>
            </Grid>
          </Grid>
        </Grid>

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
      </Container>
    </Fragment>
  );
}
