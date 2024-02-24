import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { Agency } from "../models/agency-model.js";

export const verifyJWT = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      //   console.log("incomming token");
      //   console.log(token);

      if (!token) {
        return next(new ErrorHandler("Unauthorized request", 401));
      }

      //if JWT do not verify this token then it will automatically throw an Error and execution will go directly to the catch block
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret | GetPublicKeyOrSecret
      );

      //   console.log("decodedToken");
      //   console.log(decodedToken);

      const user = await Agency.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return next(new ErrorHandler("Invalid Access Token", 401));
      }

      req.user = user;
      //   console.log("Req.user");
      //   console.log(req.user);

      next();
    } catch (error) {
      //   console.log("Error");
      //   console.log(error);

      return next(
        new ErrorHandler(error?.message || "Invalid access token", 401)
      );
    }
  }
);
