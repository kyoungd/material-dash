
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

export default getBigStat;
