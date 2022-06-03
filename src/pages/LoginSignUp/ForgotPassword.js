import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Alert,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import backLogin from "../../Images/backLogin1.jpeg";
import { verifyEmailId, setNewPassword } from "../../redux/actions/userAction";
import { sendEmail } from "../../redux/actions/sellerAction";

import {
  SET_NEW_PASSWORD_RESET,
  VERIFY_EMAILID_RESET,
} from "../../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  bgImage: {
    backgroundImage: `url(${backLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    height: "40%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
  boxWrapper: {
    backgroundColor: "#E9D5DA",
    position: "absolute",
    top: "28%",
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    height: "50%",
    borderRadius: 10,
    padding: "2%",
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(0);
  const [open, setOpen] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");

  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const userSetNewPassword = useSelector((state) => state.userSetNewPassword);

  const { loading, verified } = userVerifyEmail;
  const { setNewPasswordData, success } = userSetNewPassword;
  const [errorContent, setErrorContent] = useState("");

  useEffect(() => {
    dispatch({ type: VERIFY_EMAILID_RESET });
  }, []);

  useEffect(() => {
    if (verified) {
      generateOtp();
    }
  }, [verified]);

  useEffect(() => {
    if (success && error === "") {
      setTimeout(() => {
        handleClose();
        navigate("/login");
      }, 2000);
    }
  }, [success, error]);

  const verifyEmailIdHandler = () => {
    dispatch(verifyEmailId(email));
  };

  const generateOtp = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    if (verified) {
      const content = {
        to_user: verified.email,
        to_name: verified.name,
        from_name: "HappyCrafting",
        otp: generatedOTP,
      };
      dispatch(sendEmail(content));
      setOtp(generatedOTP);
    }
  };

  const handleOpen = () => {
    dispatch({ type: SET_NEW_PASSWORD_RESET });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const verifyOtp = () => {
    if (parseInt(enteredOTP) === otp) {
      handleOpen();
      setError("");
    } else {
      setErrorContent("OTP didn't match");
    }
  };

  const setNewPasswordHandler = () => {
    setError("");
    if (newPwd === "" || confirmPwd === "") {
      setError("Enter all the data");
    } else if (newPwd !== confirmPwd) {
      console.log(newPwd, confirmPwd);
      setError("New Password and Confirm Password must be same.");
    } else {
      const data = {
        email: email,
        new_password: newPwd,
        confirm_password: confirmPwd,
      };
      dispatch({ type: SET_NEW_PASSWORD_RESET });
      dispatch(setNewPassword(data));
    }
  };

  return (
    <Box className={classes.root}>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modelWrapper}>
          <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12} style={{ textAlign: "center", fontSize: 20 }}>
              Set New Password
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              lg={3}
              md={3}
              display={{ xs: "none", lg: "block", md: "block" }}
            >
              New Password
            </Grid>
            <Grid item xs={12} lg={9} md={9}>
              <TextField
                type="password"
                size="small"
                fullWidth
                variant="outlined"
                placeholder="New Password"
                onChange={(e) => {
                  setNewPwd(e.target.value);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={3}
              md={3}
              display={{ xs: "none", lg: "block", md: "block" }}
            >
              Confirm Password
            </Grid>
            <Grid item xs={12} lg={9} md={9}>
              <TextField
                type="password"
                size="small"
                fullWidth
                variant="outlined"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#000000",
                  width: "60%",
                }}
                onClick={setNewPasswordHandler}
              >
                Change
              </Button>
            </Grid>
            {error && (
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert severity="error" style={{ width: "80%" }}>
                  {error}
                </Alert>
              </Grid>
            )}

            {success && error === "" && (
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert severity="success" style={{ width: "80%" }}>
                  Password Changed.
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      <Grid container>
        <Grid item xs={12} className={classes.bgImage}>
          <Typography
            sx={{
              fontFamily: ["Dancing Script", "cursive"].join(","),
              fontWeight: 500,
              padding: 10,
              color: "#000000",
              fontSize: 60,
              [theme.breakpoints.down("md")]: {
                fontSize: 35,
              },
            }}
          >
            Happy Crafting
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box className={classes.boxWrapper}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: 25,
                  }}
                >
                  Forgot Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "8%" }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Enter Registered Email Id"
                  sx={{
                    background: "#ffffff",
                    borderRadius: 1,
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "3%" }}>
                {!loading && (
                  <Button
                    sx={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      width: "50%",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                    onClick={verifyEmailIdHandler}
                  >
                    Verify Email
                  </Button>
                )}
                {loading && (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    sx={{ backgroundColor: "#ffffff", width: "50%" }}
                  >
                    Verifing Email
                  </LoadingButton>
                )}
              </Grid>
              {verified && (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      marginTop: "3%",
                      fontFamily: ["Lora", "serif"].join(","),
                    }}
                  >
                    OTP has been sent to your Email Id.
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: "3%" }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter OTP"
                      sx={{
                        background: "#ffffff",
                        borderRadius: 1,
                      }}
                      onChange={(e) => {
                        setEnteredOTP(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: "3%" }}>
                    <Button
                      sx={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        width: "50%",
                        "&:hover": {
                          backgroundColor: "#000000",
                        },
                      }}
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </Button>
                  </Grid>

                  {errorContent && (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        marginTop: "3%",
                        fontFamily: ["Lora", "serif"].join(","),
                      }}
                    >
                      {errorContent}
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
