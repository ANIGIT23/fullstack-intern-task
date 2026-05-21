const express = require('express');
const {
  getAllTemplates,
  getTemplateById,
  getCategories,
} = require('../controllers/templateController');

const router = express.Router();

router.get('/', getAllTemplates);
router.get('/categories/list', getCategories);
router.get('/:id', getTemplateById);

module.exports = router;
