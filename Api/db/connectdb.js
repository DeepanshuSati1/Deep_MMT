import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://deepanshusati238:Xuf4r1pqy7Ot4AX2@makemytrip.wnisfjk.mongodb.net/makemytrip?retryWrites=true&w=majority&appName=makemytrip");
    console.log(`> Successfully connnected to mongoDB`);
  } catch (error) {
    console.error(`> ERROR: ${error.message}`);
  }
};

export default connectDB;
