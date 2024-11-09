// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// カスタムリクエスト型
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// ユーザー登録コントローラー
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // 既存のユーザー確認
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: '既に存在するメールアドレスです。' });
      return;
    }

    // パスワードハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 新規ユーザー作成
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // JWTトークン生成
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('登録エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
};

// ログインコントローラー
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // ユーザー確認
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: '無効なメールアドレスまたはパスワードです。' });
      return;
    }

    // パスワード確認
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: '無効なメールアドレスまたはパスワードです。' });
      return;
    }

    // JWTトークン生成
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
};

// 現在のユーザー取得コントローラー
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'ユーザーが見つかりません。' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('ユーザー取得エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
};
