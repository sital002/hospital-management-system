"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

type FormInputs = {
  email: string;
  password: string;
};

type Role = "admin" | "staff" | "doctor" | "labtechnician";
export function SignInAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<Role>("admin");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      console.log(select, data);
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${select}/signin`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.success("Logged in successfully");
        router.push("/dashboard");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  watch();

  const handleTab = (value: Role) => {
    setSelect(value);
  };
  return (
    <div className="mx-2 w-full  overflow-y-hidden rounded-lg p-5 ">
      <div className="mx-auto mt-10 max-w-[800px] rounded-md border-2 p-4 shadow-md">
        <h2 className="my-3 text-center text-3xl">Login as Hospital</h2>

        <div className="my-5 flex items-center gap-1">
          <Button
            onClick={() => handleTab("admin")}
            size={"lg"}
            className={`grow  rounded-sm text-lg shadow-md hover:bg-purple-500 ${
              select === "admin" ? "bg-purple-500" : "bg-neutral-400"
            }`}
          >
            Admin
          </Button>
          <Button
            onClick={() => handleTab("staff")}
            size={"lg"}
            className={`grow rounded-sm  text-lg shadow-md hover:bg-purple-500 ${
              select === "staff" ? "bg-purple-500" : "bg-neutral-400"
            }`}
          >
            Staff
          </Button>
          <Button
            onClick={() => handleTab("doctor")}
            size={"lg"}
            className={`grow  rounded-sm text-lg shadow-md hover:bg-purple-500 ${
              select === "doctor" ? "bg-purple-500" : "bg-neutral-400"
            }`}
          >
            Doctor
          </Button>
          <Button
            onClick={() => handleTab("labtechnician")}
            size={"lg"}
            className={`grow  rounded-sm text-lg shadow-md hover:bg-purple-500 ${
              select === "labtechnician" ? "bg-purple-500" : "bg-neutral-400"
            }`}
          >
            Labtechnician
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label className="my-3">Email</Label>
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="johndoe@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="my-6">
            <Label className="my-3">Password</Label>
            <Input
              type={"password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 64,
                  message: "Password must be less than 64 characters long",
                },
              })}
              placeholder="Password@123"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button className="w-full text-xl" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
