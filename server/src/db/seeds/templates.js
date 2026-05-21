exports.seed = async function (knex) {
  await knex('favorites').del();
  await knex('templates').del();

  await knex('templates').insert([
    {
      name: 'Portfolio Website',
      description:
        'A sleek personal portfolio template to showcase your projects, skills, and experience.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      category: 'Portfolio',
    },
    {
      name: 'SaaS Dashboard',
      description:
        'Modern admin dashboard with analytics charts, user management, and subscription metrics.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'Dashboard',
    },
    {
      name: 'E-commerce Store',
      description:
        'Full-featured online store template with product listings, cart, and checkout flow.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'E-commerce',
    },
    {
      name: 'Restaurant Landing Page',
      description:
        'Appetizing landing page for restaurants with menu highlights and reservation CTA.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      category: 'Landing Page',
    },
    {
      name: 'Blog Template',
      description:
        'Clean and readable blog layout with featured posts, categories, and newsletter signup.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      category: 'Blog',
    },
    {
      name: 'Startup Landing',
      description:
        'Bold hero section landing page designed for SaaS startups and product launches.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      category: 'Landing Page',
    },
  ]);
};
