import { NextFunction, Request, Response } from "express";
import { NewAgencyRequestBody } from "../types/types.js";
import { Agency } from "../models/agency-model.js";
import { rm } from "fs";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newAgency = TryCatch(
  async (
    req: Request<{}, {}, NewAgencyRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      city,
      country,
      websiteUrl,
      facebookProfile,
    } = req.body;

    const emailExists = await Agency.findOne({ email });

    if (emailExists) {
      return next(new ErrorHandler("The provided Email already exists", 400));
    }

    //not working in typescript types
    // const logo = req.files["companyLogo"];
    // console.log(logo);

    //How to use Multer with Type script url link
    // https://copyprogramming.com/howto/using-multer-diskstorage-with-typescript
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // console.log(files.companyLogo[0]);
    const logo = files.companyLogo[0];

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !city ||
      !country
    ) {
      rm(logo.path, () => {
        console.log("Deleted");
      });

      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    await Agency.create({
      name,
      email,
      password,
      phoneNumber,
      address,
      city,
      country,
      websiteUrl,
      facebookProfile,
      companyLogo: logo.path,
    });

    return res.status(200).json({
      success: true,
      message: "New Agency Successfully Created!!",
    });
  }
);
