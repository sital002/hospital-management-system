import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

type OptionsType = {
  name: string;
  value: string;
};
interface SelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  className?: string;
  options: OptionsType[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, className = "", options, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={twMerge("my-2 w-full rounded-md px-3 py-2 text-xl", className)}
      {...rest}
    >
      {options.length > 0 &&
        options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
    </select>
  );
});

export default Select;
