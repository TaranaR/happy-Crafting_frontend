import { Fragment, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@material-ui/core";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  getCartDataByUser,
} from "../../redux/actions/userAction";
import userLogo from "../../Images/userProfile.gif";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_USER_BY_ID_RESET,
} from "../../constants/userConstants";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  btnClass: {
    "&.MuiButton-root": {
      backgroundColor: "#F8F9FB",
      width: "50vh",
      color: "#000000",
      border: "2px solid black",
    },
  },
  containerWrapper: {
    marginTop: "5rem",
    backgroundColor: "#D5C6B1",
    //backgroundColor: "#ECE5DB",
    borderRadius: 5,
    textAlign: "center",
    padding: "30px",
    height: "50vh",
  },
  typographyClass: {
    fontFamily: ["El Messiri", "sans-serif"].join(","),
    //fontFamily: ["Greycliff", "sans-serif"].join(","),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  useEffect(() => {
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch({ type: GET_USER_BY_ID_RESET });
    dispatch(getCartDataByUser());
    dispatch(getUserProfile());
  }, [dispatch]);

  const createShopHandler = (e) => {
    e.preventDefault();
    navigate("/myshop");
  };

  const editProfileHandler = () => {
    navigate("/myaccount");
  };

  return (
    <Fragment>
      <Box className={classes.root}>
        <Box
          style={{
            marginTop: "4rem",
            //border: "1px solid black",
            height: "20vh",
            fontSize: 100,
            textAlign: "center",
          }}
        >
          <AccountCircleIcon
            fontSize="large"
            style={{
              transform: "scale(3)",
              color: "grey",
            }}
          />

          {/* <Avatar
            src={`${userLogo}`}
            fontSize="large"
            style={{
              transform: "scale(3)",
            }}
          /> */}
          <Typography variant="h3" className={classes.typographyClass}>
            {user.username}
            <IconButton onClick={editProfileHandler}>
              <CreateIcon style={{ color: "black" }} />
            </IconButton>
          </Typography>
        </Box>
        <Container className={classes.containerWrapper}>
          <Typography
            className={classes.typographyClass}
            variant="h5"
            style={{ padding: "10px" }}
          >
            Welcome, {user.username}! Let's get started.
          </Typography>
          <Typography
            style={{ padding: "10px" }}
            className={classes.typographyClass}
          >
            Start selling your artwork as art prints and other products on
            HappyCrafting by creating your own shop, where people explore you
            products and you can get benefits from it.
          </Typography>
          <Button
            sx={{ mt: 5, borderRadius: 5 }}
            className={classes.btnClass}
            onClick={createShopHandler}
          >
            Create Shop
          </Button>
        </Container>
        <Container
          style={{
            marginTop: "5rem",
            borderRadius: 5,
            textAlign: "center",
            padding: "30px",
            height: "50vh",
          }}
        >
          <Typography
            className={classes.typographyClass}
            variant="h5"
            style={{ padding: "10px" }}
          >
            Not ready to start selling? You can always start discovering.
          </Typography>
          <Typography
            style={{ padding: "10px" }}
            className={classes.typographyClass}
          >
            Explore our discovery feed to find artists to follow in
            HappyCrafting. When you find something you like, you can promote it
            and save it for later.
          </Typography>
          <Button
            sx={{ mt: 5, borderRadius: 5 }}
            className={classes.btnClass}
            onClick={() => {
              navigate("/discovermore");
            }}
          >
            Discover
          </Button>
        </Container>
        <Container style={{ marginTop: "5rem" }}>
          <Divider />
        </Container>
      </Box>
    </Fragment>
  );
}
