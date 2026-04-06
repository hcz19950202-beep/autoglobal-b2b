const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware — 生产环境允许 Vercel 前端域名
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,           // Vercel 正式域名
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // 允许无 origin 的请求（如移动端 App、curl）
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }
    callback(null, true); // 初期先全部放行，上线稳定后可收紧
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/upload', require('./routes/upload'));

// Health check for Railway
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AutoGlobal B2B API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
