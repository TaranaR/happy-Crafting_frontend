import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategory } from "../../redux/actions/sellerAction";
import {
  createMainCategory,
  deleteMainCategory,
} from "../../redux/actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { CREATE_MAIN_CATEGORY_RESET } from "../../constants/adminConstants";
import { GET_MAINCATEGORY_RESET } from "../../constants/sellerConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "3%",
    marginLeft: "25%",
    height: "10%",
    padding: "30px",
    width: "50%",
    textAlign: "center",
    border: "1px solid #B8C1BA",
    //boxShadow: "5px 5px #B8C1BA",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    maxHeight: "50%",
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

export default function ManageCategory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [mainCatName, setMainCatName] = useState("");
  const [data, setData] = useState("");
  const [mainCatId, setmainCatId] = useState("");

  const getMainCategoryInfo = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const createMainCatInfo = useSelector(
    (state) => state.adminCreateMainCategory
  );
  const adminDeleteMainCategory = useSelector(
    (state) => state.adminDeleteMainCategory
  );
  const { mainCatInfo } = getMainCategoryInfo;
  const { mainCategoryInfo, loading, error } = createMainCatInfo;
  const { success } = adminDeleteMainCategory;

  useEffect(() => {
    dispatch(getMainCategory());
    if (mainCatInfo) {
      dispatch({ type: GET_MAINCATEGORY_RESET });
      dispatch(getMainCategory());
    }
  }, []);

  useEffect(() => {
    if (!mainCatInfo) {
      dispatch({ type: GET_MAINCATEGORY_RESET });
      dispatch(getMainCategory());
    }
  }, [mainCatInfo]);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_MAINCATEGORY_RESET });
      dispatch(getMainCategory());
    }
  }, [success]);

  const handleOpen = () => {
    dispatch({ type: CREATE_MAIN_CATEGORY_RESET });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteMainCategory(id));
    dispatch({ type: GET_MAINCATEGORY_RESET });
    dispatch(getMainCategory());
  };

  const submitHandler = () => {
    if (mainCatName === "") return;
    const main = {
      main_cat_name: mainCatName,
    };
    dispatch(createMainCategory(main));
    dispatch({ type: GET_MAINCATEGORY_RESET });
    dispatch(getMainCategory());
    setMainCatName("");
  };

  return (
    <Fragment>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <Container className={classes.formWrapper}>
              <Grid item xs={3} style={{ padding: "15px", fontWeight: "bold" }}>
                Category Name
              </Grid>
              <Grid item xs={9}>
                <TextField
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    setMainCatName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ padding: "15px", marginTop: "1vh" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#826F66",
                    color: "#ffffff",
                    width: "25%",
                    height: "4vh",
                  }}
                  onClick={submitHandler}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={12}>
                {loading && "Loading...."}
                {/* {mainCategoryInfo && mainCategoryInfo.message} */}
                {mainCategoryInfo && setOpen(false)}
                {error && error}
              </Grid>
            </Container>
          </Box>
        </Modal>
      )}

      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 25, fontWeight: "bold" }}>
            Manage Category
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              style={{
                border: "2px solid #06113C",
                borderRadius: 25,
                color: "#06113C",
                width: "30%",
                height: "4vh",
              }}
              onClick={handleOpen}
            >
              <AddIcon style={{ marginRight: "5px" }} />
              Add Category
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "2%" }}>
            <Box
              style={{
                height: "100%",
                width: "100%",
                // boxShadow:
                //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
            >
              <DataGrid
                style={{ height: 370 }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rowHeight={55}
                columns={[
                  {
                    field: "main_cat_name",
                    headerName: "Main Category Name",
                    width: 400,
                  },
                  {
                    field: "action",
                    headerName: "Action",
                    width: 100,

                    // Important: passing id from customers state so I can delete or edit each user
                    renderCell: (id) => (
                      <IconButton
                        onClick={() => {
                          deleteCategoryHandler(id.id);
                        }}
                      >
                        <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
                      </IconButton>
                    ),
                  },
                ]}
                rows={mainCatInfo ? mainCatInfo : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
