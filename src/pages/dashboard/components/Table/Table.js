import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Grid
} from "@material-ui/core";
import moment from 'moment';
import MUIDataTable from "mui-datatables";
import useStyles from "../../styles";
import Widget from "../../../../components/Widget";

const states = {
  success: "success",
  warning: "warning",
  secondary: "secondary",
};

export default function TableComponent({ title, data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Widget title={title} upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
          <Table className="mb-0">
            <TableBody>
              <TableRow key="0">
                <TableCell>DATE</TableCell>
                <TableCell>TEXT</TableCell>
                <TableCell>SENTIMENT</TableCell>
              </TableRow>
              {data.map(({ id, tweet_dt, tweet_text, sentiment_score, status }) => (
                <TableRow key={id}>
                  <TableCell>{moment(tweet_dt).format("MM/DD HH:mm:ss")}</TableCell>
                  <TableCell>{tweet_text}</TableCell>
                  <TableCell>
                    <Chip label={Math.round(sentiment_score * 100).toString() + "%"} classes={{ root: classes[states[status.toLowerCase()]] }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Widget>
      </Grid>
    </Grid>
  );
}
