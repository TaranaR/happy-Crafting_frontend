import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { ButtonBase, IconButton, Select, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { CREATE_SUB_CATEGORY_RESET } from "../../constants/adminConstants";
import { GET_SUBCATEGORY_RESET } from "../../constants/sellerConstants";
import { getMainCategory } from "../../redux/actions/sellerAction";
import {
  getAllSubCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../redux/actions/adminAction";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3%",
    marginLeft: "25%",
    height: "10%",
    padding: "30px",
    width: "50%",
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
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    [theme.breakpoints.down("md")]: { width: "90%" },
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

const AddBtn = styled(ButtonBase)(({ theme }) => ({
  border: "2px solid #242F9B",
  borderRadius: 25,
  color: "#242F9B",
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

export default function ManageSubCategory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
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
                  sx={{
                    backgroundColor: "#242F9B",
                    color: "#ffffff",
                    width: "25%",
                    [theme.breakpoints.down("md")]: {
                      width: "50%",
                    },
                    height: "4vh",
                  }}
                  onClick={submitHandler}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={12}>
                {loading && "Loading...."}
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
            <AddBtn onClick={handleOpen} style={{ marginRight: "1%" }}>
              <AddIcon style={{ marginRight: "5px" }} />
              Add Product
            </AddBtn>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Box
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <DataGrid
                style={{ height: 370 }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableColumnSelector
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
                    sortable: false,

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
