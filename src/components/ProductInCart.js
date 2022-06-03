import { Fragment, useState } from "react";
import {
  Divider,
  Grid,
  Button,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";

export default function ProductInCart(props) {
  const theme = useTheme();
  const prodId = props.prodId;
  const prodInfo = props.prodInfo;
  const price = props.price;
  const [prodQty, setProdQty] = useState(props.qty);

  const incrementQtyHandler = () => {
    setProdQty((prevState) => prevState + 1);
    props.onIncrementQty(prodId);
  };

  const decrementQtyHandler = () => {
    if (prodQty > 1) {
      setProdQty((prevState) => prevState - 1);
      props.onDecrementQty(prodId, price);
    }
  };

  const removeProductFromCartHandler = () => {
    props.onRemoveProductFromCart(prodId, price);
  };

  return (
    <Fragment>
      <Grid item xs={12} style={{ padding: "5px" }}>
        {prodInfo &&
          Object.values(prodInfo).map((item, index) => {
            if (item.id === prodId) {
              // console.log("---", item.id);
              return (
                <Box key={index}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "10px",
                      borderRadius: 10,
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} lg={3} md={3} textAlign="center">
                        <NavLink to={`/products/${prodId}`}>
                          <img
                            src={item.image}
                            style={{
                              height: "15vh",
                              width: "15vh",
                              borderRadius: 10,
                            }}
                          />
                        </NavLink>
                      </Grid>
                      <Grid item xs={12} lg={9} md={12}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>₹{item.price}</div>
                          <div>
                            <IconButton onClick={removeProductFromCartHandler}>
                              <ClearIcon />
                            </IconButton>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={12}
                          md={12}
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              textAlign: "center",
                            },
                            [theme.breakpoints.down("md")]: {
                              textAlign: "center",
                            },
                          }}
                        >
                          {item.name}
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                          <Grid
                            item
                            xs={12}
                            lg={5}
                            md={5}
                            sx={{
                              border: "2px solid #D5D6D1",
                              borderRadius: 2,
                              height: "100%",
                              padding: "5px",
                              display: "flex",
                              justifyContent: "space-between",
                              [theme.breakpoints.down("sm")]: {
                                width: "100%",
                              },
                            }}
                          >
                            <Button
                              onClick={decrementQtyHandler}
                              style={{
                                color: "#000000",
                              }}
                            >
                              -
                            </Button>
                            <TextField
                              variant="outlined"
                              size="small"
                              inputProps={{ style: { fontSize: 12 } }}
                              style={{
                                width: "7vh",
                                border: "none",
                                marginTop: "2px",
                              }}
                              value={prodQty && prodQty}
                            />

                            <Button
                              onClick={incrementQtyHandler}
                              style={{
                                color: "#000000",
                              }}
                            >
                              +
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider style={{ width: "93%", marginLeft: "5%" }} />
                </Box>
              );
            }
          })}
        <Divider style={{ width: "93%", marginLeft: "5%" }} />
      </Grid>
    </Fragment>
  );
}
