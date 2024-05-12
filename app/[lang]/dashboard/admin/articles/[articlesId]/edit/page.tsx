"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FormPostArticle from "../../post/formPost";
import FormEditArticle from "./FormEdit";

interface Props {
  params: any;
}

const Post: React.FC<Props> = ({ params }) => {
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <FormEditArticle articleId={params.articlesId} />
    </>
  );
};

export default Post;
