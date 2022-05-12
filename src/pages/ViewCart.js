import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getCartDataByUser } from "../redux/actions/userAction";
import { Container, Divider, Grid } from "@material-ui/core";
import ProductInCart from "../components/ProductInCart";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_PRODUCT_BY_ID_RESET,
} from "../constants/userConstants";
import {
  getProductById,
  addToCart,
  removeProductFromCart,
} from "../redux/actions/userAction";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    marginTop: "3%",
    //border: "1px solid black",
  },
}));

export default function ViewCart() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [prodQty, setProdQty] = useState(0);
  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const { cartData } = userGetCartDataByUser;

  const userGetProductById = useSelector((state) => state.userGetProductById);
  const userRemoveProductFromCart = useSelector(
    (state) => state.userRemoveProductFromCart
  );

  const { loading, success } = userRemoveProductFromCart;

  const { prodInfo } = userGetProductById;

  console.log(cartData);

  useEffect(() => {
    dispatch(getCartDataByUser());
    if (cartData) {
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
      dispatch({ type: GET_CART_DATA_BY_USER_RESET });
      dispatch(getCartDataByUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    dispatch(getCartDataByUser());
  }, [dispatch, prodQty]);

  useEffect(() => {
    if (!cartData || success) {
      dispatch({ type: GET_CART_DATA_BY_USER_RESET });
      dispatch(getCartDataByUser());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (cartData) {
      cartData.map((item) => {
        dispatch({ type: GET_PRODUCT_BY_ID_RESET });
        dispatch(getProductById(item["product"]));
      });
    }
  }, [dispatch, cartData]);

  const incrementQtyHandler = (prodId) => {
    setProdQty((prevState) => prevState + 1);
    const cart = {
      quantity: 1,
      product: prodId,
    };

    dispatch(addToCart(cart));
    // dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    // dispatch(getCartDataByUser());
  };

  const decrementQtyHandler = (prodId) => {
    setProdQty((prevState) => prevState - 1);
    const cart = {
      quantity: -1,
      product: prodId,
    };

    dispatch(addToCart(cart));
    // dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    // dispatch(getCartDataByUser());
  };

  const removeProductFromCartHandler = (prodId) => {
    dispatch(removeProductFromCart(prodId));
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            My Cart
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ marginTop: "2%" }}>
            <Grid item xs={7}>
              {cartData &&
                cartData.map((item) => {
                  return (
                    <ProductInCart
                      key={item.id}
                      prodId={item["product"]}
                      qty={item["quantity"]}
                      prodInfo={prodInfo}
                      onIncrementQty={incrementQtyHandler}
                      onDecrementQty={decrementQtyHandler}
                      onRemoveProductFromCart={removeProductFromCartHandler}
                    />
                  );
                })}
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
