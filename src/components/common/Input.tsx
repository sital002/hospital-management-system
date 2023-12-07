"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "light";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant = "primary", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={twMerge(
        "my-2 w-full rounded-lg border border-slate-800 p-2 outline-none",
        className,
      )}
      {...rest}
    />
  );
});

export default Input;
