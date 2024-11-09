import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのURLを指定
  credentials: true, // 必要に応じて
}));
app.use(express.json());

// ルートの登録
app.use('/api/auth', authRoutes);

// テスト用ルート
app.get('/', (req, res) => {
  res.send('<h1>バックエンドサーバーが正常に稼働しています！</h1>');
});

export default app;
