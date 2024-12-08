const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('Unhandled Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.MONGO_DB_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB).then(() => {
  console.log('DB connected successfully!');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
