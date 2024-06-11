"use client";
import { deleteLink } from "@/lib/actions/user";
import { FC, useEffect } from "react";

const DelCookie: FC = () => {
  useEffect(() => {
    const f = async () => {
      await deleteLink();
    };
    f();
  }, []);
  return null;
};

export default DelCookie;
