import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Alert,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
  },
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { success, error: e } = userChangePassword;

  const changePasswordHandler = () => {
    setError("");
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
      props.onChangePassword(data);
    }
  };

  console.log(e);

  useEffect(() => {
    if (success) {
      setMessage("Password Changes");
    }
  }, [success]);

  return (
    <Fragment>
      <Container className={props.classes.formWrapper}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} style={{ textAlign: "center", fontSize: 20 }}>
            Change Password
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
            Old Password
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Old Password"
              onChange={(e) => {
                setOldPassword(e.target.value);
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
            New Password
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
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
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor: "#745D3E",
                width: "60%",
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
          {message && (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Alert severity="success" style={{ width: "80%" }}>
                {message}
              </Alert>
            </Grid>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}
