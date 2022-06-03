import { Fragment } from "react";
import { Container, Grid } from "@mui/material";

export default function StartSellingForm(props) {
  return (
    <Fragment>
      <Container className={props.classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid xs={12} style={{ fontSize: 30, color: "#237E39" }}>
            You are all Done.!!
          </Grid>
          <Grid
            xs={12}
            style={{ marginLeft: "20vh", marginRight: "20vh", marginTop: 50 }}
          >
            You are all set to sell your products. You created your shop and
            uploaded a product. You can upload more of your products from your
            shop profile. Now sit back and wait for the authority to verify your
            shop.
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
