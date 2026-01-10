import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "default" && "bg-primary text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:opacity-90 shadow-lg hover:shadow-xl",
          variant === "outline" && "border border-border bg-transparent text-foreground hover:bg-muted",
          variant === "destructive" && "bg-accent text-accent-foreground hover:opacity-90",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-base",
          size === "lg" && "px-6 py-3 text-lg",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button }
