var express = require('express');
var sculpture_controller = require('../controllers/sculpture');
var router = express.Router();

function secured(req, res, next) {
    if (req.user) { return next(); }
    res.redirect('/login');
}

router.get('/', sculpture_controller.sculpture_view_all_Page);
router.get('/detail', sculpture_controller.sculpture_view_one_page);
router.get('/create', sculpture_controller.sculpture_create_Page);
router.get('/update', secured, sculpture_controller.sculpture_update_Page);
router.get('/delete', secured, sculpture_controller.sculpture_delete_Page);

module.exports = router;

