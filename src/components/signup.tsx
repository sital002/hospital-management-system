"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "./common/Button";
import Input from "./common/Input";
import Label from "./common/Label";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "johndoe33@gmail.com",
      password: "Password@123",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      console.log(json);
      if (json.redirect) {
        router.push(json.redirect);
      }
    } catch (err) {
      console.log(err);
    }
  };
  watch();
  return (
    <div className="mx-2 w-full max-w-[600px] rounded-lg bg-slate-50 p-5 ">
      <h1 className="my-4 text-center text-4xl">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label className="my-3">Name</Label>
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 64,
              message: "Name must be less than 64 characters long",
            },
          })}
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
        Already have an account?{" "}
        <span className="cursor-pointer font-medium underline underline-offset-4">
          <Link href="/sign-in">Signin here</Link>
        </span>
      </p>
    </div>
  );
}
