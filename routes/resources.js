
var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var sculpture_controller = require('../controllers/sculpture');

/// API ROUTE ///

// GET resources base.
router.get('/', api_controller.api);

/// SCULPTURE ROUTES ///

// POST request for creating a Sculpture.
router.post('/sculptures', sculpture_controller.sculpture_create_post);

// DELETE request to delete Sculpture.
router.delete('/sculptures/:id', sculpture_controller.sculpture_delete);

// PUT request to update Sculpture.
router.put('/sculptures/:id', sculpture_controller.sculpture_update_put);

// GET request for one Sculpture.
router.get('/sculptures/:id', sculpture_controller.sculpture_detail);

// GET request for list of all Sculpture items.
router.get('/sculptures', sculpture_controller.sculpture_list);

module.exports = router;
