import { TableCell } from "@material-ui/core";
import Moment from "moment";
import { InsertEmoticon } from "@mui/icons-material";
import { TableRow, Typography } from "@mui/material";

export default function OrderDetails(props) {
  const users = props.users;
  const address = props.address;

  return (
    <TableRow>
      <TableCell>
        {Moment(props.orderDate).format("DD MMM YYYY, HH:mm")}
      </TableCell>
      <TableCell>
        {users.map((item) => {
          return (
            item.id === props.ownerId && (
              <Typography sx={{ textTransform: "capitalize" }}>
                {item.name}
              </Typography>
            )
          );
        })}
      </TableCell>
      <TableCell>
        {address.map(
          (item) =>
            item.id === props.addressId && (
              <Typography sx={{ textTransform: "capitalize" }}>
                {item.state},{item.country}
              </Typography>
            )
        )}
      </TableCell>
      <TableCell>
        <Typography sx={{ textTransform: "uppercase" }}>
          {props.paymentMethod}
        </Typography>
      </TableCell>
      <TableCell>₹{props.saleAmount}</TableCell>
    </TableRow>
  );
}
