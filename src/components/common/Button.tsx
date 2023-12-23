"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  variant?: "primary" | "secondary" | "dark" | "outline";
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled = false,
  href,
  ...rest
}) => {
  const styles = {
    primary: `bg-gray-600 text-white hover:bg-white hover:text-black`,
  };

  const rootClass = clsx(
    variant === "primary" && styles.primary,
    disabled && "bg-gray-600 border-none pointer-events-none",
    href && "bg-none text-gray-600 hover:text-gray-800",
    "my-1 w-full rounded-lg px-5 py-2 transition duration-300 ease-in-out border-2 border-gray-600 hover:border-gray-800",
    className,
  );
  return href ? (
    <Link href={href} className={twMerge(rootClass)}>
      {children}
    </Link>
  ) : (
    <button className={twMerge(rootClass)} {...rest}>
      {children}
    </button>
  );
};
export default Button;
