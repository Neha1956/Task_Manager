const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);

    console.log(`MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.log("Error to connect db", error);
    process.exit(1);
  }
};

module.exports = connectDB;