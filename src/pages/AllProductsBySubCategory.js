import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Divider } from "@material-ui/core";
import {
  getAllProductsBySubCategoryName,
  getSubCategoryBySubCategoryName,
} from "../redux/actions/userAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5%",
    height: "100%",
  },
  image: {
    height: "20vh",
    width: "20vh",
  },
  typeLink: {
    textDecoration: "none",
    color: "#000000",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  nameLink: {
    textDecoration: "none",
    color: "#000000",
  },
}));

export default function AllProductsBySubCategory(props) {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [sortby, setSortby] = useState("random");

  const subName = params.subname;
  const userGetAllProductsBySubCategoryName = useSelector(
    (state) => state.userGetAllProductsBySubCategoryName
  );
  const userGetSubCategoryBySubCategoryName = useSelector(
    (state) => state.userGetSubCategoryBySubCategoryName
  );
  const { allProdSub, loading } = userGetAllProductsBySubCategoryName;
  const { subCatName } = userGetSubCategoryBySubCategoryName;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch(getAllProductsBySubCategoryName(subName, sortby));
  }, []);

  useEffect(() => {
    dispatch(getAllProductsBySubCategoryName(subName, sortby));
    dispatch(getSubCategoryBySubCategoryName(subName));
  }, [dispatch, location, sortby]);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Container>
          <Grid container>
            <Grid item xs={12} lg={4} md={4}>
              <Grid item xs={12} style={{ fontSize: 30 }}>
                {loading && "Loading...."}
                {!loading && subName}
              </Grid>
              <Grid container style={{ marginTop: 25 }}>
                <Grid
                  item
                  xs={2}
                  lg={2}
                  md={2}
                  sx={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",

                    marginTop: "2%",
                  }}
                >
                  Sort by:
                </Grid>
                <Grid item xs={10} lg={10} md={10}>
                  <Select
                    defaultValue="random"
                    size="small"
                    value={sortby}
                    style={{ fontSize: 15 }}
                    onChange={(e) => {
                      setSortby(e.target.value);
                    }}
                  >
                    <MenuItem value="random">Random</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="priceh">Price(High to Low)</MenuItem>
                    <MenuItem value="pricel">Price(Low to High)</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ fontSize: 30 }}>
                <Divider style={{ marginTop: "6%" }} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    marginTop: "5%",
                  },
                }}
              >
                <Grid container>
                  {subCatName &&
                    subCatName.map((item, index) => {
                      return (
                        <>
                          <Grid
                            item
                            xs={6}
                            lg={12}
                            md={12}
                            sx={{
                              marginTop: "8%",
                              fontSize: 20,
                              [theme.breakpoints.down("md")]: {
                                fontSize: 15,
                                marginTop: 0,
                              },
                            }}
                            key={index}
                          >
                            <NavLink
                              to={`/${item.sub_cat_name}`}
                              className={classes.typeLink}
                            >
                              {item.sub_cat_name}
                            </NavLink>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Divider />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8} md={8}>
              <Grid
                container
                sx={{
                  margin: "10px",
                  marginTop: "5%",
                  height: "50%",
                }}
              >
                {allProdSub &&
                  allProdSub.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        md={6}
                        lg={4}
                        key={index}
                        sx={{
                          padding: "30px",
                          [theme.breakpoints.down("sm")]: {
                            padding: 1,
                            display: "flex",
                          },
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <NavLink to={`/products/${item.id}`}>
                              <img
                                src={item.image}
                                key={item.id}
                                className={classes.image}
                              />
                            </NavLink>
                          </Grid>
                          <Grid item xs={12}>
                            <NavLink
                              to={`/products/${item.id}`}
                              className={classes.nameLink}
                            >
                              {item.name}
                            </NavLink>
                          </Grid>
                          <Grid item xs={12}>
                            ₹{item.price}
                          </Grid>
                          <Grid item xs={12}>
                            <FavoriteIcon
                              style={{
                                color: "#990012",
                              }}
                              fontSize="small"
                            />
                            {item.likes.length}
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                {allProdSub &&
                  allProdSub?.length === 0 &&
                  "No Product with this type"}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}
