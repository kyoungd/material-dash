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

async function getCompanyVitals(symbol) {
    try {
        const url1 = ENDPOINT + "/vitals";
        const result1 = await axios.get(url1, {
            params: { symbol }
        });
        console.log(result1.data);
        return result1.data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getCompanyInfo(symbols) {
    const symbolList = symbols.split(',');
    const info = await symbolList.map(async symbol => await getCompanyVitals(symbol.trim()));
    return info;
}

module.exports = { getCompanyInfo };
