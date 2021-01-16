const mongoose = require("mongoose");

const connectDd = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6godl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    );
    console.log(`MongoDB connected to : ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDd;
