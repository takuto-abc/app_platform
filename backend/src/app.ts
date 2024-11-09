import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 認証ルートの登録
app.use('/api/auth', authRoutes);

// テスト用ルート
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

export default app;
