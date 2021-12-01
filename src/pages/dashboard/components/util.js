function dateFormat(date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace(/%[YmdHMS]/g, function (m) {
        switch (m) {
            case '%Y': return date[utc + 'FullYear'](); // no leading zeros required
            case '%m': m = 1 + date[utc + 'Month'](); break;
            case '%d': m = date[utc + 'Date'](); break;
            case '%H': m = date[utc + 'Hours'](); break;
            case '%M': m = date[utc + 'Minutes'](); break;
            case '%S': m = date[utc + 'Seconds'](); break;
            default: return m.slice(1); // unknown code, remove %
        }
        // add leading zero if required
        return ('0' + m).slice(-2);
    });
}

export function getStockData(symbol = 'MSFT') {
    // iso time string for EST

    // const start = '2021-09-03T07:20:50.52Z';
    // const end = '2021-09-04T07:20:50.52Z';
    const afterDate = new Date();
    const today = dateFormat(afterDate, "%Y-%m-%dT%H:%M:%S.000Z", false);
    // yesterdate date string
    const beforeDate = new Date(afterDate.setDate(afterDate.getDate() - 2));
    const yesterday = dateFormat(beforeDate, "%Y-%m-%dT%H:%M:%S.000Z", false);
    const timeframe = "1Min"
    const apiurl = "https://data.alpaca.markets/v2/stocks/" + symbol + "/bars?start=" + yesterday + "&end=" + today + "&timeframe=" + timeframe;
    const promiseMSFT = fetch(apiurl, {
        method: "GET",
        headers: {
            "APCA-API-KEY-ID": "AKAV2Z5H0NJNXYF7K24D",
            "APCA-API-SECRET-KEY": "262cAEeIRrL1KEZYKSTjZA79tj25XWrMtvz0Bezu"
        }
    })
        .then(response => response.text())
        .then(data => {
            const objs = JSON.parse(data);
            const dataArray = [];
            objs.bars.forEach(item => {
                dataArray.push({ date: new Date(item.t), open: item.o, high: item.h, low: item.l, close: item.c, volume: item.v });
            });
            return dataArray;
        });
    return promiseMSFT;
}

export function getNewsData(symbol = 'MSFT') {
    const apiurl = process.env.REACT_APP_NEWS_URL + "/symbol=" + symbol;
    const promiseMSFT = fetch(apiurl, {
        method: "GET",
        headers: {
            "APCA-API-KEY-ID": "AKAV2Z5H0NJNXYF7K24D",
            "APCA-API-SECRET-KEY": "262cAEeIRrL1KEZYKSTjZA79tj25XWrMtvz0Bezu"
        }
    })
        .then(response => response.text())
        .then(data => {
            const objs = JSON.parse(data);
            const dataArray = [];
            objs.bars.forEach(item => {
                dataArray.push({ date: new Date(item.t), open: item.o, high: item.h, low: item.l, close: item.c, volume: item.v });
            });
            return dataArray;
        });
    return promiseMSFT;
}
