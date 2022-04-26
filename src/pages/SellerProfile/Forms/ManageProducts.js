import { Fragment, useEffect, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  createSellerProduct,
  getProductsBySeller,
} from "../../../redux/actions/sellerAction";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { Divider } from "@material-ui/core";
import UploadProductsForm from "../../CreateShop/Forms/UploadProductsForm";
import { CREATE_PRODUCT_RESET } from "../../../constants/sellerConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "13%",
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    height: "97%",
    bgcolor: "background.paper",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
  formWrapper: {
    marginTop: "10%",
    marginRight: "3%",

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#3F3422",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3F3422",
      },
    },
  },
}));

export default function ManageProducts() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const productBySeller = useSelector((state) => state.sellerProductBySeller);
  const { prodInfo } = productBySeller;

  if (prodInfo) {
    console.log(prodInfo);
  }

  useEffect(() => {
    dispatch(getProductsBySeller());
  }, [dispatch]);

  return (
    <Fragment>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <UploadProductsForm classes={classes} />
          </Box>
        </Modal>
      )}

      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Manage Products
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ width: "80%" }} />
          </Grid>
          <Grid container style={{ margin: "20px" }}>
            <Grid xs={12}>
              <Button
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "150px",
                }}
                onClick={handleOpen}
              >
                Add Product
              </Button>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Box style={{ height: 500, width: "100%" }}>
                <DataGrid
                  checkboxSelection
                  rowHeight={80}
                  columns={[
                    {
                      field: "image",
                      headerName: "IMAGE",
                      width: 150,
                      renderCell: (params) => (
                        <img
                          src={params.value}
                          style={{ height: 60, width: 60, borderRadius: 100 }}
                        />
                      ),
                    },
                    { field: "name", headerName: "NAME", width: 250 },
                    { field: "price", headerName: "PRICE", width: 80 },
                    {
                      field: "description",
                      headerName: "DESCRIPTION",
                      width: 500,
                    },
                    { field: "size", headerName: "SIZE", width: 80 },

                    { field: "color", headerName: "COLOR", width: 150 },
                    {
                      field: "is_customizable",
                      headerName: "IS_CUSTOMIZABLE",
                      width: 150,
                      renderCell: (params) => (params.value ? "Yes" : "No"),
                    },
                  ]}
                  rows={prodInfo ? prodInfo : {}}
                  // getRowId={(row) => row.internalId}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
