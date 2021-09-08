import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
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
import Chart from './components/Chart';
import { getStockData } from "./components/util";
import TableStudySummary from './components/Table/TableStudySummary';

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

function getBigStat(data) {
  // const data = { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "FFHL", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 4 };

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

function isArray(a) {
  return (!!a) && (a.constructor === Array);
};

export default function Dashboard(props) {
  const [socket, setSocket] = useState(null);
  const [threeBarScore, setThreeBarScore] = useState({});
  const [stockData, setStockData] = useState({});
  const [studyData, setStudyData] = useState({});

  // establish socket connection
  useEffect(() => {
    setSocket(io('http://localhost:3001'));

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();

  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    const username = "TEST-ROOM";
    const room = "STUDYTHREEBARSCORE";

    socket.on('connection', () => {
      console.log('connected');
    });

    // join chatroom
    socket.emit("joinRoom", { username, room });

    // get room and users
    socket.on("roomUsers", ({ room, users }) => {
      console.log(room);
      console.log(users);
    });

    // message from server
    socket.on("message", (message) => {
      try {
        const scores = JSON.parse(message.text);
        if (isArray(scores)) {
          setThreeBarScore(scores);
          console.log(message.text);
        }
      } catch { }
    });

  }, [socket]);


  // useEffect(() => {
  //   getStockData().then(data => {
  //     console.log('stock1: ', data);
  //     setStockData(data);
  //   });
  // }, []);

  const stockSelected = (data) => {
    setStockData(data);
    getStockData(data["Symbol"]).then(stock => {
      console.log('stock1: ', stock);
      setStockData(stock);
    });
  }

  var classes = useStyles();
  var theme = useTheme();
  var userState = useUserState();
  var userDispatch = useUserDispatch();

  const mainChartData = getMainChartData(userState);

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  console.log('stock2: ', isArray(stockData));
  console.log('stock2: ', stockData);
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
          {
            threeBarScore != null && isArray(threeBarScore) ? <TableStudySummary data={threeBarScore} clickCallback={stockSelected} /> : <div>.Load...ThreeBar...</div>
          }
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
            {
              stockData != null && isArray(stockData) ? <Chart type='svg' data={stockData} /> : <div>.Loading...</div>
            }
          </Widget>
        </Grid>
        {getBigStat(studyData).map(stat => (
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

  // // #######################################################################
  // function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  //   var array = new Array(length).fill();
  //   let lastValue;

  //   return array.map((item, index) => {
  //     let randomValue = Math.floor(Math.random() * multiplier + 1);

  //     while (
  //       randomValue <= min ||
  //       randomValue >= max ||
  //       (lastValue && randomValue - lastValue > maxDiff)
  //     ) {
  //       randomValue = Math.floor(Math.random() * multiplier + 1);
  //     }

  //     lastValue = randomValue;

  //     return { value: randomValue };
  //   });
  // }

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
