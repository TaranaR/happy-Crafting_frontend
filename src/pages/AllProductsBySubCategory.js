import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetAllProductsBySubCategoryNameReducer } from "../redux/reducers/userReducer";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container, Divider, Grid } from "@material-ui/core";
import { getAllProductsBySubCategoryName } from "../redux/actions/userAction";
import { NavLink, useLocation, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5%",
    height: "100vh",
  },
  image: {
    height: "20vh",
    width: "20vh",
  },
  nameLink: {
    textDecoration: "none",
    color: "#22577E",
    "&:hover": {
      color: "#A97155",
    },
  },
}));

export default function AllProductsBySubCategory(props) {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const subName = params.subname;
  const userGetAllProductsBySubCategoryName = useSelector(
    (state) => state.userGetAllProductsBySubCategoryName
  );
  const { allProdSub, loading } = userGetAllProductsBySubCategoryName;

  useEffect(() => {
    dispatch(getAllProductsBySubCategoryName(subName));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  //  console.log(location.state.cat);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Container>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12} style={{ fontSize: 30 }}>
                {loading && "Loading...."}
                {!loading && subName}
              </Grid>
              <Grid item xs={12} style={{ fontSize: 30 }}>
                <Divider style={{ marginTop: "6%" }} />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container style={{ margin: "10px", marginTop: "5%" }}>
                {allProdSub &&
                  allProdSub.map((item) => {
                    return (
                      <Grid
                        item
                        xs={4}
                        key={item.id}
                        style={{ padding: "30px" }}
                      >
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
                          {item.reviews.length}
                        </Grid>
                      </Grid>
                    );
                  })}
                {allProdSub &&
                  allProdSub.length === 0 &&
                  "All the Products are out of stock"}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}
