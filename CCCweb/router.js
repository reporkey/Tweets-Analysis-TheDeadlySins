const controller = require("./controller");
var router = require('express').Router();

router.get('/', controller.indexPage);

module.exports = router;