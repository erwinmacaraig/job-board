import { Request, Response, NextFunction } from "express";

export const index = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "You have reached the index route",
  });
};
