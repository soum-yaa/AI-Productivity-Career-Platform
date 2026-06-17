const dotenv = require('dotenv');

dotenv.config();

const required = ['MONGO_URI', 'JWT_SECRET'];

function loadEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `[env] Missing: ${missing.join(', ')} — copy server/.env.example to server/.env`
    );
  }
}

module.exports = { loadEnv };
