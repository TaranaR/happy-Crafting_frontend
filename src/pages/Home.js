import React, { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import startImage from "../Images/mainPage1.jpeg";
import ProductByCategory from "../components/ProductsByCategory";
import { getAdminDetail } from "../redux/actions/adminAction";
import {
  getRandomSubCategory,
  getRandom4Products,
  getRandomProductByCategory,
  getCartDataByUser,
  getFeaturedProducts,
} from "../redux/actions/userAction";
import { getMainCategory } from "../redux/actions/sellerAction";

const TextSize = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: 10,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10%",
    height: "80%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    textAlign: "center",
  },

  typeLink: {
    color: "#22577E",
    "&:hover": {
      textDecoration: "none",
      color: "#A97155",
    },
  },
  zoomImg: {
    "&:hover": {
      transform: "scale(1.5)",
      transition: "all 0.5s ease-in-out",
    },
  },

  startImg: {
    backgroundImage: `url(${startImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "70%",
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    padding: "5%",
  },
  textWrapper: {
    textAlign: "center",
  },
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  margin: "10px",
  height: 200,
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    color: "#000000",
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
  opacity: 0.5,
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

export default function Home(props) {
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
  const userGetFeaturedProducts = useSelector(
    (state) => state.userGetFeaturedProducts
  );

  const { randProdCat } = userGetRandomProductByCategory;
  const { randProd } = usergetRandom4Product;
  const { randSubCat } = userGetRandomSubCategory;
  const { cartData } = userGetCartDataByUser;
  const { mainCatInfo } = sellerGetMainCategory;
  const { featuredProducts } = userGetFeaturedProducts;

  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (!cartData) {
      dispatch(getCartDataByUser());
    }
  }, [dispatch, cartData]);

  useEffect(() => {
    dispatch(getRandom4Products());
    dispatch(getFeaturedProducts());
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

  return (
    <Fragment>
      <Box className={classes.startImg}>
        <Container className={classes.textWrapper}>
          <TextSize>
            <h1>Designed by artists, made by us, just for you.</h1>
            <h1>~~~~~~~~~~~</h1>
            <h1>Featured Products</h1>
          </TextSize>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              minWidth: 300,
              width: "100%",
            }}
          >
            {featuredProducts &&
              featuredProducts.map((item) => (
                <ImageButton
                  focusRipple
                  key={item.id}
                  style={{
                    width: "30%",
                  }}
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                  }}
                >
                  <ImageSrc
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />
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
                      {item.name}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              ))}
          </Box>
        </Container>
      </Box>

      <Box
        className={classes.root}
        style={{ backgroundColor: "#C4DDFF", textAlign: "center" }}
      >
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
            spacing={2}
            style={{
              width: "80%",
              marginLeft: "15%",
              marginRight: "10%",
              textAlign: "center",
            }}
          >
            {randProd &&
              Object.values(randProd).map((item) => {
                return (
                  <Grid
                    container
                    key={item.id}
                    item
                    xs={12}
                    md={3}
                    lg={3}
                    style={{
                      padding: 0,
                      marginTop: "8%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <NavLink to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        className={classes.zoomImg}
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
                onClick={() => {
                  navigate("/discovermore");
                }}
              >
                Discover More
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
                      <Grid item xs={12} md={6} lg={6} key={item.id}>
                        <NavLink
                          to={`/${item.sub_cat_name}`}
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
                      <Grid item xs={12} md={6} lg={6} key={item.id}>
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
              key={item.id}
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
    </Fragment>
  );
}
