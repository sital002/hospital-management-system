import React from "react";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PatientType } from "@/database/modals/PatientModel";
import { MainComponent } from "./_components/MainComponent";

async function getAllPatients() {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as PatientType[];
    return data;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
}
export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/auth/admin");

  const data = await getAllPatients();

  return <MainComponent data={data} />;
}
