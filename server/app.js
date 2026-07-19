const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.use('/api/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
