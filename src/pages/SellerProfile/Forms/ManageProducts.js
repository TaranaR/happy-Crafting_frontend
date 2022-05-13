import { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  updateSellerProduct,
  getProductsBySeller,
  deleteSellerProduct,
} from "../../../redux/actions/sellerAction";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { ButtonBase, Divider } from "@material-ui/core";
import UploadProductsForm from "../../CreateShop/Forms/UploadProductsForm";
import {
  CREATE_PRODUCT_RESET,
  SELLER_PRODUCT_UPDATE_RESET,
} from "../../../constants/sellerConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "13%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      textAlign: "center",
    },
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

const AddDeleteBtn = styled(ButtonBase)(({ theme }) => ({
  border: "2px solid #745D3E",
  borderRadius: 25,
  color: "#745D3E",
  width: "170px",
  [theme.breakpoints.down("sm")]: {
    width: "170px",
    height: "30px",
    margin: "3px",
    marginLeft: 0,
  },
  [theme.breakpoints.down("md")]: {
    width: "170px",
    height: "30px",
    marginLeft: 0,
  },
  [theme.breakpoints.down("lg")]: {
    width: "170px",
    height: "30px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "170px",
    height: "30px",
  },
}));

export default function ManageProducts() {
  const classes = useStyles();
  const theme = useTheme();
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
            <Divider />
          </Grid>
          <Grid
            container
            sx={{
              margin: "20px",
              textAlign: "right",
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
              [theme.breakpoints.down("md")]: {
                textAlign: "center",
              },
            }}
          >
            <Grid item xs={12} lg={12} md={12}>
              <AddDeleteBtn onClick={handleOpen} style={{ marginRight: "1%" }}>
                <AddIcon style={{ marginRight: "5px" }} />
                Add Product
              </AddDeleteBtn>
              <AddDeleteBtn
                style={{
                  border: "2px solid #BA2C3C",
                  color: "#BA2C3C",
                }}
                onClick={deleteProductHandler}
              >
                Delete
              </AddDeleteBtn>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Box style={{ height: 530, width: "100%" }}>
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  checkboxSelection
                  disableColumnSelector
                  disableColumnFilter
                  disableColumnMenu
                  rowHeight={80}
                  onCellClick={(row) => {
                    setProdId(row.id);
                  }}
                  onEditCellPropsChange={updateProductHandler}
                  columns={[
                    {
                      field: "image",
                      sortable: false,
                      headerName: "IMAGE",
                      width: 90,
                      renderCell: (params) => (
                        <img
                          src={params.value}
                          style={{ height: 60, width: 60, borderRadius: 10 }}
                        />
                      ),
                    },
                    {
                      field: "name",
                      sortable: false,
                      headerName: "NAME",
                      width: 250,
                      editable: true,
                    },
                    {
                      field: "price",
                      sortable: false,
                      headerName: "PRICE",
                      width: 80,
                      editable: true,
                    },
                    {
                      field: "description",
                      sortable: false,
                      headerName: "DESCRIPTION",
                      width: 500,
                      editable: true,
                    },
                    {
                      field: "size",
                      sortable: false,
                      headerName: "SIZE",
                      width: 80,
                      editable: true,
                    },

                    {
                      field: "color",
                      sortable: false,
                      headerName: "COLOR",
                      width: 150,
                      editable: true,
                      renderCell: (params) =>
                        params.value ? params.value : "---",
                    },
                    {
                      field: "is_customizable",
                      sortable: false,
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
