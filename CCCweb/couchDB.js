const nano = require('nano')('http://172.26.38.46:5984');
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

const dbName = "realtime_tweets";
const designDocName = "filter";
const dbNano = nano.use(dbName);


let result = {
    "token": null,
    "total": null,
    "dbInfo": null
};

async function filterToken() {
    let newToken = await dbNano.get('_design/'+designDocName+'/_view/token');
    return newToken.rows[0].value;
}
async function filterTotal() {
    let newTotal = await dbNano.get('_design/'+designDocName+'/_view/total');
    return newTotal.rows[0].value;
}
async function dbInfo() {
    return await dbNano.info();
}
function refreshReduce() {
    Promise.all([filterToken(), filterTotal(), dbInfo()]).then(([newToken, newTotal, newDbInfo]) => {
        result.token = newToken;
        result.total = newTotal;
        result.dbInfo = newDbInfo;
        console.log("refresh");
    })
    setTimeout(refreshReduce, 5000);
}

// insert design documents
module.exports = {
    creatView: async function() {
        try {
            await dbNano.insert({
                    "views": viewJson,
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log(err);
        }
        result.token = await filterToken();
        result.total = await filterTotal();
        result.dbInfo = await dbInfo();
        console.log("Couchdb init success.");
        refreshReduce();
    },
    getResult: () => {console.log("getResult"); return result;}
};