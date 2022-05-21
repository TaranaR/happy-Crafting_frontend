import { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, Grid } from "@material-ui/core";
import {
  getSellerProfile,
  getOrderedProductBySeller,
} from "../../redux/actions/sellerAction";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Setting from "./Forms/Setting";
import ManageProducts from "./Forms/ManageProducts";
import SellerAccount from "./Forms/SellerAccount";
import SellerOrder from "./Forms/SellerOrder";
import { GET_ORDERED_PRODUCT_SELLER_RESET } from "../../constants/sellerConstants";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
    marginTop: "20px",
  },

  button: {
    padding: "10px",
    backgroundColor: "#F0E9E1",
    width: "70%",
    "&:focus": {
      borderLeft: "5px solid black",
    },
  },

  activeBtn: {
    padding: "10px",
    backgroundColor: "#F0E9E1",
    width: "30vh",
    borderLeft: "5px solid black",
  },
  inactiveBtn: {
    padding: "10px",
    backgroundColor: "#F0E9E1",
    width: "30vh",
  },
  menuBtn: {
    textAlign: "center",
    marginTop: "20px",
  },
}));

export default function SellerProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState("MY ACCOUNT");

  const sellerProfile = useSelector((state) => state.sellerProfile);
  const { seller } = sellerProfile;
  let content = "";

  if (page === "SHOP PROFILE") {
    content = <Setting seller={seller} />;
  } else if (page === "MANAGE PRODUCTS") {
    content = <ManageProducts />;
  } else if (page === "MY ACCOUNT") {
    content = <SellerAccount />;
  } else if (page === "VIEW ORDERS") {
    content = <SellerOrder />;
  }
  // let button = isActive ? classes.activeBtn : classes.inactiveBtn;

  useEffect(() => {
    dispatch(getSellerProfile());
    // if (btnRef.current) {
    //   btnRef.current.focus();
    // }
  }, [dispatch, btnRef]);

  useEffect(() => {
    dispatch({ type: GET_ORDERED_PRODUCT_SELLER_RESET });
    dispatch(getOrderedProductBySeller());
  }, []);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} lg={3} md={3}>
            <Box
              style={{
                justifyContent: "center",
                display: "flex",
                marginTop: "50px",
              }}
            >
              <Avatar
                src={seller && seller.shop_logo}
                style={{ border: "1px solid #D5C6B1", transform: "scale(3)" }}
              />
            </Box>

            <Box
              style={{ textAlign: "center", fontSize: 25, marginTop: "50px" }}
            >
              Welcome {seller && seller.shop_name}
            </Box>
            <Box style={{ justifyContent: "center", display: "flex" }}>
              <Divider style={{ width: "30vh", marginTop: "10px" }} />
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                ref={btnRef}
                onClick={(e) => {
                  setPage(e.target.innerText);
                }}
              >
                MY ACCOUNT
              </Button>
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                ref={btnRef}
                onClick={(e) => {
                  setPage(e.target.innerText);
                }}
              >
                SHOP PROFILE
              </Button>
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={(e) => {
                  setPage(e.target.innerText);
                }}
              >
                Manage Products
              </Button>
            </Box>
            <Box className={classes.menuBtn}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={(e) => {
                  setPage(e.target.innerText);
                }}
              >
                View Orders
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} lg={9} md={9} style={{ height: "100vh" }}>
            {content}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
