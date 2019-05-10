require("async");
const db = require("./couchDB");

module.exports = {
    dashBoardPage: function (req, res) {
        let result = db.getResult();
        console.log(result)
        let token = result.realtime.token;
        let total = result.realtime.total;
        let hisMelb = result.historical_melb.token;
        console.log(result);
        res.render('dashboard', {
            historicalTotalTweets: result.historical.token.count,
            realtimeTotalTweets: total.count,
            ade_Pass: token.ade / total.ade,
            bri_Pass: token.bri / total.bri,
            mel_Pass: token.mel / total.mel,
            syd_Pass: token.syd / total.syd,
            can_Pass: token.can / total.can,
            per_Pass: token.per / total.per,
            hob_Pass: token.hob / total.hob,
            vic_Pass: token.vic / total.vic,
            nsw_Pass: token.nsw / total.nsw,
            nt_Pass: token.nt / total.nt,
            qs_Pass: token.qs / total.qs,
            wa_Pass: token.wa / total.wa,
            tas_Pass: token.tas / total.tas,
            sa_Pass: token.sa / total.sa,
            ade_total: total.ade,
            bri_total: total.bri,
            mel_total: total.mel,
            syd_total: total.syd,
            can_total: total.can,
            per_total: total.per,
            hob_total: total.hob,
            vic_total: total.vic,
            nsw_total: total.nsw,
            qs_total: total.qs,
            wa_total: total.wa,
            tas_total: total.tas,
            sa_total: total.sa,
            nt_total: total.nt,
            melb_14: hisMelb.year_14,
            melb_15: hisMelb.year_15,
            melb_16: hisMelb.year_16,
            melb_17: hisMelb.year_17,
            melb_18: hisMelb.year_18
        })
    },
    introPage:function (req,res) {
        res.render('intro');
    }
};

