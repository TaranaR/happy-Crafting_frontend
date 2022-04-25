import React, { Fragment } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import startImage from "../Images/mainPage.jpeg";
import pillow from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/pillow.jpeg";
import painting from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/painting.jpeg";
import phoneCase from "/home/dev/Documents/Tarana/Happy-Crafting/happy_crafting_frontend/src/Images/phoneCase.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {},
  startImg: {
    backgroundImage: `url(${startImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "76vh",
    width: "100%",
    padding: "5rem",
  },
  textWrapper: {
    textAlign: "center",
    opacity: 1,
  },
}));

const images = [
  {
    url: pillow,
    title: "Pillow",
    width: "40%",
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
  return (
    <Fragment>
      <div className={classes.startImg} style={{ color: "#ffffff" }}>
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
      <Container className={classes.root}>Home</Container>
    </Fragment>
  );
};

export default Home;
