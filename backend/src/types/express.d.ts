import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      file?: {
        path: string;
        filename: string;
        mimetype: string;
        size: number;
      };
    }
  }
}
