import { Request, Response, NextFunction } from 'express';

export default (HttpHandler: any, method: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const httpHandler = new HttpHandler();
    await httpHandler[method](req, res, next);
  } catch (e: any) {
    next(e);
  }
};
