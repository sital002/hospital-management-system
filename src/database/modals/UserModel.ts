import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name is required`],
  },
  email: {
    type: String,
    required: [true, `Email is required`],
    unique: [true, `Email is already taken`],
  },
  phone: {
    type: Number,
    required: [true, `Phone number is required`],
    length: [10, `Phone number must be 10 characters`],
  },
  address: {
    type: String,
    required: [true, `Address is required`],
    maxLength: [200, `Address must be at most 200 characters`],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, `Gender is required`],
  },
  dob: {
    type: String,
    required: [true, `Date of birth is required`],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [8, `Password must be at least 8 characters`],
    maxLength: [64, `Password must be at most 64 characters`],
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "patient", "admin", "hospital", "doctor", "staff"],
    default: "admin",
  },
});

type TUser = InferSchemaType<typeof UserSchema>;
export interface UserType extends TUser {
  _id: string;
}

const User =
  mongoose.models.User<UserType> ||
  mongoose.model<UserType>("User", UserSchema);
export default User;
