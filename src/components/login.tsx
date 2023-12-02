"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "./common/Button";
import Input from "./common/Input";
import Label from "./common/Label";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "johndoe33@gmail.com",
      password: "Password@123",
    },
  });

  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Hello");
    console.log(data);
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
    </div>
  );
}
