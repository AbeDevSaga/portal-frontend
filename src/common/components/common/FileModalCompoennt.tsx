"use client";

import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "@/common/components/ui/dialog";
import FileViewer from "./FileViewer";

export default function FileViewerModal({
    open,
    handleCancel,
    file,
}: {
    open: boolean;
    handleCancel: Dispatch<SetStateAction<boolean>>;
    file: string;
}) {
    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className='rounded-2xl max-w-3xl px-6 py-8'>
                <FileViewer fileUrl={file} />
            </DialogContent>
        </Dialog>
    );
}
