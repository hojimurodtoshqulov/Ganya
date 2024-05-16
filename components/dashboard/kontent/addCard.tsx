'use client'
import React, { useState } from 'react'
import Modal from '../modal1'

const AddBanner = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div onClick={onClick} className=' rounded-2xl p-4 border-2 border-neutral-300 border-dashed gap-3 flex flex-col w-[252px] h-[124px] cursor-pointer'>
                <p className='text-neutral-500 text-base'>Banner</p>
                <p className='text-[22px] leading-[32px] text-neutral-500'>Добавить новый слайд</p>
            </div>
            <Modal onClick={onClick} isOpen={isOpen} />
        </>

    )
}

export default AddBanner