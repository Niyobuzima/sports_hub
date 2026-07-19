const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const registrationRoutes = require('./routes/registration.routes');
const categoryRoutes = require('./routes/category.routes');
const paymentRoutes = require('./routes/payment.routes');

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payments', paymentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
