import { NextFunction, Request, Response } from "express";

export const parseJsonFromBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(req.body.data);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON format in request body' });
  }
};