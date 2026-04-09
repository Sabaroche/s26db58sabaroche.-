var express = require('express');
var sculpture_controller = require('../controllers/sculpture');
var router = express.Router();

/* GET sculptures */
router.get('/', sculpture_controller.sculpture_view_all_Page);
module.exports = router;

