import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getCartDataByUser } from "../redux/actions/userAction";
import { Container, Divider, Grid, Button } from "@mui/material";
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
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Preview } from "@mui/icons-material";
import CartSummary from "../components/CartSummary";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    //border: "1px solid black",
  },
}));

export default function ViewCart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [prodQty, setProdQty] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  //Cart calculation
  //const [cartAmount, setCartAmount] = useState(0);
  // const [totalCartAmount, setTotalCartAmount] = useState(0);
  // const [shippingAmount, setShippingAmount] = useState(0);
  // const [totalBillAmount, setTotalBillAmount] = useState(0);

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
    if (prodInfo?.length) {
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    }
    if (cartData?.length && cartUpdated) {
      dispatch({ type: GET_CART_DATA_BY_USER_RESET });
      dispatch(getCartDataByUser());
    }
  }, [prodQty, cartUpdated]);

  useEffect(() => {
    if (prodInfo?.length) {
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    }
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
  }, []);

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

  const incrementQtyHandler = (prodId, price) => {
    setProdQty((prevState) => prevState + 1);
    const prod = {
      quantity: 1,
      product: prodId,
      totalAmount: price * 1,
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

  const decrementQtyHandler = (prodId, price) => {
    setProdQty((prevState) => prevState - 1);
    const prod = {
      quantity: -1,
      product: prodId,
      totalAmount: price * -1,
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
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            My Cart
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ marginTop: "2%" }}>
            {cartData && (
              <Grid item xs={12} lg={8} md={8}>
                {/* prodInfo?.length && */}
                {cartData.map((item, index) => {
                  return (
                    <ProductInCart
                      key={index}
                      prodId={item["product"]}
                      qty={item["quantity"]}
                      price={item["price"]}
                      prodInfo={prodInfo}
                      onIncrementQty={incrementQtyHandler}
                      onDecrementQty={decrementQtyHandler}
                      onRemoveProductFromCart={removeProductFromCartHandler}
                    />
                  );
                })}
              </Grid>
            )}
            {!cartData?.length && (
              <Grid item xs={12} lg={8} md={8}>
                Your cart is empty. Want to change that?
                <Button
                  onClick={() => {
                    navigate("/WallArt");
                  }}
                >
                  Continue Shopping
                </Button>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              lg={4}
              md={4}
              sx={{
                padding: 3,
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                [theme.breakpoints.down("md")]: { marginTop: 10 },
              }}
            >
              <Grid
                container
                style={{
                  // border: "1px solid black",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: 20,
                }}
              >
                <CartSummary cartData={cartData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
