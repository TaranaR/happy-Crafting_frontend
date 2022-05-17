import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getCartDataByUser } from "../redux/actions/userAction";
import { Container, Divider, Grid } from "@mui/material";
import ProductInCart from "../components/ProductInCart";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_PRODUCT_BY_ID_RESET,
} from "../constants/userConstants";
import {
  getProductById,
  addToCart,
  removeProductFromCart,
  updateCartByProduct,
} from "../redux/actions/userAction";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    marginTop: "3%",
    //border: "1px solid black",
  },
}));

export default function ViewCart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [prodQty, setProdQty] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  //Cart calculation
  const [cartAmount, setCartAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shipping, setShipping] = useState(0);

  //selectors
  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const userGetProductById = useSelector((state) => state.userGetProductById);
  const userRemoveProductFromCart = useSelector(
    (state) => state.userRemoveProductFromCart
  );

  const { cartData, success: cartDataUpdate } = userGetCartDataByUser;
  const { success } = userRemoveProductFromCart;
  const { prodInfo } = userGetProductById;
  // const { success: updateCart } = userUpdateCartByProduct;

  useEffect(() => {
    // if (prodInfo?.length) {
    //   dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    // }
    if (cartData?.length && cartUpdated) {
      dispatch({ type: GET_CART_DATA_BY_USER_RESET });
      dispatch(getCartDataByUser());
    }
  }, [prodQty]);

  useEffect(() => {
    if (prodInfo?.length) {
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    }
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
  }, []);

  // useEffect(() => {
  //   if (updateCart) {
  //     dispatch({ type: GET_CART_DATA_BY_USER_RESET });
  //     dispatch(getCartDataByUser());
  //   }
  // }, [updateCart]);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_CART_DATA_BY_USER_RESET });
      dispatch(getCartDataByUser());
    }
  }, [success]);

  useEffect(() => {
    if (cartData?.length && !prodInfo?.length) {
      cartData.map((item, index) => {
        //console.log("----", prodInfo?.length, item["product"]);
        dispatch(getProductById(item["product"]));
      });
    }
  }, [cartData]);

  useEffect(() => {
    setCartAmount(0);
    if (cartData && prodInfo?.length) {
      setCartAmount(0);
      setShipping(0);
      // prodInfo
      //   .sort((a, b) => a - b)
      //   .map((item, index) => {
      //     // console.log("prod", item.price * cartData[index].quantity);
      //     console.log(item);
      //   });
      console.log(cartData, prodInfo);
      cartData.map((item, index) => {
        // if (item.product === prodInfo[index]?.id) {
        console.log(prodInfo[index]?.price * item.quantity);
        setCartAmount(
          (prevState) =>
            (prevState = prevState + prodInfo[index]?.price * item.quantity)
        );
        console.log("quantity", item.quantity);
        setShipping((prevState) => (prevState += item.quantity * 15));
        // }
      });
      //console.log(prodInfo.sort((a, b) => (a < b ? 1 : -1)));
      // console.log(cartData, prodInfo);
    }
  }, [prodInfo, cartData]);

  console.log("----", cartAmount);

  const incrementQtyHandler = (prodId) => {
    setProdQty((prevState) => prevState + 1);
    const prod = {
      quantity: 1,
      product: prodId,
    };

    dispatch(addToCart(prod));

    if (cartDataUpdate) {
      setCartUpdated(true);
    } else {
      setCartUpdated(false);
    }
    // dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    // dispatch(getCartDataByUser());
  };

  const decrementQtyHandler = (prodId) => {
    setProdQty((prevState) => prevState - 1);
    const prod = {
      quantity: -1,
      product: prodId,
    };

    dispatch(addToCart(prod));
    if (cartDataUpdate) {
      setCartUpdated(true);
    } else {
      setCartUpdated(false);
    }
    // dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    // dispatch(getCartDataByUser());
  };

  const removeProductFromCartHandler = (prodId) => {
    dispatch(removeProductFromCart(prodId));
  };

  // console.log(prodInfo);
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
          <Grid container style={{ marginTop: "2%" }} spacing={2}>
            <Grid item xs={12} lg={8} md={8}>
              {cartData?.length &&
                // prodInfo?.length &&
                cartData.map((item, index) => {
                  return (
                    <ProductInCart
                      key={index}
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
            <Grid
              item
              xs={12}
              lg={4}
              md={4}
              sx={{
                padding: 3,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                [theme.breakpoints.down("md")]: { marginTop: 10 },
              }}
            >
              <Grid
                container
                style={{
                  // border: "1px solid black",
                  padding: 20,
                }}
              >
                <Grid item xs={12} style={{ fontSize: 25 }}>
                  Summary
                </Grid>
                <Grid item xs={12} style={{ fontSize: 25 }}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: 30,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Your Cart Items</div>
                  <div style={{ fontWeight: "bold" }}>
                    ₹{cartAmount && cartAmount}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: 30,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Estimated Shipping</div>
                  <div style={{ fontWeight: "bold" }}>₹{shipping}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
