import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
