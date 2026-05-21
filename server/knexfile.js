require('dotenv').config();
const path = require('path');
const fs = require('fs');

const dbPath =
  process.env.DATABASE_PATH || path.join(__dirname, 'data', 'database.sqlite');
const dataDir = path.dirname(dbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const config = {
  client: 'sqlite3',
  connection: { filename: dbPath },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds'),
  },
};

module.exports = {
  development: config,
  production: config,
};
