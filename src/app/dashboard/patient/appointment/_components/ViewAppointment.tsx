import { TAppointment } from "@/database/modals/Appointment";
import React from "react";
import { Appointment } from "./Appoinment";

type ViewAppointmentProps = {
  appointments: TAppointment[];
};
export function ViewAppointment({ appointments }: ViewAppointmentProps) {
  return (
    <div>
      <h1>Appointments</h1>
      <div>
        {appointments.map((appointment) => {
          return (
            <Appointment
              appointment={appointment}
              key={appointment._id.toString()}
            />
          );
        })}
      </div>
    </div>
  );
}
