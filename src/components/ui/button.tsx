import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-accent text-background hover:bg-accent/90": variant === "default",
            "border border-accent text-accent hover:bg-accent/10": variant === "outline",
            "hover:bg-accent/10": variant === "ghost",
            "underline-offset-4 hover:underline text-accent": variant === "link",
          },
          {
            "h-10 py-2 px-4": size === "default",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
