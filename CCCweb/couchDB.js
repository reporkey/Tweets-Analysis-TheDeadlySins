const nano = require('nano')('http://admin:group3@172.26.38.76:5984');
const fs = require('fs');
require("async");

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

let token = null;
let total = null;

// insert design documents
module.exports = {
    creatView: async function() {
        try {
            await dbNano.insert({
                    "views": {
                        "token": {
                            "reduce": viewJson.token.reduce,
                            "map": viewJson.token.map
                        },
                        "total": {
                            "reduce": viewJson.total.reduce,
                            "map": viewJson.total.map
                        }
                    },
                    "language": "javascript"
                },
                '_design/filter'
            )
        } catch(err) {
            console.log(err);
        }
        await dbNano.get('_design/'+designDocName+'/_view/token').then((body) => {
            console.log("Token: ", body.rows[0].value);
        });
        await dbNano.get('_design/'+designDocName+'/_view/total').then((body) => {
            console.log("Total:", body.rows[0].value);
        });
        console.log("Couchdb init success.");
    },

    filterToken: async function () {
        let body = await dbNano.get('_design/'+designDocName+'/_view/token');
        return body.rows[0].value;
    },

    filterTotal: async function() {
        let body = await dbNano.get('_design/'+designDocName+'/_view/total');
        return body.rows[0].value;
    }
};