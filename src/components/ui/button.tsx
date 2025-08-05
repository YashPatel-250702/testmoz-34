import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function Button({ className, variant = "default", size = "default", children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-base",
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
