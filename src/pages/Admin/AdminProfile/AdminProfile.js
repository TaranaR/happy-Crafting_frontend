import { Fragment, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MyAccount from "./Forms/MyAccount";
import ChangePassword from "./Forms/ChangePassword";
import { useDispatch } from "react-redux";
import { CHANGE_PASSWORD_RESET } from "../../../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    // border: "1px solid black",
  },
  button: {
    padding: "10px",
    width: "70%",
  },
  menuBtn: {
    textAlign: "center",
    marginTop: "20px",
  },
}));

export default function AdminProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [page, setPage] = useState("MY ACCOUNT");

  let content = "";
  const username = window.localStorage.getItem("username");

  if (page === "MY ACCOUNT") {
    content = <MyAccount />;
  } else if (page === "PASSWORD") {
    content = <ChangePassword />;
  }

  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} lg={3} md={3}>
            <Box style={{ textAlign: "center", marginTop: "50px" }}>
              <Typography sx={{ textTransform: "capitalize", fontSize: 25 }}>
                Welcome {username}
              </Typography>
            </Box>
            <Box style={{ justifyContent: "center", display: "flex" }}>
              <Divider style={{ width: "30vh", marginTop: "10px" }} />
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                ref={btnRef}
                onClick={(e) => {
                  setPage(e.target.innerText);
                }}
              >
                MY ACCOUNT
              </Button>
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                ref={btnRef}
                onClick={(e) => {
                  dispatch({ type: CHANGE_PASSWORD_RESET });
                  setPage(e.target.innerText);
                }}
              >
                Password
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={9} md={9} style={{ height: "100vh" }}>
            {content}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
