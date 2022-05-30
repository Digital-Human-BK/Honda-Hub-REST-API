require('dotenv').config()

const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');

    mongoose.connection.on('error', (error) => {
      console.error('Database error');
      console.error(error);
    });
  } catch (err) {
    console.error('Error while connecting to database');
    process.exit(1);
  }
};