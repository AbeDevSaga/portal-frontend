"use client";

import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FileText, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function FileViewer({ fileUrl }: { fileUrl: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced file type detection
  const isPdf =
    fileUrl.toLowerCase().includes(".pdf") ||
    fileUrl.toLowerCase().includes("application/pdf");
  const isImage =
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileUrl) ||
    fileUrl.toLowerCase().includes("image/");

  console.log("FileViewer Debug:", { fileUrl, isPdf, isImage });

  const handlePdfError = (error: any) => {
    console.error("PDF Viewer Error:", error);
    setError(
      "Failed to load PDF. The file might be corrupted or inaccessible."
    );
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Image Viewer Error for URL:", fileUrl);
    setError(
      "Failed to load image. The file might be corrupted or inaccessible."
    );
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  if (isPdf) {
    return (
      <div className="h-full max-h-[700px] w-full min-h-[500px]">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
            <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
            <p className="text-gray-600 mb-4 text-center max-w-md">{error}</p>
            <div className="space-y-2">
              <Button
                onClick={() => window.open(fileUrl, "_blank")}
                className="bg-blue-600 hover:bg-blue-700">
                Open in New Tab
              </Button>
              <p className="text-xs text-gray-500 text-center">
                URL: {fileUrl}
              </p>
            </div>
          </div>
        ) : (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={fileUrl}
              onDocumentLoad={(e) => {
                if (e.doc) {
                  setIsLoading(false);
                  setError(null);
                }
              }}
            />
          </Worker>
        )}
      </div>
    );
  }

  if (isImage) {
    return (
      <div className="flex justify-center h-full max-h-[750px] min-h-[500px]">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
            <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-xs text-gray-500">URL: {fileUrl}</p>
          </div>
        ) : (
          <img
            src={fileUrl}
            alt="Document"
            className="max-h-[750px] object-contain"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
    );
  }

  // For other file types (documents, etc.)
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg min-h-[500px]">
      <FileText className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-600 mb-4 text-center">
        Preview not available for this file type
      </p>
      <div className="space-y-2">
        <Button
          onClick={() => window.open(fileUrl, "_blank")}
          className="bg-blue-600 hover:bg-blue-700">
          Open in New Tab
        </Button>
        <p className="text-xs text-gray-500 text-center max-w-md break-all">
          File: {fileUrl}
        </p>
      </div>
    </div>
  );
}
