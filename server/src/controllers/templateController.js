const db = require('../db');

const getAllTemplates = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = db('templates').select('*');

    if (search) {
      query = query.where(function () {
        this.where('name', 'like', `%${search}%`).orWhere(
          'description',
          'like',
          `%${search}%`
        );
      });
    }

    if (category && category !== 'All') {
      query = query.where('category', category);
    }

    const templates = await query.orderBy('id', 'asc');
    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await db('templates').where({ id }).first();

    if (!template) {
      return res.status(404).json({ message: 'Template not found.' });
    }

    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await db('templates').distinct('category').pluck('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getAllTemplates, getTemplateById, getCategories };
