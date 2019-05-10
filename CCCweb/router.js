const controller = require("./controller");
var router = require('express').Router();

router.get('/dashboard', controller.dashBoardPage);
router.get('/', controller.introPage);
router.get('/intro', controller.introPage);

module.exports = router;