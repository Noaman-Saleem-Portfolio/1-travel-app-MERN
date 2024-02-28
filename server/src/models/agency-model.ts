import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"
// import { config } from "dotenv";

//Configuring environment variables
// config({
//   path: "./.env",
// });

export interface agencyType extends Document {
  name: string;
  email: string;
  password: string;
  role:string;
  companyLogo: string | null;
  phoneNumber: number;
  address: string;
  city: string;
  country: string;
  websiteUrl: string | null;
  facebookProfile: string | null;
  isApproved: boolean;
  refreshToken: string | null;
  resetPasswordToken: string | null ;
  resetPasswordExpire: string | null ;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  getResetPasswordToken: () => string;
}

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Please enter Name"],
    },

    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },

    password: {
      type: String,
      required: [true, "Please enter Email"],
      minLength: [8, "Password should be greater than 8 characters"],
      // select: false,
    },
    role:{
      type:String,
      default:"agency"
    },
    companyLogo: {
      type: String,
      default: null,
    },

    phoneNumber: {
      type: Number,
      required: [true, "Please enter Phone Number"],
    },

    address: {
      type: String,
      required: [true, "Please enter Company Address"],
    },

    city: {
      type: String,
      required: [true, "Please enter City"],
    },

    country: {
      type: String,
      required: [true, "Please enter Country"],
    },

    websiteUrl: {
      type: String,
      default: null,
    },

    facebookProfile: {
      type: String,
      default: null,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//Middleware
//Encrypt password before saving data in DB
agencySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare Password
agencySchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//Generate Access Token
agencySchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//Generate Refresh Token
agencySchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Generating Password Reset Token
agencySchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const Agency = mongoose.model<agencyType>("Agency", agencySchema);
