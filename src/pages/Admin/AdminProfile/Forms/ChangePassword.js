import { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid, TextField, Alert } from "@mui/material";
import { Divider } from "@material-ui/core";
import { CHANGE_PASSWORD_RESET } from "../../../../constants/userConstants";
import { changePassword } from "../../../../redux/actions/userAction";

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

export default function ChangePassword() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { changePasswordData, success } = userChangePassword;

  const changePasswordHandler = () => {
    setError("");
    console.log("hiii");
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setError("Enter all the data");
    } else if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password must be same.");
    } else {
      const data = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      dispatch({ type: CHANGE_PASSWORD_RESET });
      dispatch(changePassword(data));
    }
  };

  useEffect(() => {
    if (changePasswordData) {
      setError(changePasswordData);
    }
  }, [changePasswordData]);

  useEffect(() => {
    if (success) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [success]);

  console.log(success);

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ fontSize: 20 }}>
          Change Password
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container style={{ margin: "20px", textAlign: "center" }}>
          <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
            Old Password
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
              type="password"
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
              placeholder="Old Password"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
            New Password
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
              type="password"
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
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
            Confirm Password
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
              type="password"
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
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
                width: "200px",
              }}
              onClick={changePasswordHandler}
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
          {alert && (
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
      </Grid>
    </Container>
  );
}
