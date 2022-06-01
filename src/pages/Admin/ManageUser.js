import { Fragment, useDebugValue, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserDetail,
  updateUserStatus,
} from "../../redux/actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import {
  GET_ALL_USER_RESET,
  UPDATE_USER_STATUS_RESET,
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
                style={{ height: 400, textAlign: "center" }}
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
                    field: "email",
                    headerName: "EMAIL ID",
                    width: 250,
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
                  // {
                  //   field: "is_active",
                  //   headerName: "STATUS",
                  //   sortable: false,
                  //   width: 200,
                  //   renderCell: (params) => (
                  //     <Button
                  //       variant="conained"
                  //       style={{
                  //         backgroundColor: params.value ? "#278A2E" : "#BA2C3C",
                  //         color: "#ffffff",
                  //       }}
                  //       onClick={() => {
                  //         const status = {
                  //           id: params.id,
                  //           is_active: !params.value,
                  //         };
                  //         dispatch(updateUserStatus(status));
                  //         dispatch({ type: UPDATE_USER_STATUS_RESET });
                  //         dispatch(getAllUserDetail());
                  //       }}
                  //     >
                  //       {params.value ? "Active" : "InActive"}
                  //     </Button>
                  //   ),
                  // },
                ]}
                rows={user ? user : []}
                // getRowId={(row) => row.internalId}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
