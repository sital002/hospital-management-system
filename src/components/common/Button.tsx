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
    "my-1 w-full rounded-lg border border-black bg-black px-5 py-2 text-white transition duration-300 hover:bg-white hover:text-black",
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
