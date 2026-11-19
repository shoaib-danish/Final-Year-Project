import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) return res.sendStatus(401);

  try {
    res.locals.user = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    next();
  } catch {
    return res.sendStatus(401);
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user?.role !== "admin") {
    return res.sendStatus(403);
  }

  next();
};

export const authorizeRecruiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user?.role !== "recruiter") {
    return res.sendStatus(403);
  }

  next();
};
