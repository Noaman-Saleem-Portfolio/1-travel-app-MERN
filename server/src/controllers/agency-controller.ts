import { NextFunction, Request, Response } from "express";
import { NewAgencyRequestBody } from "../types/types.js";
import { Agency } from "../models/agency-model.js";
import { PathLike, rm } from "fs";
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
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let logo;
    // console.log("here");
    // console.log(files.companyLogo);
    //to check whether to delete file from upload folder
    // console.log(files.companyLogo !== undefined);
    // const logo = files.companyLogo[0];

    if (files.companyLogo) {
      logo = files.companyLogo[0];
    }

    // console.log(logo);

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !city ||
      !country
    ) {
      if (files.companyLogo) {
        // console.log("File is uploaded");

        rm(logo?.path as PathLike, () => {
          console.log("Deleted");
        });
      }

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
      companyLogo: logo?.path,
    });

    return res.status(200).json({
      success: true,
      message: "New Agency Successfully Created!!",
    });
  }
);
