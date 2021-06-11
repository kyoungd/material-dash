const axios = require('axios');

const ENDPOINT = "http://localhost:1337"

async function getThinkScript(scriptName, symbol, period) {
    try {
        const url1 = ENDPOINT + "/studies";
        const result1 = await axios.get(url1, {
            params: {
                symbol,
                period
            }
        });
        console.log(result1)
        return result1;
    }
    catch (err) {
        console.log(err);
    }
}

async function getMainServerApi(apiName, params) {
    try {
        const url = ENDPOINT + "/" + apiName;
        const result = await axios.get(url, {
            params
        });
        console.log(result.data);
        return result.data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getTweetSummary(symbol) {
    const data = await getMainServerApi("tweet-summaries", { symbol, _limit: 50, _sort: 'id:desc' });
    return data;
}

async function getTweets(symbol) {
    const data = await getMainServerApi("tweets", { symbol, _limit: 20, _sort: 'id:desc' });
    return data;
}

async function getVitals(symbol) {
    const data = await getMainServerApi("vitals", { symbol });
    return data;
}

async function getCompanyInfo(symbols) {
    return await symbols.split(',').map(async symbol => await getVitals(symbol.trim()));
}

async function getCompanyTweets(symbols) {
    return await symbols.split(',').map(async symbol => await getTweets(symbol.trim()));
}

async function getCompanyTweetSummary(symbols) {
    return await symbols.split(',').map(async symbol => await getTweetSummary(symbol.trim()));
}

module.exports = { getThinkScript, getCompanyInfo, getCompanyTweets, getCompanyTweetSummary };
