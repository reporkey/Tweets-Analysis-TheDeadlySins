// COMP900024 Cluster and Cloud Computing
// Assignment 2
// Author: Group 3
// Team Member :
//     JINGLING ZHOU 888137
//     XIAOYUE MA 878899
//     CHENGENG LIU 813174
//     YUNXUE CHEN 905136
//     ZICHUN ZHU 784145

require("async");
const db = require("./couchDB");

module.exports = {
    dashBoardPage: function (req, res) {
        let result = db.getResult();
        console.log(result)
        let token_realtime = result.realtime.token;
        let total_realtime = result.realtime.total;
        console.log(result);
        res.render('dashboard', {
            //historicalTotalTweets: result.historical.token.count,
            realtime_token_pass: token_realtime,
            realtime_total_pass: total_realtime,
            melb_historical_token: result.historical_melb.token,
            melb_historical_total: result.historical_melb.total,
            historical_token_pass: result.historical.token,
            historical_totoal_pass: result.historical.total
        })
    },
    introPage:function (req,res) {
        res.render('intro');
    }
};

