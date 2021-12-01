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
import useStyles from "../../styles";
import Widget from "../../../../components/Widget/Widget";
import { v4 as uuidv4 } from "uuid";

const states = {
  success: "success",
  warning: "warning",
  secondary: "secondary",
};

function getStudySummary(data) {
  // let test = [{ "k": 1, "y": 2 }];
  // console.log(test);
  // let data = [{ "KeyName": "STUDYTHREEBARSCORE", "Symbol": "FFHL", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "HTOO", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "AKYA", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "SQBG", "Score": 2, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "RANI", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "IMPL", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "BTCM", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "ABSI", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "FCUV", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "XENE", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "MNTK", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "AGIL", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "UGRO", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "CARV", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }, { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "ABOS", "Score": 0, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 0 }];
  const dataTable = data.map(item => {
    item['Timestamp'] = new Date(item['timestamp'] * 1000);
    item['Status'] = 'Active'
    item['id'] = uuidv4()
    return item;
  }).filter(item => item['Score'] > 0);
  return dataTable;
}

export default function TableComponent({ data, clickCallback }) {
  const scores = data.threeBarScore;
  const news = data.newsData;
  const title = "THREE BAR STUDY"
  const ranking = getStudySummary(scores);
  const classes = useStyles();
  if (ranking == null || ranking.length <= 0)
    return <div />
  var keys = Object.keys(ranking[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Widget title={title} upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
          <Table className="mb-0">
            <TableBody>
              <TableRow key="0">
                <TableCell>SECONDS</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>SYMBOL</TableCell>
                <TableCell>PERIOD</TableCell>
                <TableCell>SCORE</TableCell>
                <TableCell>VOLUME</TableCell>
              </TableRow>
              {ranking.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell>{rate.data[0].seconds} secs</TableCell>
                  <TableCell>{moment(rate.timestamp).format("HH:mm:ss")}</TableCell>
                  <TableCell>{rate.symbol}</TableCell>
                  <TableCell>{rate.period}</TableCell>
                  <TableCell onClick={e => {
                    const newsItem = news.find(item => item.symbol === rate.symbol);
                    clickCallback(rate, newsItem);
                  }}>
                    <Chip label={rate.Score.toString()} classes={{ root: classes[states[rate.Status.toLowerCase()]] }} />
                  </TableCell>
                  <TableCell>{rate.data[0].v.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Widget>
      </Grid>
    </Grid>
  );
}
