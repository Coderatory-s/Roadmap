const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/nodeController');

// Define routes
router.get('/', nodeController.getAllNodes);
router.post('/', nodeController.createNode);
router.put('/:id', nodeController.updateNode);
router.delete('/:id', nodeController.deleteNode);

module.exports = router;
