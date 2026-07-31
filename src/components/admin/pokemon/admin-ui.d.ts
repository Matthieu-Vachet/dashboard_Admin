import type { ComponentType, ReactNode } from "react";

export const fieldClass: string;
export const panelClass: string;
export const buttonClass: string;
export const primaryButtonClass: string;
export const Panel: ComponentType<{
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children?: ReactNode;
}>;
