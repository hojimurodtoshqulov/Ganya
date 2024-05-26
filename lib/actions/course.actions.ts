"use server";

export const postAction = async (formData: FormData) => {
  console.log("start");
  console.log(formData);
  console.log(formData.get("image"));
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
  console.log(data);
  console.log("end");
};
