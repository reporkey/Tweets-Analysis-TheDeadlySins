require("async");
const db = require("./couchDB");

module.exports = {
    indexPage: function (req, res) {
        let result = db.getResult();
        let token = result.token;
        let total = result.total;
        console.log(result)
        res.render('index', {
            totalTweets: total.count,
            ade_Pass: token.ade / total.ade,
            bri_Pass: token.bri / total.bri,
            mel_Pass: token.mel / total.mel,
            syd_Pass: token.syd / total.syd,
            can_Pass: token.can / total.can,
            per_Pass: token.per / total.per,
            hob_Pass: token.hob / total.hob,
            vic_Pass: token.vic / total.vic,
            nsw_Pass: token.nsw / total.nsw,
            qs_Pass: token.qs / total.qs,
            wa_Pass: token.wa / total.wa,
            tas_Pass: token.tas / total.tas,
            sa_Pass: token.sa / total.sa
        })
    }
};

