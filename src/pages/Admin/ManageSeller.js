import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Divider, Grid } from "@mui/material";
import {
  GET_ALL_SELLERS_RESET,
  UPDATE_SELLER_STATUS_RESET,
} from "../../constants/adminConstants";
import {
  getAllSellerDetail,
  updateSellerStatus,
} from "../../redux/actions/adminAction";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3%",
    marginLeft: "20%",
    height: "100%",
    padding: "30px",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
      marginTop: "5%",
      padding: "20px",
    },
    textAlign: "center",
    border: "1px solid #B8C1BA",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  activeBtn: {
    backgroundColor: "#278A2E",
    color: "#ffffff",
  },
}));

export default function ManageSeller() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(5);

  const allSellerDetails = useSelector((state) => state.getAllSellerDetails);
  const updatedSeller = useSelector((state) => state.updateSellerStatus);
  const { seller } = allSellerDetails;
  const { success } = updatedSeller;

  useEffect(() => {
    dispatch(getAllSellerDetail());
    if (!seller) {
      dispatch({ type: GET_ALL_SELLERS_RESET });
      dispatch(getAllSellerDetail());
    }
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_SELLER_STATUS_RESET });
      dispatch(getAllSellerDetail());
    }
  }, [success]);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 25, fontWeight: "bold" }}>
            Manage Sellers
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "5%" }}>
            <Box
              style={{
                height: "50vh",
                width: "100%",
              }}
            >
              <DataGrid
                style={{
                  height: "100%",
                }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableColumnSelector
                rowHeight={90}
                columns={[
                  {
                    field: "shop_logo",
                    headerName: "IMAGE",
                    width: 150,
                    sortable: false,
                    renderCell: (params) => (
                      <img
                        src={params.value}
                        style={{ height: 70, width: 70, borderRadius: 100 }}
                      />
                    ),
                  },
                  {
                    field: "shop_name",
                    headerName: "SHOP NAME",
                    width: 200,
                  },
                  {
                    field: "location",
                    headerName: "LOCATION",
                    width: 150,
                    sortable: false,
                  },
                  {
                    field: "is_active",
                    headerName: "STATUS",

                    sortable: false,
                    renderCell: (params) => (
                      <Button
                        variant="conained"
                        style={{
                          backgroundColor: params.value ? "#278A2E" : "#BA2C3C",
                          color: "#ffffff",
                        }}
                        onClick={() => {
                          const status = {
                            id: params.id,
                            is_active: !params.value,
                          };
                          dispatch(updateSellerStatus(status));
                          dispatch({ type: UPDATE_SELLER_STATUS_RESET });
                          dispatch(getAllSellerDetail());
                        }}
                      >
                        {params.value ? "Active" : "InActive"}
                      </Button>
                    ),
                  },
                  {
                    field: "is_verified",
                    headerName: "VERIFICATION",
                    sortable: false,
                    width: 150,
                    renderCell: (params) => (
                      <Button
                        variant="conained"
                        style={{
                          backgroundColor: params.value ? "#278A2E" : "#BA2C3C",
                          color: "#ffffff",
                        }}
                        onClick={() => {
                          const data = {
                            id: params.id,
                            is_verified: true,
                          };
                          dispatch(updateSellerStatus(data));
                          dispatch({ type: UPDATE_SELLER_STATUS_RESET });
                          dispatch(getAllSellerDetail());
                        }}
                      >
                        {params.value ? "Verified" : "Disprove"}
                      </Button>
                    ),
                  },
                ]}
                rows={seller ? seller : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
