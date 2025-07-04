import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const PatientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
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
  status: {
    type: String,
    enum: ["pending", "approved", "active", "rejected"],
  },
  admitType: {
    type: String,
    enum: ["emergency", "normal"],
  },
  patientType: {
    type: String,
    enum: ["outpatient", "inpatient"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  addedBy: {
    type: String
  }
});

export const Patient =
  mongoose.models.Patient ||
  mongoose.model<InferSchemaType<typeof PatientSchema>>(
    "Patient",
    PatientSchema,
  );

export type PatientType = InferSchemaType<typeof PatientSchema> & {
  _id: string | Types.ObjectId;
};
