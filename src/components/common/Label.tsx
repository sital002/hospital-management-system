"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
}
const Label: React.FC<LabelProps> = ({
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <label className={twMerge("font-medium", className)} {...rest}>
      {children}
    </label>
  );
};
export default Label;
