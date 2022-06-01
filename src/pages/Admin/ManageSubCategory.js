import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMainCategory } from "../../redux/actions/sellerAction";
import {
  getAllSubCategory,
  createSubCategory,
  deleteSubCategory,
  getMainCatName,
} from "../../redux/actions/adminAction";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { IconButton, Select, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { CREATE_SUB_CATEGORY_RESET } from "../../constants/adminConstants";
import { GET_SUBCATEGORY_RESET } from "../../constants/sellerConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "3%",
    marginLeft: "25%",
    height: "10%",
    padding: "30px",
    width: "50%",
    textAlign: "center",
    border: "1px solid #B8C1BA",
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

export default function ManageSubCategory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [subCatName, setSubCatName] = useState("");
  const [mainCatId, setMainCatId] = useState("");

  const getMainCategoryInfo = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const getSubCategoryInfo = useSelector(
    (state) => state.adminGetAllSubCategory
  );
  const createSubCatInfo = useSelector((state) => state.adminCreateSubCategory);
  const adminDeleteSubCategory = useSelector(
    (state) => state.adminDeleteSubCategory
  );

  const { mainCatInfo } = getMainCategoryInfo;
  const { subCatInfo } = getSubCategoryInfo;
  const { success } = adminDeleteSubCategory;
  const { subCategoryInfo, loading, error } = createSubCatInfo;
  let main = [];

  useEffect(() => {
    dispatch(getAllSubCategory());
    if (subCatInfo) {
      dispatch({ type: GET_SUBCATEGORY_RESET });
      dispatch(getAllSubCategory());
    }
  }, []);

  useEffect(() => {
    if (!subCatInfo) {
      dispatch({ type: GET_SUBCATEGORY_RESET });
      dispatch(getAllSubCategory());
    }
  }, [subCatInfo]);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_SUBCATEGORY_RESET });
      dispatch(getAllSubCategory());
    }
  }, [success]);

  if (mainCatInfo) {
    main = Object.values(mainCatInfo);
  }

  const handleOpen = () => {
    dispatch({ type: CREATE_SUB_CATEGORY_RESET });
    setOpen(true);
    dispatch(getMainCategory());
  };
  const handleClose = () => setOpen(false);

  const deleteSubCategoryHandler = (id) => {
    dispatch(deleteSubCategory(id));
    dispatch({ type: GET_SUBCATEGORY_RESET });
    dispatch(getAllSubCategory());
  };

  const submitHandler = () => {
    if (subCatName === "" || mainCatId === "") return;

    const sub = {
      main_cat_id: mainCatId,
      sub_cat_name: subCatName,
    };
    dispatch(createSubCategory(sub));
    dispatch({ type: GET_SUBCATEGORY_RESET });
    dispatch(getAllSubCategory());

    setSubCatName("");
    setMainCatId("");
  };

  return (
    <Fragment>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <Container className={classes.formWrapper}>
              <Grid item xs={3} style={{ padding: "15px", fontWeight: "bold" }}>
                Select Category
              </Grid>
              <Grid item xs={9}>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={mainCatId}
                  onChange={(e) => {
                    setMainCatId(e.target.value);
                  }}
                  fullWidth
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {main &&
                    main.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.main_cat_name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={3} style={{ padding: "15px", fontWeight: "bold" }}>
                Sub Category Name
              </Grid>
              <Grid item xs={9}>
                <TextField
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    setSubCatName(e.target.value);
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
                    width: "150px",
                    height: "30px",
                  }}
                  onClick={submitHandler}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={12}>
                {loading && "Loading...."}
                {/* {mainCategoryInfo && mainCategoryInfo.message} */}
                {subCategoryInfo && setOpen(false)}
                {error && error}
              </Grid>
            </Container>
          </Box>
        </Modal>
      )}

      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 25, fontWeight: "bold" }}>
            Manage Sub Category
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
              Add SubCategory
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }}>
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
                    field: "sub_cat_name",
                    headerName: "Sub Category Name",
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
                          deleteSubCategoryHandler(id.id);
                        }}
                      >
                        <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
                      </IconButton>
                    ),
                  },
                ]}
                rows={subCatInfo ? subCatInfo : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
