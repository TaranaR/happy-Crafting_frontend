import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import {
  getSubCategoryByMainCategoryName,
  getRandomProductByCategory,
} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import indexBg from "../Images/WallArtindexBg.jpeg";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  typeLink: {
    textDecoration: "none",
    position: "relative",
    color: "#46244C",
    fontWeight: "bold",
    "&:hover": {
      border: "1",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "5px",
      bottom: "-1px",
      left: "50%",
      transform: "translate(-50%,0%)",
      backgroundColor: "#D49B54",
      visibility: "hidden",
      transition: "all 0.3s ease-in-out",
    },
    "&:hover:before": {
      visibility: "visible",
      width: "100%",
    },
  },
  mainContainer: {
    marginTop: "2%",

    [theme.breakpoints.down("sm")]: {
      height: "70%",
    },
    [theme.breakpoints.down("md")]: {
      height: "60%",
    },
    [theme.breakpoints.down("lg")]: {
      height: "70%",
    },
    backgroundImage: `url(${indexBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  slider: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    opacity: 0,
    transitionDuration: "1s ease",
  },
  active: {
    opacity: 1,
    transitionDuration: "2s",
    transform: "scale(1.08)",
  },
  image: {
    width: "500px",
    height: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
      height: "200px",
    },
  },
  rightArrow: {
    position: "absolute",
    top: "50%",
    right: "32px",
    fontSize: "2rem",
    opacity: 0.5,
    color: "#000000",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
  },
  leftArrow: {
    position: "absolute",
    top: "50%",
    left: "32px",
    fontSize: "2rem",
    opacity: 0.5,
    color: "#000000",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
  },
  linkWarpper: {
    textAlign: "center",
    fontSize: 25,
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
      margin: 0,
      padding: 5,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
      margin: 0,
      padding: 5,
    },
  },
}));

export default function ProductCategoryPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentImg, setCurrentImg] = useState(0);
  const userGetSubCatgoryByMainCategoryName = useSelector(
    (state) => state.userGetSubCatgoryByMainCategoryName
  );
  const userGetRandomProductByCategory = useSelector(
    (state) => state.userGetRandomProductByCategory
  );
  const { subCatInfo } = userGetSubCatgoryByMainCategoryName;
  const { randProdCat } = userGetRandomProductByCategory;
  let imgDataLength = 6;

  let content;

  useEffect(() => {
    dispatch(getSubCategoryByMainCategoryName(props.cat));
    dispatch(getRandomProductByCategory(props.cat));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [dispatch, props.cat]);

  useEffect(() => {
    // const changeSlide = setInterval(
    //   () => setCurrentImg((prevState) => 1 - prevState),
    //   3000
    // );
    const changeSlide = setInterval(
      () =>
        setCurrentImg((prevState) =>
          prevState === imgDataLength - 1 ? 0 : prevState + 1
        ),
      3000
    );
    return () => clearInterval(changeSlide);
  }, []);

  const RightArrowhandler = () => {
    setCurrentImg(currentImg === imgDataLength - 1 ? 0 : currentImg + 1);
  };
  const LeftArrowHandler = () => {
    setCurrentImg(currentImg === 0 ? imgDataLength - 1 : currentImg - 1);
  };

  if (props.cat === "Wall Art") {
    content = (
      <p>
        Come explore our diverse community of artists, creating pieces that are
        sure to match whatever your decor style may be. Choose affordable art
        prints, posters, mini art prints or framed mini art prints if you live
        in an apartment or dorm where space is limited or if you live in a place
        with large space. And choose our rustic wall hangings or wood wall art
        for a unique, boho-inspired decor style. Then take your walls to the
        next level by mixing the different pieces and designs to create the
        gallery wall of your dreams. With every purchase supporting the artists
        who designed them, feel good knowing that you're supporting creativity
        across the world.
      </p>
    );
  } else if (props.cat === "House Decor") {
    content = (
      <p>
        Dress up your couch and seating areas with throw pillows, rectangular
        pillows and throw blankets. Add some fun, Bohemian-style seating for
        parties and group hangs with comfy floor pillows. Give your windows some
        love and let in just the right amount of light with stylish blackout
        curtains or sheer curtains. Then sprinkle in the finishing touches with
        wall clocks, wallpaper, wall murals and tapestries to match your exact
        taste. With every purchase supporting the artists who designed them,
        feel good knowing that you're supporting creativity across the world.
      </p>
    );
  } else if (props.cat === "Furniture") {
    content = (
      <p>
        Beginning with our counter stools, bar stools and benches; add seating
        you can feel good about in your kitchen or living room. Then look to our
        side tables and coffee tables which make beautiful, sleek canvases to
        display your favorite designs. And the statement piece to bring your
        whole room together is the credenza which features mid-century modern
        styling and your selected design featured prominently for your jealous
        guests to see. Our wide range of furniture options means that you can
        find exactly the piece to add to any room of your home: kitchen,
        bedroom, living room, common area, wherever! With every purchase
        supporting the artists who designed them, feel good knowing that you're
        supporting creativity across the world.
      </p>
    );
  } else if (props.cat === "Bed & Bath") {
    content = (
      <p>
        Match your exact taste with designs from independent artists in every
        style, color and design you could imagine. Start by upgrading your bed
        with our pillowy comforters, duvet covers and pillow shams. Then turn
        your attention to the bathroom with soft bath mats, plush hand towels
        and bath towels and unique shower curtains to pull it all together. Make
        it a look by pulling in our impressive array of wall art to complement
        your favorite pieces and establish a decor style that reflects your
        taste. With every purchase supporting the artists who designed them,
        feel good knowing that you're supporting creativity across the world.
      </p>
    );
  } else if (props.cat === "Office") {
    content = (
      <p>
        Start small with fun, punchy stickers to stick anywhere you need some
        design help. Then take care of your paper needs with notebooks and
        stationery cards that are unique and can't be found in the usual big box
        stores. Our acrylic trays and acrylic boxes make modern additions to
        your office or even your bathroom storage. Our limited edition calendars
        and artist quarterlies are great for gifting or keeping a curated taste
        of our artist community for your self. Speaking of gifts, complete the
        look with our wrapping paper. With every purchase supporting the artists
        who designed them, feel good knowing that you're supporting creativity
        across the world.
      </p>
    );
  } else if (props.cat === "Tech") {
    content = (
      <p>
        Much like you change your clothes depending on the occasion, our
        affordable tech accessories make it easy to change your phone or
        laptop's look wherever you want to go. Find iPhone cases, Android and
        Galaxy cases, card cases to store your credit card, wallet cases that
        fold to watch media and can store your cards and cash and iPhone skins
        for all your stylish scrolling needs. Or discover laptop sleeves and
        laptop skins to protect your computer with something that's personal to
        you. And for those with Apple Watches and iPads, we now have Apple Watch
        bands and iPad folio cases for you too! Go the extra mile and coordinate
        with your office decor and wall art to bring the whole look together.
        With every purchase supporting the artists who designed them, feel good
        knowing that you're supporting creativity across the world.
      </p>
    );
  } else if (props.cat === "Outdoors & lifestyle") {
    content = (
      <p>
        Much like you change your clothes depending on the occasion, our
        affordable tech accessories make it easy to change your phone or
        laptop's look wherever you want to go. Find iPhone cases, Android and
        Galaxy cases, card cases to store your credit card, wallet cases that
        fold to watch media and can store your cards and cash and iPhone skins
        for all your stylish scrolling needs. Or discover laptop sleeves and
        laptop skins to protect your computer with something that's personal to
        you. And for those with Apple Watches and iPads, we now have Apple Watch
        bands and iPad folio cases for you too! Go the extra mile and coordinate
        with your office decor and wall art to bring the whole look together.
        With every purchase supporting the artists who designed them, feel good
        knowing that you're supporting creativity across the world.
      </p>
    );
  } else if (props.cat === "Fashion") {
    content = (
      <p>
        Turn your everyday bags from accessories to statement pieces with tote
        bags, carry-all pouches and duffle bags. For those on the go or students
        at school, we have just the backpacks and fanny packs to set you apart
        from your peers. Plus, truly make it a look with apparel like t-shirts,
        v-neck shirts, long sleeve shirts, all over graphic tees, tank tops,
        biker tanks, leggings and hoodies. We know everyone will be asking you
        where you found your unique clothes. With every purchase supporting the
        artists who designed them, feel good knowing that you're supporting
        creativity across the world.
      </p>
    );
  }
  return (
    <Fragment>
      <Box className={classes.root}>
        <Box className={classes.mainContainer}>
          {/* <Container> */}
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ fontSize: 35, textAlign: "center", marginTop: "4%" }}
            >
              {props.cat}
            </Grid>
            <Grid item xs={12} style={{ fontSize: 35, textAlign: "center" }}>
              ~~~~~~~~~~
            </Grid>
            <Grid container style={{ margin: "4%" }}>
              {subCatInfo &&
                subCatInfo.map((item) => {
                  return (
                    <Grid
                      item
                      key={item.id}
                      xs={6}
                      lg={3}
                      md={3}
                      // style={{
                      //   textAlign: "center",
                      //   fontSize: 25,
                      //   padding: "10px",
                      //   border: "1px solid black",
                      // }}
                      className={classes.linkWarpper}
                    >
                      <NavLink
                        to={`/${item.sub_cat_name}`}
                        //state={{ cat: `${props.cat}` }}
                        className={classes.typeLink}
                      >
                        {item.sub_cat_name}
                      </NavLink>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          {/* </Container> */}
        </Box>
        <Container style={{ marginTop: "10%" }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              style={{
                textAlign: "center",
                // marginTop: "5%",
                fontSize: 18,
              }}
            >
              <Grid item xs={12} style={{ fontSize: 25 }}>
                ~~~~~~~~~~~~~~~~~~~~~~~~
              </Grid>
              <Grid item xs={12}>
                {content}
              </Grid>
              <Grid item xs={12} style={{ fontSize: 25 }}>
                ~~~~~~~~~~~~~~~~~~~~~~~~
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Box className={classes.slider}>
                <BsFillArrowLeftCircleFill
                  className={classes.leftArrow}
                  onClick={LeftArrowHandler}
                />
                <BsFillArrowRightCircleFill
                  className={classes.rightArrow}
                  onClick={RightArrowhandler}
                />
                {randProdCat &&
                  Object.values(randProdCat).map((item) => {
                    return (
                      item[props.cat] &&
                      Object.values(item[props.cat]).map((i, k) => {
                        return (
                          <div
                            className={
                              k === currentImg
                                ? `${classes.slide} ${classes.active}`
                                : `${classes.slide}`
                            }
                            key={k}
                          >
                            {k === currentImg && (
                              <NavLink to={`/products/${i.id}`}>
                                <img
                                  src={i.image}
                                  className={classes.image}
                                  key={i.id}
                                />
                              </NavLink>
                            )}
                          </div>
                        );
                      })
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}
