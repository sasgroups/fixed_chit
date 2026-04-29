const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin already exists');
    process.exit();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  await User.create({
    name: 'Admin',
    mobile: '9876543210',
    email: 'admin@chitfund.com',
    password: hashedPassword,
    role: 'admin'
  });
  console.log('Admin created – mobile: 9876543210, password: admin123');
  process.exit();
};

seedAdmin();