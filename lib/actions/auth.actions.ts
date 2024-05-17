"use server";

import {
  loginSchema,
  registerSchema,
  smsSchema,
  validateInput,
} from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerAction = async (formData: FormData) => {
  const validatedFields = registerSchema.safeParse({
    emailOrPhone: formData.get("emailOrPhone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms"),
  });

  if (validatedFields.success) {
    console.log(validatedFields.data);
    try {
      const { emailOrPhone, password } = validatedFields.data;
      const link = validateInput(emailOrPhone) as "email" | "phone";
      console.log("start", link);
      const res = await fetch(
        `https://oar-api.onrender.com/api/v1/auth/${link}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [link]: emailOrPhone, password }),
        },
      );
      const json = await res.json();
      console.log("end", json);
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
      console.log("start", link);
      const res = await fetch(
        `https://oar-api.onrender.com/api/v1/auth/${link}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [link]: emailOrPhone, password }),
        },
      );
      const json = await res.json();
      // console.log(json, "<--------------------------- bu login json");
      cookies().set({
        name: "accessToken",
        value: JSON.stringify(json.accessToken),
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      cookies().set({
        name: "refreshToken",
        value: JSON.stringify(json.refreshToken),
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      });

      return {
        successMessage: "Successfuly posted",
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
        `https://oar-api.onrender.com/api/v1/auth/confirm-code`,
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
          secure: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        cookies().set({
          name: "refreshToken",
          value: JSON.stringify(json.refreshToken),
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 6 * 1000,
        });

        // cookies().delete("sms")
        return {
          successMessage: "Code successfuly posted",
        };
      } else {
        return {
          errorMessage: json.message,
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
