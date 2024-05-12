const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to database!`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Optionally exit process on failure to connect
  }
}

module.exports = connectDB;

