import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    const c = await mongoose.connect(uri, {
      dbName: "Travel-App-MERN",
    });

    console.log(`DB Connected to ${c.connection.host}`);
  } catch (error) {
    console.log(`Oh nO Error`);
    console.log(error);
  }
};

export default connectDB;
