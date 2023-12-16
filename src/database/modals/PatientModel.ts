import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const PateintSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [3, "Name cannot be less than 3 characters"],
    },
    dob: {
      type: String,
      required: [true, "Please provide a dob"],
    },
    contact: {
      type: String,
      required: [true, "Please provide a contact"],
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
  },
  { timestamps: true },
);

export const Patient =
  mongoose.models.Pateint || mongoose.model("Doctor", PateintSchema);

export type PateintType = InferSchemaType<typeof PateintSchema> & {
  _id: Types.ObjectId;
};
