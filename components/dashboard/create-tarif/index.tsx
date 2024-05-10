"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

interface Description {
    descriptionRu: string;
    descriptionUz: string;
}

interface Props { }

const schema = z.object({
    titleRu: z.string().min(1),
    titleUz: z.string().min(1),
    descriptions: z.array(z.object({
        descriptionRu: z.string(),
        descriptionUz: z.string(),
    })),
    price: z.string()
});


type Schema = z.infer<typeof schema>

const CreateTarif: React.FC<Props> = () => {
    const { register, handleSubmit, control } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: { descriptions: [{ descriptionRu: '', descriptionUz: '' }] } // Set initial values
    });


    const [descriptions, setDescriptions] = useState<Array<{
        descriptionRu: string;
        descriptionUz: string;
    }>>([{ descriptionRu: '', descriptionUz: '' }]);

    const onSubmit = (data: Schema) => {
        console.log(data);
    };

    const addDescription = () => {
        setDescriptions([...descriptions, { descriptionRu: '', descriptionUz: '' }]);
    };

    const removeDescription = (index: number) => {
        const newDescriptions = [...descriptions];
        newDescriptions.splice(index, 1);
        setDescriptions(newDescriptions);
    };



    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-6">
            <h1 className="text-[26px] text-main-300">Тарифы</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="main" className="text-sm py-2 px-5 font-normal">Добавить тариф</Button>
                </DialogTrigger>
                <DialogContent className="lg:p-10 md:p-8  overflow-auto h-[97vh]">
                    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-full">
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="titleRu">Заголовок</Label>
                            <Input type="text" id="titleRu" placeholder="Базовый пакет:" {...register('titleRu')} />
                        </div>
                        <div className="grid w-full  items-center gap-1.5">``
                            <Label htmlFor="titleUz">Sarlavha</Label>
                            <Input type="text" id="titleUz" placeholder="Asosiy paket:" {...register('titleUz')} />
                        </div>
                        {/* {descriptions.map((description, index) => (
                            <div key={index} className="space-y-3">
                                {index !== 0 && ( // Do not render remove button for the first description
                                    <button
                                        type="button"
                                        onClick={() => removeDescription(index)}
                                        className="text-red-500 text-sm font-normal hover:text-red-700 flex justify-end w-full"
                                    >
                                        Удалить преимущество
                                    </button>
                                )}
                                <div className="grid w-full  items-center gap-1.5">
                                    <Label htmlFor={`descriptionRu-${index}`}>Описание</Label>
                                    <Textarea
                                        placeholder="Преимущество 1"
                                        className="resize-none"
                                        {...register(`description[${index}].descriptionRu`)}
                                    />
                                </div>
                                <div className="grid w-full  items-center gap-1.5">

                                    <Label htmlFor={`descriptionUz-${index}`}>Tavsif</Label>
                                    <Textarea
                                        placeholder="Afzallik 1"
                                        className="resize-none"
                                        {...register(`description[${index}].descriptionUz`)}
                                    />
                                </div>

                            </div>
                        ))} */}

                        {descriptions.map((description: Description, index: number) => (
                            <div key={index} className="space-y-3">
                                {/* Description fields */}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDescription(index)}
                                        className="text-red-500 text-sm font-normal hover:text-red-700 flex justify-end w-full"
                                    >
                                        Удалить преимущество
                                    </button>
                                )}
                                <Controller
                                    name={`description[${index}].descriptionRu` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Преимущество 1"
                                            className="resize-none"
                                        />
                                    )}
                                />
                                <Controller
                                    name={`description[${index}].descriptionUz` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Afzallik 1"
                                            className="resize-none"
                                        />
                                    )}
                                />
                            </div>
                        ))}

                        <button type="button" onClick={addDescription} className="w-full flex items-center gap-2 justify-start text-main-300 text-base">
                            <span className="text-2xl">+</span>
                            Добавить преимущество
                        </button>
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="price">Сумма</Label>
                            <Input type="number" id="price" placeholder="Введите сумму тарифного плана" {...register('price')} />
                        </div>

                        <Button className="text-base font-normal" variant={'main'} type="submit">
                            Сохранить
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default CreateTarif;
