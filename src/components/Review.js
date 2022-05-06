import { Grid } from "@mui/material";
import { Divider } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/actions/userAction";
import { GET_USER_BY_ID_RESET } from "../constants/userConstants";
import Rating from "@mui/material/Rating";

export default function Review(props) {
  const dispatch = useDispatch();

  const userGetUserById = useSelector((state) => state.userGetUserById);
  const { userInfo } = userGetUserById;

  //   useEffect(() => {
  //     dispatch({ type: GET_USER_BY_ID_RESET });
  //     dispatch(getUserById(props.item.owner));
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getUserById(props.item.owner));
    if (userInfo) {
      dispatch({ type: GET_USER_BY_ID_RESET });
      dispatch(getUserById(props.item.owner));
    }
  }, [dispatch]);

  // if (userInfo) {
  //   console.log(userInfo);
  // }

  return (
    <Fragment>
      <Grid container style={{ marginTop: "30px" }}>
        <Grid item xs={3} style={{ textAlign: "left" }}>
          {userInfo && userInfo.username}
          {/* {props.item.owner} */}
          <div>
            <Rating name="read-only" value={5} readOnly />
          </div>
        </Grid>
        <Grid item xs={9}>
          {props.item.body}
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}
