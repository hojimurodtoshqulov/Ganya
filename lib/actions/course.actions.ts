"use server";

export const postAction = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/courses/create`,
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    },
  );
  const data = await res.json();
};
