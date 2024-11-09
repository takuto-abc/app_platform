// src/types/express.d.ts
import { AuthRequest } from '../middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}
