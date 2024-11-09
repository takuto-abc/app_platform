// src/server.ts
import app from './app';
import connectDB from './utils/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('MongoDB に接続しました。');
  });
}).catch((error) => {
  console.error('データベース接続エラー:', error);
  process.exit(1);
});
