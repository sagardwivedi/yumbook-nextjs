import { cn } from "@/lib/utils";

export const getButtonStyles = (isActive: boolean, iconOnly = false) =>
  cn(
    "transition-colors duration-200 gap-4",
    iconOnly ? "size-12 p-0" : "w-full justify-start text-xl px-3 py-2",
    isActive
      ? "bg-secondary text-secondary-foreground"
      : "hover:bg-muted hover:text-muted-foreground"
  );
