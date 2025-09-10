"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";

export default function ComplaintModal({
    open,
    handleCancel,
}: {
    open: boolean;
    handleCancel: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className='rounded-2xl max-w-3xl px-6 py-8'>
                <DialogHeader className='mb-4 pb-5 border-b'>
                    <DialogTitle className='text-2xl font-bold text-[#073954]'>
                        Complaint
                    </DialogTitle>
                    <DialogDescription className='text-gray-500'>
                        Fill the information for complaining about the marriage
                    </DialogDescription>
                </DialogHeader>

                {/* Profile section */}
                <div className='flex justify-center gap-12 items-center mb-6'>
                    <div className='flex flex-col items-center'>
                        <img
                            src={`https://randomuser.me/api/portraits/men/${Math.floor(
                                Math.random() * 200
                            )}.jpg`}
                            alt='Male'
                            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                        />
                        <p className='mt-2 font-medium text-sm text-gray-700'>
                            Ato Abebe Kebede
                        </p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img
                            src={`https://randomuser.me/api/portraits/men/${Math.floor(
                                Math.random() * 100
                            )}.jpg`}
                            alt='Female'
                            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                        />
                        <p className='mt-2 font-medium text-sm text-gray-700'>
                            W/ro Selamawit Tsegaye
                        </p>
                    </div>
                </div>

                {/* Form inputs */}
                <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <Input
                                placeholder='Enter your full name'
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Input
                                placeholder='Enter your phone number'
                                required
                            />
                        </div>
                    </div>
                    <div className='row-span-2 md:row-span-1'>
                        <Textarea placeholder='Enter your complaint reason' />
                    </div>
                </form>

                {/* Submit button */}
                <div className='flex justify-end mt-6'>
                    <Button type='submit' className='px-6 py-2 bg-[#073954]'>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
