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

function getBigStat(userState) {

  const tweetSums = userState.tweetSummary[userState.selected];
  const last30 = tweetSums ? tweetSums.slice(tweetSums.length - 12, tweetSums.length - 1) : 0;
  const last60 = tweetSums ? tweetSums.slice(tweetSums.length - 24, tweetSums.lenth - 13) : 0;
  const score30 = tweetSums ? last30.reduce((total, item) => total + item.tweet_score, 0) : 0;
  const score60 = tweetSums ? last60.reduce((total, item) => total + item.tweet_score, 0) : 0;
  const deltaScore = score60 !== 0 ? (score30 - score60) / score60 : 0;
  const tweet30 = tweetSums ? last30.reduce((total, item) => total + item.tweet_count, 0) : 0;
  const tweet60 = tweetSums ? last60.reduce((total, item) => total + item.tweet_count, 0) : 0;
  const bigStat = [
    {
      product: "Tweets",
      total: {
        monthly: 0,
        weekly: 0,
        daily: Math.round(tweet30 + tweet60),
        percent: { value: Math.round(deltaScore * 100), profit: false }
      },
      color: "primary",
      messages: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { value: tweet30, profit: (tweet30 > tweet60) }
      },
      sentiment: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: true },
        daily: { value: Math.round(score30 * 100), profit: (score30 > score60) }
      }
    },
    {
      product: "Reddit",
      total: {
        monthly: 0,
        weekly: 0,
        daily: 0,
        percent: { value: 0, profit: true }
      },
      color: "warning",
      messages: {
        monthly: { value: 0, profit: true },
        weekly: { value: 0, profit: true },
        daily: { value: 0, profit: false }
      },
      sentiment: {
        monthly: { value: 0, profit: true },
        weekly: { value: 0, profit: false },
        daily: { value: 0, profit: false }
      }
    },
    {
      product: "News",
      total: {
        monthly: 0,
        weekly: 0,
        daily: 0,
        percent: { value: 0, profit: true }
      },
      color: "secondary",
      messages: {
        monthly: { value: 0, profit: true },
        weekly: { value: 0, profit: false },
        daily: { value: 0, profit: false }
      },
      sentiment: {
        monthly: { value: 0, profit: false },
        weekly: { value: 0, profit: false },
        daily: { value: 0, profit: true }
      }
    }
  ]
  return bigStat;
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
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
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
    const summary = userState.tweetSummary[userState.selected];
    if (summary && summary.length > 0) {
      const scores = summary.map(tweetSum => tweetSum.tweet_score);
      const counts = summary.map(tweetSum => tweetSum.tweet_count);
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
