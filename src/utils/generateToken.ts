import jwt from "jsonwebtoken";

interface generateTokenProps {
  _id: string;
  role: "labtechnician" | "patient" | "doctor" | "admin" | "staff";
}
export const generateToken = ({ _id, role }: generateTokenProps) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET!, {
    expiresIn: "60d",
  });
};
