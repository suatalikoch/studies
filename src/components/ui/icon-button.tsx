"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function IconButton({ label, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      type="button"
      className={cn(
        "p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer",
        className
      )}
      {...props}
    />
  );
}
