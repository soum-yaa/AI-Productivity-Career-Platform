const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

function parseOrigins() {
  const raw = process.env.CLIENT_URL;
  if (!raw) return true;
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length ? list : true;
}

app.use(helmet());
app.use(
  cors({
    origin: parseOrigins(),
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'ai-productivity-api' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
