const express = require('express');
const blogRoutes = require('./modules/blog/blog.routes');
const authRoutes = require('./modules/auth/auth.routes');
const authMiddleware = require('./modules/auth/auth.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

// 🔐 всё ниже требует JWT
app.use('/blog', authMiddleware, blogRoutes);

app.use(errorMiddleware);

module.exports = app;