import React, { Fragment, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import startImage from "../Images/mainPage1.jpeg";
import pillow from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/pillow.jpeg";
import painting from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/painting.jpeg";
import phoneCase from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/phoneCase.jpeg";
import { getAdminDetail } from "../redux/actions/adminAction";
import {
  getRandomSubCategory,
  getRandom4Products,
  getRandomProductByCategory,
  getCartDataByUser,
} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_DETAILS_RESET } from "../constants/adminConstants";
import { Button } from "@mui/material";
import ProductByCategory from "../components/ProductsByCategory";
import { getMainCategory } from "../redux/actions/sellerAction";
import { GET_RANDOM_PRODUCT_BY_CATEGORY_RESET } from "../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10%",
    height: "80%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    //backgroundColor: "#C4DDFF",
    textAlign: "center",
  },

  typeLink: {
    //textDecoration: "none",
    color: "#22577E",
    "&:hover": {
      textDecoration: "none",
      color: "#A97155",
    },
  },

  startImg: {
    backgroundImage: `url(${startImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "76vh",
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    padding: "5rem",
  },
  textWrapper: {
    textAlign: "center",
  },
}));

const images = [
  {
    url: pillow,
    title: "Pillow",
    width: "30%",
  },
  {
    url: painting,
    title: "Painting",
    width: "30%",
  },
  {
    url: phoneCase,
    title: "Phone Cases",
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  margin: "15px",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const Home = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usergetRandom4Product = useSelector(
    (state) => state.userGetRandom4Product
  );
  const userGetRandomSubCategory = useSelector(
    (state) => state.userGetRandomSubCategory
  );
  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const sellerGetMainCategory = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const userGetRandomProductByCategory = useSelector(
    (state) => state.userGetRandomProductByCategory
  );

  const { randProdCat } = userGetRandomProductByCategory;
  const { randProd } = usergetRandom4Product;
  const { randSubCat } = userGetRandomSubCategory;
  const { cartData } = userGetCartDataByUser;
  const { mainCatInfo } = sellerGetMainCategory;

  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!cartData) {
      dispatch(getCartDataByUser());
    }
  }, [dispatch, cartData]);

  useEffect(() => {
    dispatch(getRandom4Products());
    dispatch(getRandomSubCategory());
    if (!mainCatInfo) {
      dispatch(getMainCategory());
    }
    if (token) {
      dispatch(getAdminDetail());
    }
  }, [dispatch]);

  useEffect(() => {
    if (mainCatInfo) {
      mainCatInfo.map((item) => {
        dispatch(getRandomProductByCategory(item.main_cat_name));
      });
    }
  }, [dispatch, mainCatInfo]);

  function getColor() {
    return (
      "hsl(" +
      360 * Math.random() +
      "," +
      (25 + 30 * Math.random()) +
      "%," +
      (85 + 10 * Math.random()) +
      "%)"
    );
  }
  // const getProductByCategory = (cat) => {
  //   dispatch(getRandomProductByCategory(cat));
  // };

  return (
    <Fragment>
      <div className={classes.startImg} style={{ color: "#000000" }}>
        <Container className={classes.textWrapper}>
          <h1>Designed by artists, made by us, just for you.</h1>
          <h1>~~~~~~~~~~~~~~~</h1>
          <h1>Featured Products</h1>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              minWidth: 300,
              width: "100%",
            }}
          >
            {images.map((image) => (
              <ImageButton
                focusRipple
                key={image.title}
                style={{
                  width: image.width,
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            ))}
          </Box>
        </Container>

        {/* <img src={startImage} className={classes.startImg} /> */}
      </div>
      <Box className={classes.root} style={{ backgroundColor: "#C4DDFF" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            Get Started
          </Grid>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Choose from millions of different designs and pair your favorites
            with over 90 different products.
          </Grid>

          <Grid
            container
            justifyItems="center"
            spacing={2}
            style={{
              width: "80%",
              marginLeft: "15%",
              marginRight: "10%",
            }}
          >
            {randProd &&
              Object.values(randProd).map((item) => {
                return (
                  <Grid
                    container
                    key={item.id}
                    item
                    xs={3}
                    style={{
                      padding: 0,
                      marginTop: "8%",
                    }}
                  >
                    <NavLink to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        style={{
                          height: "20vh",
                          width: "20vh",
                          borderRadius: 10,
                        }}
                      />
                    </NavLink>
                  </Grid>
                );
              })}
            <Grid item xs={12} style={{ marginTop: "4%" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#000000",
                  width: "50%",
                  marginBottom: "6%",
                }}
              >
                Explore Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.root} style={{ backgroundColor: "#FFEEEE" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            Shop by Types
          </Grid>
          <Grid
            item
            xs={12}
            style={{ fontSize: 20, margin: "30px", marginTop: 0 }}
          >
            Select your desired product from multiple range of product types and
            get inspired to decorate your house or your work place. Get inspired
            and also inspire others.
          </Grid>
          <Grid
            container
            justifyItems="center"
            spacing={2}
            style={{
              width: "80%",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <Grid
              container
              item
              xs={12}
              style={{
                padding: 0,
                margin: "5%",
                marginTop: "3%",
                fontSize: 20,
              }}
            >
              {randSubCat &&
                Object.values(randSubCat)
                  .slice(0, 4)
                  .map((item) => {
                    return (
                      <Grid item xs={6} key={item.id}>
                        <NavLink
                          to={`/${item.sub_cat_name}`}
                          //state={{ cat: `${item.sub_cat_name}` }}
                          className={classes.typeLink}
                        >
                          {item.sub_cat_name}
                        </NavLink>
                      </Grid>
                    );
                  })}
              {randSubCat &&
                Object.values(randSubCat)
                  .slice(4)
                  .map((item) => {
                    return (
                      <Grid item xs={6} key={item.id}>
                        <NavLink
                          to={`/${item.sub_cat_name}`}
                          className={classes.typeLink}
                        >
                          {item.sub_cat_name}
                        </NavLink>
                      </Grid>
                    );
                  })}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {mainCatInfo &&
        mainCatInfo.map((item) => {
          return (
            <Box
              className={classes.root}
              style={{ backgroundColor: `${getColor()}` }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
                  {item.main_cat_name}
                </Grid>
                <Grid item xs={12}>
                  <ProductByCategory
                    cat={item.main_cat_name}
                    randProdCat={randProdCat}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}

      {/* <Box className={classes.root} style={{ backgroundColor: "#A8DBD5" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Wall Art
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Wall Art" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#E4AEC5" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            House Decor
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="House Decor" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#F8ECD1" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Furniture
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Furniture" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#9FB4FF" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Bed & Bath
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Bed & Bath" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#FDAF75" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Office
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Office" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#8FBDD3" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Tech
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Tech" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#FFA8A8" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Outdoors & lifestyle
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Outdoors & lifestyle" />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.root} style={{ backgroundColor: "#EDCDBB" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30, marginTop: "3%" }}>
            Fashion
          </Grid>
          <Grid item xs={12}>
            <ProductByCategory cat="Fashion" />
          </Grid>
        </Grid>
      </Box> */}
    </Fragment>
  );
};

export default Home;
