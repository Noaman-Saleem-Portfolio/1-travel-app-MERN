import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { Agency } from "../models/agency-model.js";
import { MyUserRequest } from "../types/types.js";

export const verifyJWT = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      //   console.log("incomming token");
      //   console.log(token);

      if (!token) {
        return next(new ErrorHandler("Unauthorized request", 401));
      }
      //useful info about type checking of JWT
      //https://stackoverflow.com/questions/68024844/how-can-get-the-property-from-result-of-jwt-verify-method-that-was-already-cre
      //if JWT do not verify this token then it will automatically throw an Error and execution will go directly to the catch block
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret | GetPublicKeyOrSecret
      ) as any;

      // console.log("decodedToken");
      // console.log(decodedToken);

      const user = await Agency.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return next(new ErrorHandler("Invalid Access Token", 401));
      }

      //This type error resolving info webpage
      //https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
      req.user = user;
      //   console.log("Req.user");
      //   console.log(req.user);

      next();
    } catch (error) {
      //   console.log("Error");
      //   console.log(error);

      return next(new ErrorHandler("Invalid access token", 401));
    }
  }
);
