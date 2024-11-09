import app from './app';
import connectDB from './utils/db';

const PORT = process.env.PORT || 5000;

// データベースに接続してからサーバーを起動
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
