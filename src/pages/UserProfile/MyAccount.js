import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { Divider } from "@material-ui/core";
import ChangePassword from "../../components/ChangePassword";
import {
  CHANGE_PASSWORD_RESET,
  USER_UPDATE_PROFILE_RESET,
} from "../../constants/userConstants";
import {
  updateUserProfile,
  getUserProfile,
  getCartDataByUser,
  changePassword,
  deactivateUserAccount,
  logout,
} from "../../redux/actions/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    marginTop: "5%",
  },

  typographyClass: {
    fontFamily: ["El Messiri", "sans-serif"].join(","),
  },

  formWrapper: {
    padding: "30px",
    width: "93%",
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
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    maxHeight: "95%",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
  linksWrapper: {
    backgroundColor: "#ECE5DB",
    padding: "30px",
    textAlign: "center",
    width: "93%",
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
  const theme = useTheme();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userDeactivateUserAccount = useSelector(
    (state) => state.userDeactivateUserAccount
  );

  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo"));

  const { success, userInfo } = userUpdateProfile;
  const { user } = userProfile;
  const { success: deactivateShopSuccess } = userDeactivateUserAccount;

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { changePasswordData } = userChangePassword;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (deactivateShopSuccess) {
      dispatch(logout());
    }
  }, [deactivateShopSuccess]);

  useEffect(() => {
    if (changePasswordData === "") {
      setTimeout(handleClose, 2000);
    }
  }, [changePasswordData]);

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

  const handleOpen = () => {
    dispatch({ type: CHANGE_PASSWORD_RESET });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const changePasswordHandler = (data) => {
    dispatch({ type: CHANGE_PASSWORD_RESET });
    dispatch(changePassword(data));
  };

  const deactivateUserAccountHandler = () => {
    dispatch(deactivateUserAccount());
  };

  return (
    <Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modelWrapper}>
          <ChangePassword
            classes={classes}
            onChangePassword={changePasswordHandler}
          />
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"Use Google's location service?"} */}
          Are you sure, you want to deactivate your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deactivating account you won't be able to shop products anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={deactivateUserAccountHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8} md={8}>
            <Grid
              item
              xs={12}
              className={classes.typographyClass}
              style={{ fontSize: 30 }}
            >
              Account
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.typographyClass}
              style={{ fontSize: 18 }}
            >
              Edit Profile
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              xs={12}
              className={classes.formWrapper}
              style={{ backgroundColor: "#ECE5DB" }}
            >
              <Grid
                xs={12}
                item
                className={classes.typographyClass}
                style={{ fontSize: 15 }}
                padding={0.5}
              >
                Username
              </Grid>
              <Grid item xs={12}>
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
                item
                xs={12}
                className={classes.typographyClass}
                style={{ fontSize: 15 }}
                padding={0.5}
              >
                Name
              </Grid>
              <Grid item xs={12}>
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
                item
                xs={12}
                className={classes.typographyClass}
                style={{ fontSize: 15 }}
                padding={0.5}
              >
                Email Address
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button
                  className={classes.btnClass}
                  style={{ marginTop: "30px" }}
                  onClick={profileUpdateHandler}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>

            <Grid
              className={classes.typographyClass}
              style={{ fontSize: 18 }}
              marginTop={10}
            >
              Change Password
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.formWrapper}
              style={{ backgroundColor: "#ECE5DB", marginTop: "2%" }}
            >
              <Grid item xs={12} style={{ textAlign: "left" }}>
                <Button className={classes.btnClass} onClick={handleOpen}>
                  Change Password
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.formWrapper}
              marginTop={5}
              style={{ backgroundColor: "#ECE5DB" }}
            >
              <Grid item xs={12} style={{ textAlign: "left" }}>
                <Button
                  className={classes.deactivateBtn}
                  onClick={handleOpenDialog}
                >
                  Deactivate Account
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            lg={4}
            md={4}
            sx={{
              marginTop: "6%",
              [theme.breakpoints.down("sm")]: {
                marginTop: "4%",
              },
            }}
          >
            <Grid
              className={classes.typographyClass}
              style={{ fontSize: 18 }}
              display={{ sx: "block", lg: "none", md: "none" }}
            >
              Shortcuts
            </Grid>
            <Grid
              item
              xs={12}
              display={{ sx: "block", lg: "none", md: "none" }}
            >
              <Divider />
            </Grid>
            <Grid
              container
              style={{
                backgroundColor: "#ECE5DB",
                padding: "30px",
                width: "93%",
                marginTop: "2%",
              }}
            >
              <Grid item xs={12}>
                <Button
                  className={classes.linksBtn}
                  onClick={() => {
                    navigate("/myorder");
                  }}
                >
                  Orders
                </Button>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "3%" }}>
                <Button
                  className={classes.linksBtn}
                  onClick={() => {
                    navigate("/mycollection");
                  }}
                >
                  My Collection
                </Button>
              </Grid>
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
