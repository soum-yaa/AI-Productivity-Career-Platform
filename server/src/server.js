const { loadEnv } = require('./config/env');
const app = require('./app');
const { connectDatabase } = require('./config/db');

loadEnv();

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (!MONGO_URI) {
    // eslint-disable-next-line no-console
    console.error('Missing MONGO_URI in environment.');
    process.exit(1);
  }

  await connectDatabase(MONGO_URI);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});
