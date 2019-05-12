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

