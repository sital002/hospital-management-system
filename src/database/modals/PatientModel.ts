import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const PatientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Please provide a gender"],
  },
  dob: {
    type: String,
    required: [true, "Please provide a dob"],
  },
  admitType: {
    type: String,
    enum: ["emergency", "normal"],
    required: [true, "Please provide a admit type"],
  },
  patientType: {
    type: String,
    enum: ["outpatient", "inpatient"],
    required: [true, "Please provide a  Patient type"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
});

export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export type PatientType = InferSchemaType<typeof PatientSchema> & {
  _id: string | Types.ObjectId;
};
