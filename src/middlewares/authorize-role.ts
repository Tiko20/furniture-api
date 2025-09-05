import { AuthenticatedUserModel } from "../models/authenticated-User.model";
import { UserRoleEnum } from "../models/user-role.enum";
import { Request, Response, NextFunction } from "express";

export const authorizeRole = (role: UserRoleEnum) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {role : reqRole} = req.user as AuthenticatedUserModel
    if (!req.user || reqRole !== role) {
      return res.status(403).json({ error: "Forbidden: insufficient rights" });
    }
    next();
  };
};
