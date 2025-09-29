"use client";

import { Card } from "@/common/components/ui/card";
import { FileText, Loader2, Upload } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface AttachmentCardProps {
  requestConfig: any;
  onChange?: (files: UploadedFile[]) => void; // 🔑 notify parent when files change
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

function AttachmentCard({ requestConfig, onChange }: AttachmentCardProps) {
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(attachments);
    }
  }, [attachments]); // Remove onChange from dependencies to prevent infinite loop

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);

        const uploadResponse = await fetch(
          "https://crrsa-api.risertechservices.com/api/v1/storage/files/public",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }

        const uploadResult = await uploadResponse.json();

        // ✅ Only push file if successfully uploaded
        setAttachments((prev) => [
          ...prev,
          {
            id: uploadResult.id,
            name: file.name,
            size: file.size,
            type: file.type,
          },
        ]);
      } catch (error) {
        console.error(error);
        alert(`Failed to upload: ${file.name}`);
      } finally {
        setUploading(false);
      }
    }

    // reset so user can reselect same file
    event.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-w-full">
      <label
        htmlFor="file-upload"
        className="block text-base font-medium text-gray-700 mb-1">
        Attachment <span className="text-red-500">*</span>
      </label>
      <Card className="p-4 py-0 min-w-full pb-2 group">
        <h3 className="text-lg font-semibold text-[#073954] mb-4">
          {requestConfig?.label}
        </h3>

        <label
          className="space-y-4 cursor-pointer"
          htmlFor="file-upload">
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 group-hover:border-gray-400 transition-colors">
            <div className="text-center">
              <Image
                src="/icons/upload-file.svg"
                alt="Upload"
                width={20}
                height={20}
                className="size-12 mx-auto"
              />
              <p className="mt-2 text-sm text-gray-600">
                Upload supporting documents
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden pb-1"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <div className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#073954] hover:bg-[#073954]/90 cursor-pointer">
                {uploading ? "Uploading..." : "Choose Files"}
                {uploading ? (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 ml-2" />
                )}
              </div>
            </div>
          </div>
        </label>

        {/* Attachments List */}
        {attachments.length > 0 && (
          <div className="space-y-2 mt-2">
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Files:
            </h4>
            {attachments.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-xs text-gray-400">(ID: {item.id})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                  className="text-red-600 hover:text-red-800">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Requirements */}
        {requestConfig ? (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              {requestConfig?.requiredDoc.label}
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              {requestConfig?.requiredDoc.list.map(
                (label: any, index: number) => (
                  <li key={index}>• {label}</li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Allowed file types: pdf, doc, docx, jpg, png
          </p>
        )}
      </Card>
    </div>
  );
}

export default AttachmentCard;
