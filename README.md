## VERSION - V0.1

1.  Material-Dash. Regular React application. This runs the front-end website.
    npm run start
2.  Material-Server. NodeJS. This is the HTTP API backend.
    npm run start
3.  Redis. With Timeseries extension. Pub/Sub and Timeseries data
4.  Postgresql. This database is backed up in the Material-Server data depot.
5.  Material-Stream. NodeJS.  
     npm run start
6.  Material-Stock. Python
    python3 ThreeBarScore.py
    python3 ThreeBarCandidate.py
7.  Material-news. nodejs
    npm run start
8.  Material-twitter. python
    python3 app.py

## scoring

1.  study score
2.  candle stick pattern
3.  price-action
4.  multiframe analysis
5.  fibonacci
    https://www.youtube.com/watch?v=xU9j_MkRYfg
    Calculate and plot fibonacci retracement levels for an upward trending using python
6.  divergence
    https://raposa.trade/trade-rsi-divergence-python/
    RSI Divegence in Python
7.  breakout
8.  trend - with
9.  fresh trend
10. key levels
11. vwap
12. ema50
13. news
14. total
15. volume
16. volitility
17. standard deviation

{
type: "threebars",
symbol: "FATBB",
period: "2Min",
indicator: "price",
timestamp: 1636480560,
point: 4,
data: [
{
t: 1636480560,
c: 18.52,
o: 18.8,
h: 18.8,
l: 18.5,
v: 4183,
date: "9:56:00 am",
seconds: 397
},
{
t: 1636480440,
c: 18.76,
o: 18.7,
h: 18.8,
l: 18.7,
v: 1595,
date: "9:54:00 am",
seconds: 517
},
{
t: 1636480200,
c: 18.79,
o: 18.6,
h: 18.79,
l: 18.3,
v: 1460,
date: "9:50:00 am",
seconds: 757
},
{
t: 1636480080,
c: 18.4,
o: 18.875,
h: 19,
l: 18.3,
v: 5703,
date: "9:48:00 am",
seconds: 877
},
{
t: 1636479960,
c: 18.85,
o: 18.855,
h: 19,
l: 18.84,
v: 1798,
date: "9:46:00 am",
seconds: 997
},
{
t: 1636479840,
c: 18.855,
o: 18.64,
h: 18.99,
l: 18.64,
v: 4455,
date: "9:44:00 am",
seconds: 1117
},
{
t: 1636479600,
c: 18.5,
o: 18.49,
h: 18.5,
l: 18.48,
v: 2005,
date: "9:40:00 am",
seconds: 1357
},
{
t: 1636479480,
c: 18.49,
o: 18.35,
h: 18.49,
l: 18.22,
v: 920,
date: "9:38:00 am",
seconds: 1477
}
],
trade: {
symbol: "FATBB",
close: 18.62,
volume: 9
},
Score: 4
}
