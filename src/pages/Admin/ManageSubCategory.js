import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getMainCategory } from "../../redux/actions/sellerAction";
import {
  getAllSubCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../redux/actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import { Select, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { CREATE_SUB_CATEGORY_RESET } from "../../constants/adminConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "3%",
    marginLeft: "20%",
    height: "10%",
    padding: "30px",
    width: "60%",
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

export default function ManageSubCategory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [subCatName, setSubCatName] = useState("");
  const [data, setData] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [mainCatId, setMainCatId] = useState("");

  const getMainCategoryInfo = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const getSubCategoryInfo = useSelector(
    (state) => state.adminGetAllSubCategory
  );
  const createMainCatInfo = useSelector(
    (state) => state.adminCreateSubCategory
  );

  const { mainCatInfo } = getMainCategoryInfo;
  const { subCatInfo } = getSubCategoryInfo;
  const { subCategoryInfo, loading, error } = createMainCatInfo;
  let main = [];

  useEffect(() => {
    dispatch(getAllSubCategory());
    if (!subCatInfo) {
      dispatch(getAllSubCategory());
    } else {
      setData(subCatInfo);
    }
  }, [dispatch, subCatInfo]);

  if (mainCatInfo) {
    main = Object.values(mainCatInfo);
  }

  const handleOpen = () => {
    dispatch({ type: CREATE_SUB_CATEGORY_RESET });
    setOpen(true);
    dispatch(getMainCategory());
  };
  const handleClose = () => setOpen(false);

  const deleteSubCategoryHandler = () => {
    dispatch(deleteSubCategory(subCatId));
    dispatch(getAllSubCategory());
  };

  const submitHandler = () => {
    if (subCatName === "" || mainCatId === "") return;

    const type = {
      main_cat_id: mainCatId,
      sub_cat_name: subCatName,
    };
    dispatch(createSubCategory(type));

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
          <Grid xs={12} style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              style={{
                border: "2px solid #06113C",
                borderRadius: 25,
                color: "#06113C",
                width: "160px",
                height: "4vh",
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
                width: "140px",
                height: "4vh",
                marginLeft: "20px",
              }}
              onClick={deleteSubCategoryHandler}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }}>
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
                checkboxSelection
                rowHeight={60}
                onCellClick={(row) => {
                  setSubCatId(row.id);
                }}
                columns={[
                  {
                    field: "main_cat_id",
                    headerName: "Main Category Name",
                    width: 300,
                  },
                  {
                    field: "sub_cat_name",
                    headerName: "Sub Category Name",
                    width: 300,
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
