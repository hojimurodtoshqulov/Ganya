import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getActionErrors = (
  fieldName: string,
  errors: ZodIssue[] | undefined,
) => {
  return errors
    ?.filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};
