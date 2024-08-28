const mongoose = require('mongoose')
const connection = async () => {
  const MONGO_URL = process.env.MONGODB_URL;
  console.log("MongoDB URL:", MONGO_URL); // Add this line to check the URL
  await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
}
module.exports = connection