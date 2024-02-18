import React from "react";
import PatientSignup from "./_components/PatientSignUp";

const patient = {
  name: "Patient",
  email: "patient@gmail.com",
  password: "patient123",
  cpassword: "patient123",
  phone: "1234567890",
  dob: "1998-01-01",
  gender: "male",
  admitType: "normal",
  patientType: "outpatient",
  address: "Kathmandu",
};
export default function page() {
  return (
    <div>
      <PatientSignup update={false} />
    </div>
  );
}
