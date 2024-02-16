import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema({
  patientId: {
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
  _id: string | mongoose.Types.ObjectId;
};

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
