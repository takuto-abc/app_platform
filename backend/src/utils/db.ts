import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB に接続しました。');
  } catch (error) {
    console.error('MongoDB の接続に失敗しました。', error);
    process.exit(1);
  }
};

export default connectDB;
