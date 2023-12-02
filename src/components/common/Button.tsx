"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        variant === "primary"
          ? "my-1 w-full rounded-lg border border-black bg-black px-5 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
          : "my-1 w-full rounded-lg bg-blue-500 px-5 py-2 text-white",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
