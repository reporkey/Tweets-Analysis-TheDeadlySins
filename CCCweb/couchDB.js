const nano = require('nano')('http://admin:group3@172.26.38.76:5984');
const fs = require('fs');
require("async");
const utilities = require("./utilities");

const viewPath = "./designDoc.json";
let viewData = fs.readFileSync(viewPath);
let viewJson = JSON.parse(viewData);

// List all existing databases
nano.db.list().then((body) => {
    console.log("_all_dbs:", body);
});

const designDocName = "filter";
const realtimeTweets = nano.use("realtime_tweets");
const historicalTweets = nano.use("historical_tweets_new");

let result = {
    "realtime": { "token": null, "total": null,},
    "historical": { "token": null, "total": null}
};

async function filterToken(db) {
    let newToken = await db.get('_design/'+designDocName+'/_view/token');
    return newToken.rows[0].value;
}
async function filterTotal(db) {
    let newTotal = await db.get('_design/'+designDocName+'/_view/total');
    return newTotal.rows[0].value;
}
async function dbInfo(db) {
    return await db.info();
}
function refreshReduce() {
    Promise.all([filterToken(historicalTweets), filterTotal(historicalTweets),
        filterToken(realtimeTweets), filterTotal(realtimeTweets)
    ]).then(([newHistoricalToken, newHistoricalTotal, newRealtimeToken, newRealtimeTotal]) => {
        result.historical.token = newHistoricalToken;
        result.historical.total = newHistoricalTotal;
        // result.historical.dbInfo = newHistoricalDbInfo;
        result.realtime.token = newRealtimeToken;
        result.realtime.total = newRealtimeTotal;
        // result.realtime.dbInfo = newRealtimeDbInfo;
    });
    setTimeout(refreshReduce, 5000);
}

// insert design documents
module.exports = {
    creatView: async function() {
        try {
            await realtimeTweets.insert({
                    "views": viewJson,
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log("Realtime view document is existed.");
        }
        try {
            await historicalTweets.insert({
                    "views": viewJson,
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log("History view document is existed.");
        }
        result.historical.token = await filterToken(historicalTweets);
        result.historical.total = await filterTotal(historicalTweets);
        // result.historical.dbInfo = await dbInfo(historicalTweets);
        result.realtime.token = await filterToken(realtimeTweets);
        result.realtime.total = await filterTotal(realtimeTweets);
        // result.realtime.dbInfo = await dbInfo(realtime);
        console.log("Couchdb init success.");
        refreshReduce();
    },
    getResult: () => {console.log("getResult"); return result;}
};