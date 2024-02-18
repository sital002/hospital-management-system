import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const StaffSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide a Email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  shift: {
    type: String,
    enum: ["morning", "evening", "night"],
    required: [true, "Please provide a department"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Please provide a Gender"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, `Password must be at least 8 characters`],
    maxLength: [64, `Password must be at most 64 characters`],
  },
  dob: {
    type: String,
    required: [true, "Please provide a dob"],
  },
});
export type StaffType = InferSchemaType<typeof StaffSchema> & {
  _id: string | Types.ObjectId;
};

export const Staff =
  mongoose.models.Staff || mongoose.model<StaffType>("Staff", StaffSchema);
