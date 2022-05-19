import { Box, Button, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function RemoveAddress(props) {
  const theme = useTheme();
  const [id, setId] = useState();
  const userGetShippingAddressByUser = useSelector(
    (state) => state.userGetShippingAddressByUser
  );
  const { address } = userGetShippingAddressByUser;

  return (
    <Fragment>
      <Grid container style={{ padding: 20 }} spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            fontSize: 25,
            [theme.breakpoints.down("sm")]: {
              fontSize: 20,
            },
          }}
        >
          Remove Address
        </Grid>
        {address &&
          address.map((item) => {
            return (
              <Grid item xs={12} lg={6} md={6} key={item.id}>
                <Card
                  sx={{
                    minWidth: "100%",
                    height: "100%",
                    minHeight: "100%",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    [theme.breakpoints.down("sm")]: {
                      // height: "70%",
                      // minHeight: "100%",
                    },
                  }}
                >
                  <CardContent>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        lg={12}
                        md={12}
                        sx={{
                          fontSize: 14,
                          [theme.breakpoints.down("sm")]: {
                            fontSize: 12,
                          },
                        }}
                      >
                        {item.title}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          fontSize: 20,
                          [theme.breakpoints.down("sm")]: {
                            fontSize: 12,
                          },
                        }}
                      >
                        {item.first_name}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={12}
                        md={12}
                        sx={{
                          [theme.breakpoints.down("sm")]: {
                            fontSize: 12,
                          },
                        }}
                      >
                        {item.address},{item.city},{item.state}-{item.pincode}
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      style={{ color: "#745D3E" }}
                      onClick={() => {
                        props.onRemoveShippingAddress(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
}
