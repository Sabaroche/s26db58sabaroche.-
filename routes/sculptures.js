var express = require('express');
var sculpture_controller = require('../controllers/sculpture');
var router = express.Router();

/* GET sculptures */
router.get('/', sculpture_controller.sculpture_view_all_Page);
router.get('/detail', sculpture_controller.sculpture_view_one_page);
router.get('/create', sculpture_controller.sculpture_create_Page);
router.get('/update', sculpture_controller.sculpture_update_Page);
router.get('/delete', sculpture_controller.sculpture_delete_Page);
module.exports = router;

