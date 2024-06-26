import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Please use your real name",
  }),
  number: z.string().min(10, {
    message: "Please use your real phone number ",
  }),
  text: z.string().min(10, {
    message: "Please use your question",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
