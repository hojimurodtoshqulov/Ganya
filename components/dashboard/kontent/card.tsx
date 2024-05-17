'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch";
import Modal from '../modal1';
interface banner {
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "imageWeb": string,
    "imageMobile": string,
    "link": string,
    "isPublished": boolean
}
const BannerCard = ({ banner, id, accessToken }: { banner: banner, id: number, accessToken: string | undefined }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [checked, setChecked] = useState(banner.isPublished)
    const onClick = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const updatedChecked = async () => {
            const formData = new FormData()
            formData.append('isPublished', String(checked));
            await fetch(`https://oar-api.onrender.com/api/v1/banners/update/${banner.id}`, {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
                }
            });
        }
        updatedChecked()
    }, [checked])


    return (
        <>
            <div className='rounded-2xl p-4 bg-white gap-3 flex flex-col w-[252px] h-[124px] relative'>
                <div className='flex justify-between'>
                    <p className='text-neutral-500 text-lg'>{id + 1}-Banner</p>
                    <Switch className=' bg-main-300' defaultChecked={banner.isPublished ? true : false} onCheckedChange={() => {
                        setChecked(prev => !prev)
                    }} />
                </div>

                <p className='text-[22px] leading-[32px] text-neutral-500'></p>
                <Button variant={"filled"} onClick={onClick} className='py-3 px-5'>Изменить</Button>
                {isOpen ?
                    (<Modal isOpen={isOpen} onClick={onClick} banner={banner} accessToken={accessToken} />) : ''}
            </div>
        </>

    )
}

export default BannerCard