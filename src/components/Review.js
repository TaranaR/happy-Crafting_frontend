import { Grid } from "@mui/material";
import { Divider } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/actions/userAction";
import { GET_USER_BY_ID_RESET } from "../constants/userConstants";
import Rating from "@mui/material/Rating";
import { useTheme } from "@mui/material/styles";

export default function Review(props) {
  return (
    <Fragment>
      {props.userInfo &&
        props.userInfo.map((item, index) => {
          return (
            item[props.owner] && (
              <>
                <Grid container style={{ marginTop: "30px" }}>
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    md={3}
                    style={{ textAlign: "left" }}
                  >
                    {item[props.owner].username}
                    <div>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={9} md={9}>
                    {props.reviews[index].body && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: props.reviews[index].body,
                        }}
                      ></div>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            )
          );
        })}
    </Fragment>
  );
}
