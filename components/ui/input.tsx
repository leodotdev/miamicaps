import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "w-full",
        ghost: "border-none shadow-none",
        outline: "border-2",
      },
      inputSize: {
        default: "h-9 px-3 py-1",
        sm: "h-8 px-2 py-1 text-sm rounded-md",
        lg: "h-10 px-4 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}

function Input({
  className,
  type,
  variant,
  inputSize,
  ...props
}: InputProps & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
