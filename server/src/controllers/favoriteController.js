const db = require('../db');

const addFavorite = async (req, res) => {
  try {
    const { templateId } = req.params;
    const userId = req.user.id;

    const template = await db('templates').where({ id: templateId }).first();
    if (!template) {
      return res.status(404).json({ message: 'Template not found.' });
    }

    const existing = await db('favorites')
      .where({ user_id: userId, template_id: templateId })
      .first();

    if (existing) {
      await db('favorites').where({ id: existing.id }).del();
      return res.json({ message: 'Template removed from favorites.', favorited: false });
    }

    await db('favorites').insert({
      user_id: userId,
      template_id: templateId,
    });

    res.status(201).json({ message: 'Template added to favorites.', favorited: true });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', 'templates.id')
      .where('favorites.user_id', userId)
      .select(
        'templates.id',
        'templates.name',
        'templates.description',
        'templates.thumbnail_url',
        'templates.category',
        'favorites.created_at as favorited_at'
      )
      .orderBy('favorites.created_at', 'desc');

    res.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getFavoriteIds = async (req, res) => {
  try {
    const userId = req.user.id;
    const ids = await db('favorites')
      .where({ user_id: userId })
      .pluck('template_id');

    res.json(ids);
  } catch (error) {
    console.error('Get favorite ids error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { addFavorite, getFavorites, getFavoriteIds };
