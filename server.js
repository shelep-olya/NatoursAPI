const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.MONGO_DB_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB).then(() => {
  console.log('DB connected successfully!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
