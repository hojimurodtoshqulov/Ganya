import { boolean, string, z } from "zod";

export const emailSchema = z.string().email();
export const phoneSchema = z.string().regex(/^\+?\d{10,14}$/);
export const passwordSchema = z
  .string()
  .min(8, "Kamida 8 ta belgi kerak")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[~!@#№$%^?&*(){}[\]<>'`\-_+=|/:;,\.]).*$/,
    "Parol kamida bir katta, bir kichik lotin harf, raqam va belgi kerak",
  );

export const registerSchema = z
  .object({
    emailOrPhone: z.union([emailSchema, phoneSchema]),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    terms: z.string().refine((val) => val === "on", {
      message: "You must accept terms!",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

export const loginSchema = z.object({
  emailOrPhone: z.union([emailSchema, phoneSchema]),
  password: passwordSchema,
});

export const smsSchema = z.object({
  sessionId: z.string(),
  code: z.string().min(5),
});

export const validateInput = (input: string) => {
  try {
    emailSchema.parse(input);
    return "email";
  } catch (error) {
    try {
      phoneSchema.parse(input);
      return "phone";
    } catch (error) {
      return false;
    }
  }
};

export interface Articlsall {
  id: string;
  createdAt: string;
  updatedAt: string;
  titleUz: string;
  headlineUz: string;
  headlineRu: string;
  textUz: string;
  textRu: string;
  imageWeb: any;
  imageMobile: any;
  link: string;
  articleImage: any;
  isPublished: boolean;
}
