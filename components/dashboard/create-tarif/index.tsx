"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation'

interface Props {
    courseId?: string
    method?: 'POST' | 'PATCH'
}

const schema = z.object({
    title: z.string(),
    available_period: z.number().min(1),
    includeResources: z.boolean().default(false).optional(),
    includeSupport: z.boolean().default(false).optional(),
    price: z.number().min(1)
})

type Schema = z.infer<typeof schema>

const CreateTarif: React.FC<Props> = ({ courseId, method }) => {
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const [support, setSupport] = useState(false);
    const [resources, setResources] = useState(false);
    const router = useRouter();

    console.log(errors)

    const onSubmit = async (data: Schema) => {
        console.log(data);
        const api = process.env.NEXT_PUBLIC_BASE_URL + `/plans/${method === 'POST' ? 'create' : 'update'}/${courseId}`;

        console.log(api);
        try {
            const formData = new FormData();
            formData.append("available_period", data.available_period.toString());
            formData.append("includeResources", data?.includeResources);
            formData.append("includeSupport", data?.includeSupport);
            formData.append("price", data.price.toString());

            const req = await fetch(api, { method: method, body: formData });
            if (!req.ok) throw new Error('Plan yaratishda muommo yuzaga keldi');
            const res = await req.json();

            console.log(res, '<---Response from Plans create  endpoint');
            router.refresh();
            reset();
        } catch (error: any) {
            console.log(error.message)
        }
    };

    return (
        <>            <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-6">
            <h1 className="text-[26px] text-main-300">Тарифы</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="main" className="text-sm py-2 px-5 font-normal">
                        Добавить тариф
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-full">
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="price">Davomiyligi</Label>
                            <Input type="number" id="price" placeholder="Введите сумму тарифного плана" {...register('available_period', {
                                setValueAs: (value) => Number(value)
                            })} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="resourses" checked={resources} onCheckedChange={() => setResources(!resources)} {...register('includeResources', {
                                setValueAs: (value) => Boolean(value)
                            })} />
                            <label
                                htmlFor="resourses"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {'Qo\'shimacha resurslar bilan taminlanish'}
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="support" checked={support} onCheckedChange={() => setSupport(!support)} {...register('includeSupport', {
                                setValueAs: (value) => Boolean(value)
                            })} />
                            <label
                                htmlFor="support"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {'Kurs davomida yordam berish'}
                            </label>
                        </div>
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="price">Сумма</Label>
                            <Input
                                type="number"
                                id="price"
                                placeholder="Введите сумму тарифного плана"
                                {...register('price', {
                                    setValueAs: (value: any) => Number(value)
                                })}
                            />
                        </div>
                        <Button disabled={isSubmitting} className="text-base font-normal" variant={'main'} type="submit">
                            Сохранить
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        </>
    )
};

export default CreateTarif;