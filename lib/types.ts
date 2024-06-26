import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Please use your real name",
  }),
  number: z.string().min(10, {
    message: "Please use your real phone number ",
  }),
  message: z.string().min(10, {
    message: "Please add a message",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
