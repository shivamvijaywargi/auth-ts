import mongoose from 'mongoose';

// Set some mongoose defaults :p
mongoose.set('strictQuery', false); // Not sure what but recommended by Mongoose
mongoose.set('runValidators', true); // To run validators upon save

// Function to connect to mongodb
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!); // ! is for TS

    console.log(`Connected to DB: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
