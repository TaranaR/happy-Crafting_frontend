import { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Grid, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { GET_PRODUCT_DETAILS_RESET } from "../../../constants/userConstants";

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
    maxHeight: "99%",
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

const AddBtn = styled(ButtonBase)(({ theme }) => ({
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
  editBtn: {
    "&:hover ": {
      color: "primary",
    },
  },
}));

export default function ManageProducts() {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const [prodId, setProdId] = useState("");

  const productBySeller = useSelector((state) => state.sellerProductBySeller);
  const updatedProduct = useSelector((state) => state.sellerUpdateProduct);
  const sellerDeleteProduct = useSelector((state) => state.sellerDeleteProduct);
  const { success: deleteSuccess } = sellerDeleteProduct;
  const { prodInfo } = productBySeller;
  const { success } = updatedProduct;

  const handleOpen = () => {
    setProdId(null);
    console.log("----", prodId);
    setOpen(true);
    dispatch({ type: GET_PRODUCT_DETAILS_RESET });
  };
  const handleClose = () => {
    setOpen(false);
    setProdId(null);
    dispatch({ type: GET_PRODUCT_DETAILS_RESET });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySeller());
  }, [open]);

  // useEffect(() => {
  //   if (!prodInfo || success || deleteSuccess) {
  //     dispatch({ type: SELLER_PRODUCT_UPDATE_RESET });
  //     dispatch(getProductsBySeller());
  //   }
  // }, [dispatch, success, prodInfo]);
  useEffect(() => {
    if (!prodInfo || deleteSuccess) {
      dispatch(getProductsBySeller());
    }
  }, [dispatch, deleteSuccess]);

  prodId && console.log("prodid", prodId);

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

  const deleteProductHandler = (id) => {
    console.log("in", id);
    dispatch(deleteSellerProduct(id));
    dispatch({ type: SELLER_PRODUCT_UPDATE_RESET });
    dispatch(getProductsBySeller());
    setProdId(null);
  };

  return (
    <Fragment>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            {prodId && (
              <UploadProductsForm
                classes={classes}
                onClose={handleClose}
                prodId={prodId}
              />
            )}
            {!prodId && (
              <UploadProductsForm
                classes={classes}
                onClose={handleClose}
                prodId={undefined}
              />
            )}
          </Box>
        </Modal>
      )}

      <Box className={classes.root}>
        {/* {prodInfo && (
          <div
            dangerouslySetInnerHTML={{ __html: prodInfo[0]["description"] }}
          ></div>
        )} */}
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
              <AddBtn onClick={handleOpen} style={{ marginRight: "1%" }}>
                <AddIcon style={{ marginRight: "5px" }} />
                Add Product
              </AddBtn>
              {/* {prodId && (
                <AddDeleteBtn
                  style={{
                    border: "2px solid #BA2C3C",
                    color: "#BA2C3C",
                  }}
                  onClick={deleteProductHandler}
                >
                  Update or Delete
                </AddDeleteBtn>
              )} */}
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Box style={{ height: 530, width: "95%" }}>
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  disableColumnSelector
                  disableColumnFilter
                  disableColumnMenu
                  rowHeight={80}
                  // onCellClick={(row) => {
                  //   setProdId(row.id);
                  // }}
                  //  onEditCellPropsChange={updateProductHandler}
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
                    },
                    {
                      field: "price",
                      sortable: false,
                      headerName: "PRICE",
                      width: 80,
                    },
                    // {
                    //   field: "description",
                    //   sortable: false,
                    //   headerName: "DESCRIPTION",
                    //   width: 1000,
                    //   align: "left",
                    //   editable: true,
                    //   // renderCell: (params) => (
                    //   //   <div dangerouslySetInnerHTML={{ __html: params }}></div>
                    //   // ),
                    //   renderCell: (params) => {
                    //     console.log(params.value);
                    //     return (
                    //       <span
                    //         dangerouslySetInnerHTML={{ __html: params.value }}
                    //       ></span>
                    //     );
                    //   },
                    // },
                    {
                      field: "size",
                      sortable: false,
                      headerName: "SIZE",
                      width: 80,
                    },

                    {
                      field: "color",
                      sortable: false,
                      headerName: "COLOR",
                      width: 100,
                      renderCell: (params) =>
                        // params.value ? params.value : "---",
                        params.value ? (
                          <div
                            style={{
                              height: 25,
                              width: 25,
                              borderRadius: 25,
                              border: "1px solid black",
                              background: `${params.value}`,
                            }}
                          ></div>
                        ) : (
                          "---"
                        ),
                    },
                    {
                      field: "is_customizable",
                      sortable: false,
                      headerName: "IS_CUSTOMIZABLE",
                      width: 150,
                      renderCell: (params) => (params.value ? "Yes" : "No"),
                    },
                    {
                      field: "action",
                      headerName: "Action",
                      width: 150,

                      // Important: passing id from customers state so I can delete or edit each user
                      renderCell: (id) => (
                        <>
                          <IconButton
                            sx={{ "&:hover": { color: "green" } }}
                            onClick={() => {
                              setProdId(id.id);
                              setOpen(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              deleteProductHandler(id.id);
                            }}
                          >
                            <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
                          </IconButton>
                        </>
                      ),
                    },
                  ]}
                  rows={prodInfo ? prodInfo : []}
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
