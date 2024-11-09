import { Request, Response } from 'express';
import User from '../models/User';

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
};