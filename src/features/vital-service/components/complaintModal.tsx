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
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

export default function ComplaintModal({
    open,
    handleCancel,
    groomName,
    brideName,
}: {
    open: boolean;
    handleCancel: Dispatch<SetStateAction<boolean>>;
    groomName?: string;
    brideName?: string;
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [complaintType, setComplaintType] = useState<string>("");

    const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setFiles(prevFiles => [...prevFiles, ...fileArray]);
        }
    };
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
                            {groomName ? `Ato ${groomName}` : 'Ato Abebe Kebede'}
                        </p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img
                            src={`https://randomuser.me/api/portraits/women/${Math.floor(
                                Math.random() * 100
                            )}.jpg`}
                            alt='Female'
                            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                        />
                        <p className='mt-2 font-medium text-sm text-gray-700'>
                            {brideName ? `W/ro ${brideName}` : 'W/ro Selamawit Tsegaye'}
                        </p>
                    </div>
                </div>

                {/* Form inputs */}
                <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium text-gray-700 mb-1'>
                                Full Name *
                            </label>
                            <Input
                                placeholder='Enter your full name'
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium text-gray-700 mb-1'>
                                Phone Number *
                            </label>
                            <Input
                                placeholder='Enter your phone number'
                                required
                            />
                        </div>
                    </div>
                    <div className='row-span-2 md:row-span-1'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium text-gray-700 mb-1'>
                                Complaint Reason *
                            </label>
                            <Textarea placeholder='Enter your complaint reason' />
                        </div>
                    </div>
                </form>

                {/* Attachment section */}
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold text-[#073954] mb-4'>
                        Supporting Documents
                    </h3>
                    <div className='border-2 border-dashed border-gray-300 rounded-lg p-4'>
                        <div className='text-center'>
                            <Upload className='mx-auto h-8 w-8 text-gray-400' />
                            <p className='mt-2 text-sm text-gray-600'>
                                Upload supporting documents
                            </p>
                            <input
                                type='file'
                                multiple
                                onChange={fileUploadHandler}
                                className='hidden'
                                id='file-upload'
                                accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
                            />
                            <label
                                htmlFor='file-upload'
                                className='mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#073954] hover:bg-[#073954]/90 cursor-pointer'
                            >
                                Choose Files
                            </label>
                        </div>
                    </div>
                    
                    {/* Display uploaded files */}
                    {files.length > 0 && (
                        <div className='mt-4'>
                            <h4 className='text-sm font-medium text-gray-700 mb-2'>
                                Uploaded Files:
                            </h4>
                            <div className='space-y-2'>
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-2 bg-gray-50 rounded-md'
                                    >
                                        <span className='text-sm text-gray-600'>
                                            {file.name}
                                        </span>
                                        <button
                                            type='button'
                                            onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                            className='text-red-500 hover:text-red-700 text-sm'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

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
