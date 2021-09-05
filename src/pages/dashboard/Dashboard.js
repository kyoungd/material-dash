import React, { useState } from "react";
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  YAxis,
  XAxis,
} from "recharts";
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import Ticker from "../../components/Ticker/Ticker";
import { useUserState, useUserDispatch } from "../../context/UserContext";
import TableComponent from './components/Table/Table';

function symbolCard(item, dispatch, selectedItem, classes) {
  try {
    const { symbol, name, sector, average_volume_10days, float_volume, short_percent, short_volume, summary, major_investor } = item[0]
    return (
      selectedItem === symbol ?
        <Grid item lg={3} md={6} sm={9} xs={12}>
          <div className={classes.notificationContainer}>
            <Ticker symbol={symbol} company={name} sentiment={0}
              sector={sector} avgVol={average_volume_10days} floats={float_volume}
              shortPercent={short_percent} shortVolume={short_volume} summary={summary}
              institutions={major_investor}
              dispatch={dispatch}
            />
          </div>
        </Grid>
        :
        <Grid item lg={3} md={6} sm={9} xs={12}>
          <Ticker symbol={symbol} company={name} sentiment={0}
            sector={sector} avgVol={average_volume_10days} floats={float_volume}
            shortPercent={short_percent} shortVolume={short_volume} summary={summary}
            institutions={major_investor}
            dispatch={dispatch}
          />
        </Grid>
    );
  }
  catch (ex) {
    return (
      <Grid item lg={3} md={6} sm={9} xs={12}>
        <Ticker symbol={''} company={'SYSTEM-ERROR'} sentiment={0}
          sector={''} avgVol={0} floats={0}
          shortPercent={0} shortVolume={0} summary={'symbolCard()'}
          institutions={ex.message}
          dispatch={dispatch}
        />
      </Grid>
    );
  }
}

function getTweetStat(userState) {
  const tweetSums = userState.tweetSummary[userState.selected];
  const lastTweet30 = tweetSums ? tweetSums.slice(tweetSums.length - 12, tweetSums.length - 1) : 0;
  const lastTweet60 = tweetSums ? tweetSums.slice(tweetSums.length - 24, tweetSums.lenth - 13) : 0;
  const scoreTweet30 = tweetSums ? lastTweet30.reduce((total, item) => total + item.sentiment, 0) : 0;
  const scoreTweet60 = tweetSums ? lastTweet60.reduce((total, item) => total + item.sentiment, 0) : 0;
  const deltaTweetScore = scoreTweet60 !== 0 ? (scoreTweet30 - scoreTweet60) / scoreTweet60 : 0;
  const tweet30 = tweetSums ? lastTweet30.reduce((total, item) => total + item.viewCount, 0) : 0;
  const tweet60 = tweetSums ? lastTweet60.reduce((total, item) => total + item.viewCount, 0) : 0;
  return {
    count30: tweet30,
    count60: tweet60,
    delta: deltaTweetScore,
    score30: scoreTweet30,
    score60: scoreTweet60,
    profitCount: false,
    profitScore: false
  }
}

function getNewsStat(userState) {
  const newsSums = userState.newsSummary[userState.selected];
  const lastNews30 = newsSums ? newsSums.slice(newsSums.length - 12, newsSums.length - 1) : 0;
  const lastNews60 = newsSums ? newsSums.slice(newsSums.length - 24, newsSums.lenth - 13) : 0;
  const scoreNews30 = newsSums ? lastNews30.reduce((total, item) => total + item.sentiment, 0) : 0;
  const scoreNews60 = newsSums ? lastNews60.reduce((total, item) => total + item.sentiment, 0) : 0;
  const deltaNewsScore = scoreNews60 !== 0 ? (scoreNews30 - scoreNews60) / scoreNews60 : 0;
  const news30 = newsSums ? lastNews30.reduce((total, item) => total + item.viewCount, 0) : 0;
  const news60 = newsSums ? lastNews60.reduce((total, item) => total + item.viewCount, 0) : 0;
  return {
    count30: news30,
    count60: news60,
    delta: deltaNewsScore,
    score30: scoreNews30,
    score60: scoreNews60,
    profitCount: false,
    profitScore: false
  }
}

function getBigStat(userState) {
  const data = { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "FFHL", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 4 };

  const bigStat = [
    {
      product: "Data",
      color: "primary",
      total: {
        monthly: 0,
        weekly: 0,
        daily: data["Total"],
        percent: { value: data["Total"], profit: true }
      },
      firstdata: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "score", value: data["Score"], profit: true }
      },
      sentiment: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "candle-stick", value: data["CandleStickPattern"], profit: false }
      },
      third: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "price-action", value: data["PriceAction"], profit: true }
      }
    },
    {
      product: "Analysis",
      color: "warning",
      total: {
        monthly: 0,
        weekly: 0,
        daily: 0,
        percent: { value: 0, profit: true }
      },
      firstdata: {
        monthly: { value: 0, profit: true },
        weekly: { value: 0, profit: true },
        daily: { title: "multi-frame", value: data["MultiTimeFrame"], profit: false }
      },
      sentiment: {
        monthly: { value: 0, profit: true },
        weekly: { value: 0, profit: false },
        daily: { title: "fibonacci", value: data["FibonacciPattern"], profit: false }
      },
      third: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "divergence", value: data["RsiAction"], profit: true }
      }
    },
    {
      product: "Momemntum",
      color: "secondary",
      total: {
        monthly: 0,
        weekly: 0,
        daily: 0,
        percent: { value: 0, profit: false }
      },
      firstdata: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "breakout", value: data["BreakoutMomentum"], profit: true }
      },
      sentiment: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "with-trend", value: data["WithTrend"], profit: true }
      },
      third: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "new-trend", value: data["FreshTrend"], profit: false }
      }
    },
    {
      product: "Levels",
      color: "secondary",
      total: {
        monthly: 0,
        weekly: 0,
        daily: 0,
        percent: { value: 0, profit: true }
      },
      firstdata: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "key-level", value: data["KeyLevel"], profit: false }
      },
      sentiment: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "vwap", value: data["Vwap"], profit: true }
      },
      third: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { title: "ema-50", value: data["Ema50"], profit: false }
      }
    }
  ]
  return bigStat;
}

function tweetTable(userState) {
  if (userState.selected === '')
    return;
  if (userState.length <= 0)
    return;
  if (userState.media !== "TWEETS")
    return;
  const item = Object.assign(...userState.tweets);
  const data = item[userState.selected];
  if (!data)
    return;
  const result = data.map(item =>
    ({ ...item, status: item.sentimet_score > 0 ? 'success' : 'warning' })
  );
  return (
    <Grid item xs={12}>
      <TableComponent title='Tweets' data={result} />
    </Grid>
  );
}

function newsTable(userState) {
  if (userState.selected === '')
    return;
  if (userState.length <= 0)
    return;
  if (userState.media !== "NEWS")
    return;
  const item = Object.assign(...userState.news);
  const data = item[userState.selected];
  if (!data)
    return;
  const result = data.map(item =>
    ({ ...item, status: item.sentimet_score > 0 ? 'success' : 'warning' })
  );
  return (
    <Grid item xs={12}>
      <TableComponent title='News' data={result} />
    </Grid>
  );
}

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var userState = useUserState();
  var userDispatch = useUserDispatch();

  const mainChartData = getMainChartData(userState);

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle title="Dashboard" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
      >
        Latest Reports
      </Button>} />

      <div className={classes.section}>
        <Grid container spacing={4}>
          {
            userState.symbols.map(item => symbolCard(item, userDispatch, userState.selected, classes))
          }
        </Grid>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Tweeter Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Tablet
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Sentiment
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Count
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 1, 2, 3]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="mobile"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="tablet"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        {getBigStat(userState).map(stat => (
          <Grid item md={3} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
        {tweetTable(userState)}
        {newsTable(userState)}
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData(userState) {

  var resultArray = [];
  if (Object.keys(userState.tweetSummary).length > 0 && userState.selected !== '') {
    let summary = [];
    switch (userState.media) {
      case 'TWEETS':
        const tweets = Object.assign(...userState.tweetSummary);
        summary = tweets[userState.selected];
        break;
      case "NEWS":
        const news = Object.assign(...userState.newsSummary);
        summary = news[userState.selected];
        break;
      default:
        break;
    }
    if (summary && summary.length > 0) {
      const scores = summary.map(tweetSum => tweetSum.sentiment);
      const counts = summary.map(tweetSum => tweetSum.viewCount);
      for (let i = 0; i < scores.length; i++) {
        resultArray.push({
          tablet: 0,
          desktop: counts[i],
          mobile: scores[i],
        });
      }
    }
  }

  // var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  // var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  // var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  // for (let i = 0; i < tablet.length; i++) {
  //   resultArray.push({
  //     tablet: tablet[i].value,
  //     desktop: desktop[i].value,
  //     mobile: mobile[i].value,
  //   });
  // }

  return resultArray;
}
