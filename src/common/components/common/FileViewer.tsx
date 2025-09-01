"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function FileViewer({ fileUrl }: { fileUrl: string }) {
    const isPdf = fileUrl.toLowerCase().includes(".pdf");

    if (isPdf) {
        return (
            <div className='h-full max-h-[700px] w-full'>
                <Worker
                    // Hardcode your installed version of pdfjs-dist here
                    workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
                >
                    <Viewer fileUrl={fileUrl} />
                </Worker>
            </div>
        );
    }

    return (
        <div className='flex justify-center'>
            <img
                src={fileUrl}
                alt='Document'
                className='max-h-[750px] object-contain'
            />
        </div>
    );
}
