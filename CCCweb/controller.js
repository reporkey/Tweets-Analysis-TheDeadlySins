require("async");
const db = require("./couchDB");

module.exports = {
    dashBoardPage: function (req, res) {
        let result = db.getResult();
        console.log(result)
        let token_realtime = result.realtime.token;
        let total_realtime = result.realtime.total;
        let hisMelb = result.historical_melb.token;
        let token_historical = result.historical.token;
        let total_historical = result.historical.total;
        console.log(result);
        res.render('dashboard', {
            //historicalTotalTweets: result.historical.token.count,
            realtime_token_pass: token_realtime,
            realtime_total_pass: total_realtime,
            melb_historical_pass: hisMelb,
            historical_token_pass: result.historical.token,
            historical_totoal_pass: result.historical.total
            // ade_Pass: token_realtime.ade / total_realtime.ade,
            // bri_Pass: token_realtime.bri / total_realtime.bri,
            // mel_Pass: token_realtime.mel / total_realtime.mel,
            // syd_Pass: token_realtime.syd / total_realtime.syd,
            // can_Pass: token_realtime.can / total_realtime.can,
            // per_Pass: token_realtime.per / total_realtime.per,
            // hob_Pass: token_realtime.hob / total_realtime.hob,
            // vic_Pass: token_realtime.vic / total_realtime.vic,
            // nsw_Pass: token_realtime.nsw / total_realtime.nsw,
            // nt_Pass: token_realtime.nt / total_realtime.nt,
            // qs_Pass: token_realtime.qs / total_realtime.qs,
            // wa_Pass: token_realtime.wa / total_realtime.wa,
            // tas_Pass: token_realtime.tas / total_realtime.tas,
            // sa_Pass: token_realtime.sa / total_realtime.sa,
            // ade_total: total_realtime.ade,
            // bri_total: total_realtime.bri,
            // mel_total: total_realtime.mel,
            // syd_total: total_realtime.syd,
            // can_total: total_realtime.can,
            // per_total: total_realtime.per,
            // hob_total: total_realtime.hob,
            // vic_total: total_realtime.vic,
            // nsw_total: total_realtime.nsw,
            // qs_total: total_realtime.qs,
            // wa_total: total_realtime.wa,
            // tas_total: total_realtime.tas,
            // sa_total: total_realtime.sa,
            // nt_total: total_realtime.nt,
            // melb_14: hisMelb.year_14,
            // melb_15: hisMelb.year_15,
            // melb_16: hisMelb.year_16,
            // melb_17: hisMelb.year_17,
            // melb_18: hisMelb.year_18,
            // ade_Pass_his: token_realtime.ade / total_realtime.ade,
            // bri_Pass_his: token_realtime.bri / total_realtime.bri,
            // mel_Pass_his: token_realtime.mel / total_realtime.mel,
            // syd_Pass_his: token_realtime.syd / total_realtime.syd,
            // can_Pass_his: token_realtime.can / total_realtime.can,
            // per_Pass_his: token_realtime.per / total_realtime.per,
            // hob_Pass_his: token_realtime.hob / total_realtime.hob,
        })
    },
    introPage:function (req,res) {
        res.render('intro');
    }
};

