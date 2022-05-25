import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSellerDetail,
  updateSellerStatus,
} from "../../redux/actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import {
  GET_ALL_SELLERS_RESET,
  UPDATE_SELLER_STATUS_RESET,
} from "../../constants/adminConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "3%",
    marginLeft: "20%",
    height: "50%",
    padding: "30px",
    width: "60%",
    textAlign: "center",
    border: "1px solid #B8C1BA",
    //boxShadow: "5px 5px #B8C1BA",
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
  // const [sellerId, setSellerId] = useState("");
  const [data, setData] = useState([]);

  const allSellerDetails = useSelector((state) => state.getAllSellerDetails);
  const updatedSeller = useSelector((state) => state.updateSellerStatus);
  const { seller } = allSellerDetails;
  const { success, message } = updatedSeller;

  useEffect(() => {
    dispatch(getAllSellerDetail());
    if (!seller || success) {
      dispatch({ type: UPDATE_SELLER_STATUS_RESET });
      dispatch(getAllSellerDetail());
    } else {
      setData(seller);
    }
  }, [dispatch, seller, success]);

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
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Box
              style={{
                height: "50vh",
                width: "100%",
                // boxShadow:
                //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
            >
              <DataGrid
                style={{ height: 400 }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rowHeight={90}
                // onCellClick={(row) => {
                //   setSellerId(row.id);
                // }}
                columns={[
                  {
                    field: "shop_logo",
                    headerName: "IMAGE",
                    width: 150,
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
                    width: 200,
                  },
                  // {
                  //   field: "description",
                  //   headerName: "DESCRIPTION",
                  //   width: 500,
                  // },

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
                ]}
                rows={data ? data : []}
                // getRowId={(row) => row.internalId}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
