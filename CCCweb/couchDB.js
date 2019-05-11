const dbIP = process.argv[2];
const nano = require('nano')('http://'+dbIP+':5984');
const fs = require('fs');
require("async");
const utilities = require("./utilities");

const viewPath = "./designDoc.json";
let viewData = fs.readFileSync(viewPath);
let viewJson = JSON.parse(viewData);

const viewPath_melb = "./historical_melb_designDoc.json";
let viewData_melb = fs.readFileSync(viewPath_melb);
let viewJson_melb = JSON.parse(viewData_melb);

const viewPath_historical = "./historical_designDoc.json";
let viewData_historical = fs.readFileSync(viewPath_historical);
let viewJson_historical = JSON.parse(viewData_historical);

// List all existing databases
nano.db.list().then((body) => {
    console.log("_all_dbs:", body);
});

const designDocName = "filter";
const realtimeTweets = nano.use("realtime_tweets");
const historicalTweets = nano.use("historical_tweets_1415");
const historicalTweets_melb = nano.use("historical_tweets_melb");

let result = {
    "realtime": { "token": null, "total": null,},
    "historical": { "token": null, "total": null},
    "historical_melb" : {"token": null}
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
    Promise.all([
        filterToken(historicalTweets), filterTotal(historicalTweets),
        filterToken(realtimeTweets), filterTotal(realtimeTweets),
        filterToken(historicalTweets_melb)
    ]).then(([newHistoricalToken, newHistoricalTotal, newRealtimeToken, newRealtimeTotal,newHistoricalMelbToken]) => {
        result.historical_melb.token = newHistoricalMelbToken;
        //result.historical_melb.total = newHistoricalMelbTotal;
        result.historical.token = newHistoricalToken;
        result.historical.total = newHistoricalTotal;
        //result.historical.dbInfo = newHistoricalDbInfo;
        result.realtime.token = newRealtimeToken;
        result.realtime.total = newRealtimeTotal;
        //result.realtime.dbInfo = newRealtimeDbInfo;
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
                    "views": viewJson_historical,
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log("History view document is existed.");
        }
        try {
            await historicalTweets_melb.insert({
                    "views": viewJson_melb,
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log("History of Melb view document is existed.");
        }
        result.historical.token = await filterToken(historicalTweets);
        result.historical.total = await filterTotal(historicalTweets);
        //result.historical.dbInfo = await dbInfo(historicalTweets);
        result.realtime.token = await filterToken(realtimeTweets);
        result.realtime.total = await filterTotal(realtimeTweets);
        //result.realtime.dbInfo = await dbInfo(realtime);
        result.historical_melb.token = await filterToken(historicalTweets_melb);
        console.log("Couchdb init success.");
        refreshReduce();
    },
    getResult: () => {console.log("getResult"); return result;}
};