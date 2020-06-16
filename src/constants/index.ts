import { isDevelopment } from "../util";

export enum Routes {
  HOME = "Home",
  DETAILS = "Details"
}

export const emptyString = "No comment provided";
export const rupees = "₹";

// Set this accordingly in production
export const backendURL =
  process.env.backendURL || "http://192.168.1.104:3000/";
