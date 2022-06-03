import { Fragment } from "react";
import { Grid } from "@mui/material";
import { Divider } from "@material-ui/core";
import Rating from "@mui/material/Rating";

export default function Review(props) {
  return (
    <Fragment>
      {props.userInfo &&
        props.userInfo.map((item, index) => {
          return (
            item[props.owner] && (
              <Fragment key={index}>
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
              </Fragment>
            )
          );
        })}
    </Fragment>
  );
}
