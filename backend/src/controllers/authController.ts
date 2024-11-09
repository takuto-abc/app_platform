import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // ユーザーの重複チェック
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に使用されています。' });
    }

    const user = new User({ username, email, password });
    await user.save();

    // トークンの生成
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // ユーザーの検索
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'メールアドレスまたはパスワードが間違っています。' });
      }
  
      // パスワードの検証
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'メールアドレスまたはパスワードが間違っています。' });
      }
  
      // トークンの生成
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
      res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
      res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
  };
  
  export const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
  };