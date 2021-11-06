const axios = require('axios');

const ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:1337";


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

async function getNewsSummary(symbol) {
    const data = await getMainServerApi("news-summaries", { symbol, _limit: 50, _sort: 'id:desc' });
    return data;
}

async function getNews(symbol) {
    const data = await getMainServerApi("site-yahoos", { symbol, _limit: 20, _sort: 'id:desc' });
    return data;
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

async function getCompanyNews(symbols) {
    return await symbols.split(',').map(async symbol => await getNews(symbol.trim()));
}

async function getCompanyNewsSummary(symbols) {
    return await symbols.split(',').map(async symbol => await getNewsSummary(symbol.trim()));
}

export { getThinkScript, getCompanyInfo, getCompanyTweets, getCompanyTweetSummary, getCompanyNews, getCompanyNewsSummary }
