
function getTimeframe(timeperiod) {
    // lowercase
    switch (timeperiod.toLowerCase()) {
        case "2min":
        case "5min":
        case "10min":
            return 'NEWS_SEARCH_4_hour_ago';
        case "30min":
        case "1hour":
        case "4hour":
            return 'NEWS_SEARCH_1_day_ago';
        case "1day":
        default:
            return 'NEWS_SEARCH_3_day_ago';
    }
}

function getBigStat(data) {
    // const data = { "KeyName": "STUDYTHREEBARSCORE", "Symbol": "FFHL", "Score": 4, "Fluctuation": 0, "KeyLevel": 0, "MultiTimeFrame": 0, "CandleStickPattern": 0, "PriceAction": 0, "FibonacciPattern": 0, "RsiAction": 0, "Ema50": 0, "Vwap": 0, "News": 0, "Correlation": 0, "WithTrend": 0, "BreakoutMomentum": 0, "FreshTrend": 0, "Level2": 0, "Total": 4 };

    let sentiment = 0;
    let yahooSentiment = 0;
    let tweetSentiment = 0;
    let googleSentiment = 0;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        sentiment = 0;
    }
    else {
        const tf = getTimeframe(data.period);
        const smt = data.news.news.find(item => item.timeframe === tf);
        if (smt) {
            sentiment = smt.sentiment;
            yahooSentiment = smt.yahoo.sentiment;
            tweetSentiment = smt.twitter.sentiment;
            googleSentiment = smt.google.sentiment;
        }
    }
    const score = data && data.point ? data.point : 0;
    // const sentiment = data && data.sentiment ? data.sentiment : 0;
    const vol = data && data.trade && data.trade.volume ? data.trade.volume : 0;
    const bigStat = [
        {
            product: "KPI",
            color: "primary",
            total: {
                monthly: 0,
                weekly: 0,
                daily: score,
                percent: { value: score, profit: true }
            },
            firstdata: {
                monthly: { value: 0, profit: false },
                weekly: { value: 0, profit: true },
                daily: { title: "sentiment", value: sentiment, profit: true }
            },
            sentiment: {
                monthly: { value: 0, profit: false },
                weekly: { value: 0, profit: true },
                daily: { title: "volume", value: vol, profit: false }
            },
            third: {
                monthly: { value: 0, profit: false },
                weekly: { value: 0, profit: true },
                daily: { title: "price-action", value: data["PriceAction"], profit: true }
            }
        },
        {
            product: "News",
            color: "warning",
            total: {
                monthly: 0,
                weekly: 0,
                daily: 0,
                percent: { value: sentiment, profit: true }
            },
            firstdata: {
                monthly: { value: 0, profit: true },
                weekly: { value: 0, profit: true },
                daily: { title: "yahoo", value: yahooSentiment, profit: false }
            },
            sentiment: {
                monthly: { value: 0, profit: true },
                weekly: { value: 0, profit: false },
                daily: { title: "tweet", value: tweetSentiment, profit: false }
            },
            third: {
                monthly: { value: 0, profit: false },
                weekly: { value: 0, profit: true },
                daily: { title: "google", value: googleSentiment, profit: true }
            }
        },
        {
            product: "Momentum",
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

export default getBigStat;
