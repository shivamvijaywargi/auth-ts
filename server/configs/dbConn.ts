import mongoose from 'mongoose';

// Set some mongoose defaults :p
mongoose.set('strictQuery', false);
mongoose.set('runValidators', true);

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
