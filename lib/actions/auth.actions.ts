"use server";

import {
  loginSchema,
  registerSchema,
  smsSchema,
  validateInput,
} from "@/types/auth";
import { cookies } from "next/headers";

export const registerAction = async (formData: FormData) => {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    emailOrPhone: formData.get("emailOrPhone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms"),
  });

  if (validatedFields.success) {
    try {
      const { emailOrPhone, password, name, surname } = validatedFields.data;
      const link = validateInput(emailOrPhone) as "email" | "phone";

      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/auth/${link}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [link]: emailOrPhone,
            password,
            name,
            surname,
          }),
        },
      );
      const json = await res.json();

      cookies().set({
        name: "sms",
        value: JSON.stringify({
          sessionId: json.sessionId,
          path: link,
          [link]: emailOrPhone,
          password,
        }),
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      return json;
    } catch (e) {
      console.log(e);
    }
  } else {
    return {
      errors: validatedFields.error.issues,
    };
  }
};

export const loginAction = async (formData: FormData) => {
  const validatedFields = loginSchema.safeParse({
    emailOrPhone: formData.get("emailOrPhone"),
    password: formData.get("password"),
  });
  if (validatedFields.success) {
    try {
      const { emailOrPhone, password } = validatedFields.data;
      const link = validateInput(emailOrPhone) as "email" | "phone";

      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/auth/${link}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [link]: emailOrPhone, password }),
        },
      );
      const json = await res.json();

      cookies().set({
        name: "accessToken",
        value: JSON.stringify(json.accessToken),
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      });
      cookies().set({
        name: "refreshToken",
        value: JSON.stringify(json.refreshToken),
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      });

      return {
        successMessage:
          cookies().get("coursePlanLink")?.value ?? "link-expired",
      };
    } catch (e) {
      console.log(e);
    }

    return {
      errorMessage: "Something went wrong!",
    };
  } else {
    return {
      errors: validatedFields.error.issues,
    };
  }
};

export const smsValidateAction = async (formData: FormData) => {
  const validatedFields = smsSchema.safeParse({
    sessionId: formData.get("sessionId"),
    code: formData.get("code"),
  });

  if (validatedFields.success) {
    try {
      const { data } = validatedFields;
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/auth/confirm-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();

      if (res.ok) {
        cookies().set({
          name: "accessToken",
          value: JSON.stringify(json.accessToken),
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        cookies().set({
          name: "refreshToken",
          value: JSON.stringify(json.refreshToken),
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });

        return {
          successMessage:
            cookies().get("coursePlanLink")?.value ?? "link-expired",
        };
      } else {
        return {
          errorMessage: json.message ?? "something went wrong",
        };
      }
    } catch (err) {
      console.log(err);
    }

    return {
      errorMessage: "Something went wrong!",
    };
  } else {
    return {
      errorMessage: validatedFields.error + "",
    };
  }
};
