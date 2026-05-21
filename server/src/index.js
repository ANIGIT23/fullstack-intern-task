require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const dbPath =
  process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'database.sqlite');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);
      if (allowed.includes(origin) || /\.up\.railway\.app$/.test(origin)) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Mini SaaS Template Store — Backend API',
    note: 'This is the API server only. Open the React app at http://localhost:5173',
    health: '/api/health',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      templates: ['GET /api/templates', 'GET /api/templates/:id'],
      favorites: ['GET /api/favorites', 'POST /api/favorites/:templateId'],
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mini SaaS Template Store API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
