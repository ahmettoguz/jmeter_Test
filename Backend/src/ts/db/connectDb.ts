const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection is successfully established.");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;