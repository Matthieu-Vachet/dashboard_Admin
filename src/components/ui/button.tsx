import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-gradient-to-r from-brand via-[#6b8cff] to-brand-2 text-white shadow-[0_16px_42px_rgba(32,211,255,0.18)] hover:brightness-110",
  secondary:
    "border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]",
  ghost: "border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground",
  danger:
    "border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
  icon: "h-10 w-10 p-0",
};

export function Button({
  asChild,
  className,
  variant = "secondary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg border font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (asChild) {
    return (
      <Component className={buttonClassName} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={buttonClassName}
      {...props}
    >
      {icon}
      {children}
    </Component>
  );
}
