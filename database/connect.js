import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

export const connectToDatebase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB OK");
  } catch (error) {
    console.log("MongoDB Bad", error);
  }
};
