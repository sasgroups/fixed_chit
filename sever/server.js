const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// CORS Configuration - MUST BE BEFORE ROUTES
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://fixedchiti.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://fixed-chit.onrender.com'
    ];
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parser
app.use(express.json());

// Log MONGO_URI (remove this in production)
console.log('MONGO_URI:', process.env.MONGO_URI);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const schemeRoutes = require('./routes/schemes');
const schemeMemberRoutes = require('./routes/schememembers');
const installmentRoutes = require('./routes/installments');
const reportRoutes = require('./routes/reports');
const memberRoutes = require('./routes/member');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/schememembers', schemeMemberRoutes);
app.use('/api/installments', installmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/member', memberRoutes);

// Basic route
app.get('/', (req, res) => res.json({ message: 'Chit Fund API' }));

// Health check endpoint (useful for Render)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
