import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [3, "Name cannot be less than 3 characters"],
    },
    speciality: {
      type: String,
      required: [true, "Please provide a speciality"],
    },
    contact: {
      type: String,
      required: [true, "Please provide a contact"],
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    department: {
      type: String,
      required: [true, "Please provide a department"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, `Password must be at least 8 characters`],
      maxLength: [64, `Password must be at most 64 characters`],
    },
  },
  { timestamps: true },
);

export const Doctor =
  mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

export type DoctorType = InferSchemaType<typeof DoctorSchema> & {
  _id: Types.ObjectId;
};
