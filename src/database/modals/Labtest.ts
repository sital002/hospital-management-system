import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const LabtestSchema = new Schema({
  patient: {
    type: Types.ObjectId,
    ref: "Patient",
    required: [true, "Please provide a patient"],
  },
  test: {
    type: Array,
    required: [true, "Please provide a test"],
  },
});

export const Labtest =
  mongoose.models.Labtest || mongoose.model("Labtest", LabtestSchema);

export type LabtestType = InferSchemaType<typeof LabtestSchema> & {
  _id: string | Types.ObjectId;
};
