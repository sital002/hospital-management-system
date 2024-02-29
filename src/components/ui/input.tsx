import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
<<<<<<< HEAD
  ({ className, type='text', ...props }, ref) => {
    const[password,setPassword]=React.useState<boolean>(false)
    return (
      <div className="relative">
      <input
        type={password ? type:'text'}
        className={cn(
          "flex h-12 w-full  rounded-sm  my-2 border-2 border-gray-500 bg-transparent px-3 py-1 text-xl  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {type==='password' ? (!password ? <Eye onClick={()=>setPassword(!password)} className="absolute left-[95%] cursor-pointer top-3"/>:<EyeOff onClick={()=>setPassword(!password)} className="absolute left-[95%] cursor-pointer top-3" />) : null}
=======
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "my-2 flex h-12  w-full  rounded-sm border-2 border-gray-500 bg-transparent px-3 py-1 text-xl  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          showPassword ? (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            />
          )
        ) : null}
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
