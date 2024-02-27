import { NextFunction, Request, Response } from "express";
import { MyUserRequest, NewAgencyRequestBody } from "../types/types.js";
import { Agency, agencyType } from "../models/agency-model.js";
import { PathLike, rm } from "fs";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/send-email.js";
import crypto from "crypto"



const generateAccessAndRefereshTokens = async (userId: Types.ObjectId) => {
  try {
    const user: any = await Agency.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating referesh and access token"
    );
  }
};

//////////////////////////////
//// Create New Agency Account
//////////////////////////////
export const newAgency = TryCatch(
  async (
    req: Request<{}, {}, NewAgencyRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

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

    const agency = await Agency.create({
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

    //confirmation
    const createdAgency = await Agency.findById(agency._id).select(
      "-password -refreshToken"
    );

    if (!createdAgency) {
      return next(
        new ErrorHandler("Something went wrong while registering the user", 500)
      );
    }

    //Send Email to newly created user

    const message = `Your account details are :- \n\nEmail: ${email} \n\nPassword ${password}`;

    try {
      await sendEmail({
        email: createdAgency.email,
        subject: `Travel App Your account details`,
        message,
      });

      // res.status(200).json({
      //   success: true,
      //   message: `Email sent to ${createdAgency.email} successfully`,
      // });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }

    return res.status(200).json({
      success: true,
      message: `New Agency account Successfully Created and Email sent to ${createdAgency.email} successfully`,
    });
  }
);

//////////////////////////////
//// Login
//////////////////////////////
export const loginAgency = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, password } = req.body;

    // console.log("Email :", email);
    // console.log("Password :", password);

    if (!email || !password) {
      return next(
        new ErrorHandler(
          "Both Email and password must be entered to login",
          400
        )
      );
    }

    const agency = await Agency.findOne({ email });
    if (!agency) {
      return next(
        new ErrorHandler("No account exists with the provided email", 404)
      );
    }

    const isPasswordValid = await agency.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      agency._id
    );

    const loggedInUser = await Agency.findById(agency._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User logged In Successfully",
        user: loggedInUser,
      });
  }
);

//////////////////////////////
//// Logout
//////////////////////////////
export const logoutAgency = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {
    await Agency.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out Successfully",
      });
  }
);

//////////////////////////////
//// Refresh Access Token
//////////////////////////////
export const refreshAccessToken = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return next(new ErrorHandler("unauthorized request", 401));
    }

    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET as jwt.Secret
      ) as any;

      const user = await Agency.findById(decodedToken?._id);

      if (!user) {
        return next(new ErrorHandler("Invalid refresh token", 401));
      }

      if (incomingRefreshToken !== user?.refreshToken) {
        return next(new ErrorHandler("Refresh token is expired or used", 401));
      }

      const options = {
        httpOnly: true,
        secure: true,
      };

      const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(user._id);

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          message: "Access token refreshed",
        });
    } catch (error: any) {
      return next(
        new ErrorHandler(error?.message || "Invalid refresh token", 401)
      );
    }
  }
);

//////////////////////////////
//// Change Current Password
//////////////////////////////
export const changeCurrentPassword = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    const user = await Agency.findById(req.user?._id);

    const isPasswordCorrect = await user?.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    // 'user' is possibly 'null'
    //Error = The left-hand side of an assignment expression may not be an optional property access.
    //To solve the error, use an if statement as a type guard before the assignment.
    //   We used the loose not equals operator (!=), to check if the variable is NOT equal to null and undefined.

    // This works because when compared loosely, null is equal to undefined.

    // index.ts

    // console.log(null == undefined); // 👉️ true

    // console.log(null === undefined); // 👉️ false

    //Error = The left-hand side of an assignment expression may not be an optional property access.
    //Using the logical AND (&&) operator to get around the error
    // ref: https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional

    if (user != undefined) {
      user.password = newPassword;
      await user.save({ validateBeforeSave: false });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);


//////////////////////////////
//// Forgot Password
//////////////////////////////
export const forgotPassword = TryCatch(async (req:Request, res:Response, next:NextFunction) => {
  const user = await Agency.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  // Get ResetPassword Token 
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // console.log(`req.protocol = ${req.protocol}`);
  // console.log(`req.get("host") = ${req.get("host")}`);
  

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password reset link`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email} successfully`,
    });


  } catch (error:any) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//////////////////////////////
// Reset Password
//////////////////////////////
export const resetPassword = TryCatch(async (req:Request, res:Response, next:NextFunction) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex"); 

  const user = await Agency.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match with confirm password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save({ validateBeforeSave: false });

  //logging in the user
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await Agency.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "User logged In Successfully",
      user: loggedInUser,
    });

});