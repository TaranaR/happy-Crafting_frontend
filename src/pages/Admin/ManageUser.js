import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Divider, Grid } from "@mui/material";
import { GET_ALL_USER_RESET } from "../../constants/adminConstants";
import { getAllUserDetail } from "../../redux/actions/adminAction";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3%",
    marginLeft: "20%",
    height: "50%",
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

export default function ManageUser() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(5);

  const allUserDetails = useSelector((state) => state.getAllUserDetails);

  const { user } = allUserDetails;

  useEffect(() => {
    dispatch(getAllUserDetail());
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(GET_ALL_USER_RESET);
      dispatch(getAllUserDetail());
    }
  }, [user]);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 25, fontWeight: "bold" }}>
            Manage Users
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
                style={{ height: "100%", textAlign: "center" }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableColumnSelector
                rowHeight={90}
                columns={[
                  {
                    field: "email",
                    headerName: "EMAIL ID",
                    width: 250,
                    sortable: false,
                  },
                  {
                    field: "username",
                    headerName: "USERNAME",
                    width: 250,
                  },
                  {
                    field: "name",
                    headerName: "Name",
                    width: 250,
                    renderCell: (params) =>
                      params.value ? params.value : "---",
                  },
                ]}
                rows={user ? user : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
