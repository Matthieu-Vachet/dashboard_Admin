import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const commonLabelClass = "type-overline text-muted";

type FieldProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, "children"> & {
  label: ReactNode;
  labelClassName?: string;
  children: ReactNode;
};

export const Field = forwardRef<HTMLLabelElement, FieldProps>(function Field(
  { label, labelClassName, className, children, ...props },
  ref,
) {
  return (
    <label ref={ref} className={cn("block", className)} {...props}>
      <span className={cn(commonLabelClass, labelClassName)}>{label}</span>
      {children}
    </label>
  );
});
