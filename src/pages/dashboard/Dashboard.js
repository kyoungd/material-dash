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
import { getStockData, getNewsData } from "./components/util";
import TableStudySummary from './components/Table/TableStudySummary';
import getBigStat from './bigStat';
import { ScreenShare } from "@material-ui/icons";
import TableNews from "./components/Table/TableNews";

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
  const [newsData, setNewsData] = useState({});
  const [newsDetail, setNewsDetail] = useState({});
  const [stockData, setStockData] = useState({});
  const [studyData, setStudyData] = useState({});

  // establish socket connection
  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SERVER_STREAM || 'http://localhost:3001'));

    // CLEAN UP THE EFFECT
    return () => {
      if (socket)
        socket.disconnect();
    }
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
        // test data here.
        // use score-news.json file
        const mode = process.env.REACT_APP_SERVER_MODE;
        const scores = mode === 'DEBUG' ? require('./score-news.json') : JSON.parse(message.text);
        // const scores = JSON.parse(message.text);
        if (isArray(scores.threebar)) {
          setThreeBarScore(scores.threebar);
          setNewsData(scores.news);
          // console.log('setThreeBarScore : ', message.text);
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

  const stockSelected = (data, news) => {
    data['news'] = news ? news : [];
    setStudyData(data);
    getStockData(data["symbol"]).then(stock => {
      // console.log('stock1: ', stock);
      setStockData(stock);
    });
    const mode = process.env.REACT_APP_SERVER_MODE;
    if (mode === 'DEBUG') {
      const newsDetail = require('./news.json');
      setNewsDetail(newsDetail);
    }
    else if (process.env.REACT_APP_NEWS_URL && process.env.REACT_APP_NEWS_URL !== '') {
      getNewsData(data["symbol"]).then(newsDetail => {
        setNewsDetail(newsDetail);
      });
    }
    else {
      setNewsDetail({});
    }
  }

  var classes = useStyles();
  var theme = useTheme();
  var userState = useUserState();
  var userDispatch = useUserDispatch();

  const mainChartData = getMainChartData(userState);
  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  // console.log('stock2: ', isArray(stockData));
  // console.log('stock2: ', stockData);
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
            threeBarScore != null && isArray(threeBarScore) ? <TableStudySummary data={{ threeBarScore, newsData }} clickCallback={stockSelected} /> : <div>.Load...ThreeBar...</div>
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
                  Stock Chart
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
                  <MenuItem value="1Min">1 Min</MenuItem>
                  <MenuItem value="2Min">2 Min</MenuItem>
                  <MenuItem value="5Min">5 Min</MenuItem>
                  <MenuItem value="10Min">10 Min</MenuItem>
                  <MenuItem value="1Hour">Hourly</MenuItem>
                  <MenuItem value="1Day">Daily</MenuItem>
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
        <TableNews news={newsDetail} />
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
