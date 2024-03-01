"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TAppointment } from "@/database/modals/Appointment";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

export function Appointment({ appointment }: { appointment: TAppointment }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center border-2 my-1 border-black p-3 justify-between ">
      <h3 className="text-center grow">{appointment.medicalDepartment.toUpperCase()}</h3>
      <p className="text-center grow ">{formatDate(appointment.date)}</p>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="destructive">Cancel</Button>
        </DialogTrigger>
        <div className="w-32">
          <DialogContent>
            <div className="mt-3">
              <p className="text-center">
                Are you sure you want to cancel the appointment?
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button className="rounded-3xl px-8">Yes</Button>
                <Button
                  className="rounded-3xl px-8"
                  variant="destructive"
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
