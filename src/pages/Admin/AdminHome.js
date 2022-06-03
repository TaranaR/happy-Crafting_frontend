import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import {
  getAllUserDetail,
  getAllSellerDetail,
  getAllOrderDetail,
  getRecentOrderDetail,
} from "../../redux/actions/adminAction";
import OrderDetails from "../../components/OrderDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3%",
    width: "95%",
    marginLeft: "2.5%",
  },
}));

export default function AdminHome() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const getAllUserDetails = useSelector((state) => state.getAllUserDetails);
  const getAllSellerDetails = useSelector((state) => state.getAllSellerDetails);
  const adminGetAllOrderDetails = useSelector(
    (state) => state.adminGetAllOrderDetails
  );
  const adminGetRecentOrderDetails = useSelector(
    (state) => state.adminGetRecentOrderDetails
  );

  const { user } = getAllUserDetails;
  const { seller } = getAllSellerDetails;
  const { allorders } = adminGetAllOrderDetails;
  const { recentorders } = adminGetRecentOrderDetails;

  const { orders, users, address } = recentorders;
  const { orders: allordersData } = allorders;

  useEffect(() => {
    dispatch(getAllUserDetail());
    dispatch(getAllSellerDetail());
    dispatch(getAllOrderDetail());
    dispatch(getRecentOrderDetail());
  }, []);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={4} md={4}>
                <Card
                  sx={{
                    textAlign: "center",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 25,
                        color: "#242F9B",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Total Users
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Total number of users till now.
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 35 }}>
                      {user?.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <Card
                  sx={{
                    textAlign: "center",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 25,
                        color: "#242F9B",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Total Sellers
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Total number of sellers till now.
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 35 }}>
                      {seller?.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <Card
                  sx={{
                    textAlign: "center",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 25,
                        color: "#242F9B",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Total Orders
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Total number of orders till now.
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 35 }}>
                      {allordersData?.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "3%" }}>
            <Box
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#ffffff",
                padding: 2,
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  fontSize: 25,
                  color: "#242F9B",
                  fontWeight: "bold",
                }}
              >
                Recent Orders
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Sale Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders &&
                        orders.map((item, index) => {
                          return (
                            <OrderDetails
                              key={index}
                              orderDate={item.order_date}
                              paymentMethod={item.payment_method}
                              saleAmount={item.bill_amount}
                              ownerId={item.owner}
                              addressId={item.address}
                              users={users}
                              address={address}
                            />
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
