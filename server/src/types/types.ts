import { NextFunction, Request, Response } from "express";

//new agency req body
export interface NewAgencyRequestBody {
  name: string;
  email: string;
  password: string;
  // companyLogo: string | undefined;
  phoneNumber: number;
  address: string;
  city: string;
  country: string;
  websiteUrl: string | undefined;
  facebookProfile: string | undefined;
}

//new category req body
export interface NewCategoryRequestBody {
  categoryName: string,
}

//function ki type hamesha type sy define kro interface sy nhe
export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;


//custom Request type in express
export interface MyUserRequest extends Request {
  // Use `user?:` here instead of `user:`.
  user?: any;
}
