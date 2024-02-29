import mongoose, { Schema } from "mongoose";
<<<<<<< HEAD

const AppointmentSchema = new Schema({
  patientId: {
=======
import { PatientType } from "./PatientModel";

const AppointmentSchema = new Schema({
  patient: {
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Please provide a patientId"],
  },
  contactPreference: {
    type: String,
    enum: ["email", "phone"],
    required: [true, "Please provide a contact preference"],
  },
  date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  medicalDepartment: {
    type: String,
    required: [true, "Please provide a medical department"],
  },
});

export type TAppointment = mongoose.InferSchemaType<
  typeof AppointmentSchema
> & {
<<<<<<< HEAD
=======
  patient: PatientType;
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
  _id: string | mongoose.Types.ObjectId;
};

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
