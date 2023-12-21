"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

type FormInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "doctor@gmail.com",
      password: "Password@123",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/signin`,
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
      console.log(err);
      toast.error(err.message);
    }
  };
  watch();
  return (
    <div className="mx-2 w-full max-w-[600px] rounded-lg bg-slate-50 p-5 ">
      <h1 className="my-4 text-center text-4xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Label className="my-3">Password</Label>
        <Input
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
          type="text"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Button type="submit">Submit</Button>
      </form>
      <p className="mt-3">
        Don&apos;t have an account?{" "}
        <span className="cursor-pointer font-medium underline underline-offset-4">
          <Link href="/signup">Signup here</Link>
        </span>
      </p>
    </div>
  );
}
