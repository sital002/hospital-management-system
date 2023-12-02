"use client";
import React, { useState } from "react";

import Button from "./common/Button";
import Input from "./common/Input";
import Label from "./common/Label";

export default function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Password@123");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="rounded-lg bg-slate-50 p-5">
      <h1 className="my-4 text-center text-4xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <Label className="my-3">Email</Label>
        <Input
          placeholder="johndoe@gmail.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}
        <Label className="my-3">Password</Label>
        <Input
          placeholder="Password@123"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error.password && <p className="text-red-500"> {error.password}</p>}
        <Button>Submit</Button>
      </form>
    </div>
  );
}
