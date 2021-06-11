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
import { useUserState } from "../../context/UserContext";


function symbolCard(item) {
  try {
    const { symbol, name, sector, average_volume_10days, float_volume, short_percent, short_volume, summary, major_investor } = item[0]
    return (
      <Grid item lg={3} md={6} sm={9} xs={12}>
        <Ticker symbol={symbol} company={name} sentiment={0}
          sector={sector} avgVol={average_volume_10days} floats={float_volume}
          shortPercent={short_percent} shortVolume={short_volume} summary={summary}
          institutions={major_investor}
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
        />
      </Grid>
    );
  }
}

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var userState = useUserState();

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
          {userState.symbols.map(item => symbolCard(item))}
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
                  Daily Line Chart
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
                      Mobile
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Desktop
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
        {mock.bigStat.map(stat => (
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
  const summary = userState.tweetSummary;
  if (summary.length > 0) {
    const scores = summary[0].map(tweetSum => tweetSum.tweet_score);
    const counts = summary[0].map(tweetSum => tweetSum.tweet_count);
    for (let i = 0; i < scores.length; i++) {
      resultArray.push({
        tablet: scores[i].value,
        desktop: counts[i].value,
        mobile: 0,
      });
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
