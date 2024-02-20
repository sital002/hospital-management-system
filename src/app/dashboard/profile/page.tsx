import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";
import male from "@/assets/undraw_male_avatar_g98d.svg";
import female from "@/assets/undraw_female_avatar_efig.svg";
import Image from "next/image";
import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
export default async function page() {
  const user = await getUserDetails();
  if (!user) {
    redirect("/signin");
  }
  const { data } = user;
  let image = data.gender === "male" ? male : female;
  if (user.role === "patient") return <PatientDetailCard patient={data} />;
  return <div>Hello</div>;
}
