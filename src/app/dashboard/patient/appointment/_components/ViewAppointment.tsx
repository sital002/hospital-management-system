import { TAppointment } from "@/database/modals/Appointment";
import React from "react";
import { Appointment } from "./Appoinment";

type ViewAppointmentProps = {
  appointments: string;
};
export function ViewAppointment({ appointments }: ViewAppointmentProps) {
  const data: TAppointment[] = JSON.parse(appointments);
  // console.log(data)
  return (
    <div>
      <h1 className="my2 text-2xl font-bold">Appointments</h1>
      <div>
        {data.map((appointment) => {
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
