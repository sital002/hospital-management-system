import mongoose from "mongoose";

interface connectionOptions {
  dbName: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

let isConnected: boolean = false;

export default async function connectToDB() {
  if (isConnected) {
    console.log("Connected to MongoDB");
    return;
  }
  if (!process.env.MONGO_DB_URI) {
    throw new Error("MONGODB_URI is missing from env");
  }
  try {
    mongoose
      .connect(process.env.MONGO_DB_URI, {
        dbName: "hospital-management-system",
        // useUnifiedTopology: true,
      } as connectionOptions)
      .then(() => {
        console.log("Connected to MongoDB");
        isConnected = true;
      });
  } catch (err) {
    console.log(err);
  }
}
