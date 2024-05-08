"use client"

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";

interface Props {
  params: Object
}

const schema = z.object({
  video: z.any(),
  titleRu: z.string().min(1),
  titleUz: z.string(),
  descriptionRu: z.string().min(1),
  descriptionUz: z.string()
})


type Schema = z.infer<typeof schema>

// Yangi dars qushish uchun page, form

const CreateLesson: FC<Props> = ({ params }): JSX.Element => {
  const { register, handleSubmit, watch } = useForm<Schema>({ resolver: zodResolver(schema) })


  const onSubmit = async (values: Schema) => {
    try {
      const formData = new FormData()
      if (values.video instanceof FileList) {
        formData.append("video", values.video[0], values.video[0].name);
      } else {
        formData.append("video", values.video);
      }

      formData.append("titleUz", values.titleUz);
      formData.append("titleRu", values.titleRu);
      formData.append("descriptionRu", values.descriptionRu);
      formData.append("descriptionUz", values.descriptionUz);

      const api = process.env.BASE_URL + '/lessons/create/6636a624f7ab459853ffd68e'
      console.log(api)
      const req = await fetch(api, {
        method: 'POST',
        body: formData
      })

      const res = await req.json()

      console.log(res)
      if (res.ok) {
        toast.success('Lesson successfully stored');
      } else {
        throw new Error('Something went')
      }

      console.log(req)

    } catch (error: any) {
      toast.error('Failed to upload lesson');
    }


  }

  const type = 'success'

  const notify = () => toast[type]('Test toaster');
  return <div className="space-y-5">

    <div>
      <button onClick={notify}>Make me a toast</button>
      <div>

        <Toaster position="top-right" toastOptions={{
          style: {
            borderTopRightRadius: '100%',
            borderTopLeftRadius: '100%',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: 'box-shadow: 0px 24px 36px 0px #DEDEDE7A'
          },
          success: {
            style: {
              borderTop: '3px solid green'
            }
          },
          error: {
            style: {
              borderTop: '3px solid red'
            }
          }
        }} />

      </div>

      <div className=" rounded-3xl  w-30 h-30 border-t-4 border-t-green-500 rounded-tl-full rounded-tr-full bg-white "></div>


    </div>
    <h1 className="text-3xl text-main-300 font-semibold">1-Dars: Tanishish {watch('titleUz')}</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="relative">
        <Label htmlFor="videoUpload" className=" relative rounded-2xl p-4 flex items-center justify-between gap-3 border-dashed border-2">
          <div className="flex items-center gap-3">
            <div className='rounded-xl w-[60px] h-[60px] flex items-center justify-center bg-white' >
              <CiCirclePlus className="w-7 h-7" />
            </div >
            <div className="flex flex-col text-csneutral-500 gap-1">
              <h1 className="text-[22px] font-medium">Video qo&apos;shish</h1>
              <p className="text-base font-normal">Videongizni torting yoki tanlang</p>
            </div>
          </div>
          <span className="rounded-[8px] py-3 px-5 bg-main-100 text-primary-300 text-sm font-normal">{watch('video') ? 'O\'zgartirish' : 'Tanlash'}</span>
        </Label>
        <Input id="videoUpload" type="file" accept="video/*" className="absolute inset-0 opacity-0" {...register('video')} />
      </div>

      <div className="rounded-2xl  bg-white flex flex-col gap-4 p-6">
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="titleRu">Заголовок</Label>
          <Input type="text" id="titleRu" placeholder="Базовый пакет:"  {...register('titleRu')} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="titleUz">Sarlavha</Label>
          <Input type="text" id="titleUz" placeholder="Asosiy paket:"  {...register('titleUz')} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor={`descriptionRu`}>Описание</Label>
          <Textarea
            placeholder="Преимущество 1"
            className="resize-none"
            {...register("descriptionRu")}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor={`descriptionUz`}>Tavsif</Label>
          <Textarea
            placeholder="Преимущество 1"
            className="resize-none"
            {...register("descriptionUz")}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className=" text-sm font-normal py3 px-5" variant={'main'}>Saqlash</Button>
        </div>
      </div>
    </form>

  </div >;
};

export default CreateLesson;
