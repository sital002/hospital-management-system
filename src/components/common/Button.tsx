"use client";

import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "dark" | "outline";
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled = false,
  ...rest
}) => {
  const styles = {
    primary: `bg-light-orange-9 text-light-orange-2 border-light-orange-9 hover:bg-light-orange-10 `,
  };

  const rootClass = clsx(
    variant === "primary" && styles.primary,
    disabled && "bg-gray-600 border-none pointer-events-none",
    "my-1 w-full rounded-lg border border-black bg-black px-5 py-2 text-white transition duration-300 hover:bg-white hover:text-black",
    className,
  );
  return (
    <button className={twMerge(rootClass)} {...rest}>
      {children}
    </button>
  );
};
export default Button;
