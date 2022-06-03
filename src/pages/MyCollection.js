import { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Divider, Grid } from "@mui/material";
import {
  getProductsFromMyCollection,
  addToCart,
  getCartDataByUser,
  removeProductFromCollection,
} from "../redux/actions/userAction";
import { GET_PRODUCTS_FROM_MYCOLLECTION_RESET } from "../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3%",
    height: "100%",
  },
  image: {
    height: "25vh",
    width: "25vh",
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

export default function MyCollection() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGetProductFromMyCollection = useSelector(
    (state) => state.userGetProductFromMyCollection
  );
  const userAddToCart = useSelector((state) => state.userAddToCart);
  const userRemoveProductFromCollection = useSelector(
    (state) => state.userRemoveProductFromCollection
  );

  const { myCollection } = userGetProductFromMyCollection;
  const { cartData } = userAddToCart;
  const { success } = userRemoveProductFromCollection;

  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [cartData]);

  useEffect(() => {
    dispatch({ type: GET_PRODUCTS_FROM_MYCOLLECTION_RESET });
    dispatch(getProductsFromMyCollection());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_PRODUCTS_FROM_MYCOLLECTION_RESET });
      dispatch(getProductsFromMyCollection());
    }
  }, [success]);

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            My Collection
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {!myCollection?.length && (
            <>
              <Grid item xs={12} style={{ marginTop: "2%", fontWeight: 500 }}>
                You have no items in your collection.
              </Grid>
              <Grid item xs={12}>
                To add items to your collection, simply click the "Add to
                Collection" link from any product page.
              </Grid>
            </>
          )}

          {myCollection &&
            myCollection.map((item, index) => {
              return (
                <Grid
                  item
                  xs={6}
                  key={item.id}
                  style={{
                    padding: "30px",
                    width: "100%",
                  }}
                >
                  <Grid container>
                    <Grid item xs={5}>
                      <NavLink to={`/products/${item.id}`}>
                        <img
                          src={item.image}
                          key={item.id}
                          className={classes.image}
                        />
                      </NavLink>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid item xs={12}>
                        <NavLink
                          to={`/products/${item.id}`}
                          className={classes.nameLink}
                        >
                          {item.name}
                        </NavLink>
                      </Grid>
                      <Grid item xs={12} style={{ color: "GrayText" }}>
                        Size : {item.size}
                      </Grid>
                      <Grid item xs={12}>
                        ₹{item.price}
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: "7%" }}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#000000",
                            width: "60%",
                          }}
                          onClick={() => {
                            if (token) {
                              const cart = {
                                quantity: 1,
                                product: item.id,
                                price: item.price,
                                totalAmount: item.price * 1,
                              };
                              dispatch(addToCart(cart));
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: "7%" }}>
                        <Button
                          style={{
                            fontSize: 12,
                            color: "inherit",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            if (token) {
                              dispatch(removeProductFromCollection(item.id));
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          Remove from collection
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Fragment>
  );
}
