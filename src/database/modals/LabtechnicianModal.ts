import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const LabtechnicianSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  // speciality: {
  //   type: String,
  //   required: [true, "Please provide a speciality"],
  // },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  dob: {
    type: String,
    required: [true, "Please provide a dob"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is required"],
  },
  // department: {
  //   type: String,
  //   required: [true, "Please provide a department"],
  // },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, `Password must be at least 8 characters`],
    maxLength: [64, `Password must be at most 64 characters`],
  },
});

export const Labtechnician =
  mongoose.models.Labtechnician ||
  mongoose.model<InferSchemaType<typeof LabtechnicianSchema>>(
    "Labtechnician",
    LabtechnicianSchema,
  );

export type LabtechnicianType = InferSchemaType<typeof LabtechnicianSchema> & {
  _id: string | Types.ObjectId;
};
