import { JWTPayload } from '../User';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
