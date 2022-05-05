import { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  updateSellerProduct,
  getProductsBySeller,
  deleteSellerProduct,
} from "../../../redux/actions/sellerAction";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { Divider } from "@material-ui/core";
import UploadProductsForm from "../../CreateShop/Forms/UploadProductsForm";
import {
  CREATE_PRODUCT_RESET,
  SELLER_PRODUCT_UPDATE_RESET,
} from "../../../constants/sellerConstants";

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
    maxHeight: "95%",
    //bgcolor: "background.paper",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
  formWrapper: {
    marginTop: "5%",
    marginRight: "5%",
    textAlign: "center",

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
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState("");
  const [prodId, setProdId] = useState("");

  const productBySeller = useSelector((state) => state.sellerProductBySeller);
  const updatedProduct = useSelector((state) => state.sellerUpdateProduct);
  const { prodInfo } = productBySeller;
  const { success } = updatedProduct;

  const handleOpen = () => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySeller());
    //setData(prodInfo);
    if (!prodInfo || success) {
      dispatch({ type: SELLER_PRODUCT_UPDATE_RESET });
      dispatch(getProductsBySeller());
    } else {
      setData(prodInfo);
    }
  }, [dispatch, prodInfo, success]);

  const updateProductHandler = (row) => {
    const dataField = `${row.field}`;
    const prod = {
      id: row.id,
      [dataField]: row.props.value,
    };
    if (row.props.value) {
      dispatch(updateSellerProduct(prod));
    }
    dispatch({ type: SELLER_PRODUCT_UPDATE_RESET });
    dispatch(getProductsBySeller());
    // setData(prodUpdatedInfo);
    // console.log(row.id);
    // console.log(row.field, row.props.value);
  };

  const deleteProductHandler = () => {
    console.log(prodId);

    dispatch(deleteSellerProduct(prodId));
    dispatch({ type: SELLER_PRODUCT_UPDATE_RESET });
    dispatch(getProductsBySeller());
  };

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
          <Grid container style={{ margin: "20px", textAlign: "right" }}>
            <Grid item xs={12}>
              <Button
                style={{
                  border: "2px solid #745D3E",
                  borderRadius: 25,
                  color: "#745D3E",
                  width: "170px",
                }}
                onClick={handleOpen}
              >
                <AddIcon style={{ marginRight: "5px" }} />
                Add Product
              </Button>
              <Button
                style={{
                  border: "2px solid #BA2C3C",
                  borderRadius: 25,
                  color: "#BA2C3C",
                  width: "170px",
                  marginLeft: "20px",
                }}
                onClick={deleteProductHandler}
              >
                Delete
              </Button>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Box style={{ height: 500, width: "100%" }}>
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  checkboxSelection
                  rowHeight={80}
                  onCellClick={(row) => {
                    setProdId(row.id);
                  }}
                  onEditCellPropsChange={updateProductHandler}
                  columns={[
                    {
                      field: "image",
                      headerName: "IMAGE",
                      width: 90,
                      renderCell: (params) => (
                        <img
                          src={params.value}
                          style={{ height: 60, width: 60, borderRadius: 100 }}
                        />
                      ),
                    },
                    {
                      field: "name",
                      headerName: "NAME",
                      width: 250,
                      editable: true,
                    },
                    {
                      field: "price",
                      headerName: "PRICE",
                      width: 80,
                      editable: true,
                    },
                    {
                      field: "description",
                      headerName: "DESCRIPTION",
                      width: 500,
                      editable: true,
                    },
                    {
                      field: "size",
                      headerName: "SIZE",
                      width: 80,
                      editable: true,
                    },

                    {
                      field: "color",
                      headerName: "COLOR",
                      width: 150,
                      editable: true,
                      renderCell: (params) =>
                        params.value ? params.value : "---",
                    },
                    {
                      field: "is_customizable",
                      headerName: "IS_CUSTOMIZABLE",
                      width: 150,
                      editable: true,
                      renderCell: (params) => (params.value ? "Yes" : "No"),
                    },
                  ]}
                  rows={data ? data : []}
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
