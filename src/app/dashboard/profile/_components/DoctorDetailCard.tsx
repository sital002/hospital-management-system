import { DoctorType } from "@/database/modals/DoctorModel";
import React from "react";

type DoctorDetailCardProps = {
  doctor: DoctorType;
};
export function DoctorDetailCard({ doctor }: DoctorDetailCardProps) {
  return <div>DoctorDetailCard</div>;
}
