import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Grid, Button } from "@mui/material";
import ProductInCart from "../components/ProductInCart";
import { useTheme } from "@mui/material/styles";
import { Preview } from "@mui/icons-material";
import CartSummary from "../components/CartSummary";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_PRODUCT_BY_ID_RESET,
} from "../constants/userConstants";
import {
  getProductById,
  addToCart,
  removeProductFromCart,
} from "../redux/actions/userAction";
import { getCartDataByUser } from "../redux/actions/userAction";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
  },
}));

export default function ViewCart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [prodQty, setProdQty] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

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

  useEffect(() => {
    dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
  }, []);

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
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
      dispatch(getCartDataByUser());
    }
  }, [success]);

  useEffect(() => {
    if (cartData?.length && !prodInfo?.length) {
      cartData.map((item, index) => {
        dispatch({ type: GET_PRODUCT_BY_ID_RESET });
        dispatch(getProductById(item["product"]));
      });
    }
  }, [cartData]);

  console.log(prodInfo);

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
  };

  const removeProductFromCartHandler = (prodId) => {
    dispatch(removeProductFromCart(prodId));
  };

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
                [theme.breakpoints.down("md")]: { marginTop: 10 },
              }}
            >
              <Grid
                container
                style={{
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
