"use client";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import witnessImage from "@/public/images/groom.svg";
import { Eye, FileText, Image as ImageIcon, X } from "lucide-react";

const marriageDetailOptions = [
  {
    label: "Groom's",
    value: "husbandWetness",
  },
  {
    label: "Bride's",
    value: "wifeWetness",
  },
];

const WitnessInformation = ({ data }: { data: any }) => {
  const [displayData, setDisplayData] = useState("husbandWetness");
  const [previewFile, setPreviewFile] = useState<{url: string, fileName: string, fileType: string} | null>(null);

  // filter witnesses by prefix (husbandWetnessOne, wifeWetnessTwo, etc.)
  const witnesses = data
    ? Object.keys(data.witness)
        .filter((key) => key.startsWith(displayData))
        .map((key) => data.witness[key])
        .filter(Boolean)
    : [];

  // Parse and categorize attachments
  const getAttachments = () => {
    if (!data?.supporting_doc_url) return [];
    
    try {
      const attachments = typeof data.supporting_doc_url === 'string' 
        ? JSON.parse(data.supporting_doc_url) 
        : data.supporting_doc_url;
      
      return attachments || [];
    } catch (error) {
      console.error('Error parsing attachments:', error);
      return [];
    }
  };

  const categorizeAttachments = () => {
    const attachments = getAttachments();
    const categorized = {
      groom: [] as any[],
      bride: [] as any[]
    };

    attachments.forEach((attachment: any) => {
      const fileType = attachment.fileType || '';
      
      if (fileType.startsWith('GROOM_') && fileType.includes('WITNESS')) {
        categorized.groom.push(attachment);
      } else if (fileType.startsWith('BRIDE_') && fileType.includes('WITNESS')) {
        categorized.bride.push(attachment);
      }
    });

    return categorized;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return <ImageIcon className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  const handlePreview = (url: string, fileName: string, fileType: string) => {
    setPreviewFile({ url, fileName, fileType });
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const isImageFile = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '');
  };

  const AttachmentSection = ({ attachments, title }: { attachments: any[], title: string }) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {title} Attachments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {attachments.map((attachment, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 text-gray-600">
                  {getFileIcon(attachment.fileName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {attachment.fileName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {attachment.fileType?.replace(/_/g, ' ').toLowerCase()}
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    {attachment.status}
                  </p>
                </div>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => handlePreview(attachment.fileUrl, attachment.fileName, attachment.fileType)}
                   className="flex-shrink-0"
                 >
                   <Eye className="w-4 h-4" />
                 </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const ProfileCompnent = ({
    image,
    signiture,
    name,
  }: {
    name: string;
    signiture: string;
    image: string;
  }) => (
    <div className="px-5 flex flex-col items-center">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="rounded-sm overflow-clip mb-4"
      />
    </div>
  );

  const WitnessComponent = ({ data }: { data: any }) => {
    // pick English if available, fallback to Amharic
    const localized =
      data?.personalInfo?.localizedContent?.en ||
      data?.personalInfo?.localizedContent?.am;

    const fullName = localized
      ? `${localized.firstName || ""} ${localized.middleName || ""} ${
          localized.lastName || ""
        }`.trim()
      : "";

    return (
      <div className="flex flex-col lg:flex-row w-full py-2">
        <Card className="rounded-sm py-5 px-5 gap-2 w-full flex bg-white">
          <ProfileCompnent
            image={witnessImage.src}
            signiture={witnessImage.src}
            name="witness"
          />
          <div className="flex flex-col w-full">
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2 border-b border-gray-200 pb-3">
              <p className="text-base font-medium text-gray-700">Full Name</p>
              <p className="text-base font-bold text-gray-900 w-fit text-right">{fullName}</p>
            </div>
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2 border-b border-gray-200 pb-3">
              <p className="text-base font-medium text-gray-700">Date of Birth</p>
              <p className="text-base font-bold text-gray-900 w-fit text-right">
                {data?.personalInfo?.dateOfBirth || "—"}
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2 border-b border-gray-200 pb-3">
              <p className="text-base font-medium text-gray-700">Nationality</p>
              <p className="text-base font-bold text-gray-900 w-fit text-right">
                {data?.personalInfo?.nationality?.localizedContent?.en?.name || "—"}
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2">
              <p className="text-base font-medium text-gray-700">Current Living Address</p>
              <p className="text-base font-bold text-gray-900 w-fit text-right">
                {data?.currentAddress?.region?.localizedContent?.en?.name ||
                  "—"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const categorizedAttachments = categorizeAttachments();

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-4 mb-6">
        Witness Information
      </h2>
      <div className="pb-5">
        <div className="space-x-2 w-fit  py-2 px-5 rounded-lg flex flex-col md:flex-row ">
          {marriageDetailOptions.map((component) => (
            <Button
              onClick={() => setDisplayData(component.value)}
              key={component.value}
              variant="bare"
              className={`px-10 py-2.5 flex items-center gap-2 font-medium ${
                component.value === displayData 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {component.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full overflow-y-scroll max-h-[500px]">
        {witnesses.map((witness, index) => (
          <WitnessComponent data={witness} key={index} />
        ))}
      </div>

       {/* Attachments Section */}
       {displayData === "husbandWetness" && (
         <AttachmentSection 
           attachments={categorizedAttachments.groom} 
           title="Groom's Witness" 
         />
       )}
       {displayData === "wifeWetness" && (
         <AttachmentSection 
           attachments={categorizedAttachments.bride} 
           title="Bride's Witness" 
         />
       )}

       {/* Preview Modal */}
       {previewFile && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
             <div className="flex items-center justify-between p-4 border-b">
               <h3 className="text-lg font-semibold text-gray-900 truncate">
                 {previewFile.fileName}
               </h3>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={closePreview}
                 className="flex-shrink-0"
               >
                 <X className="w-4 h-4" />
               </Button>
             </div>
             <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
               {isImageFile(previewFile.fileName) ? (
                 <div className="flex justify-center">
                   <Image
                     src={previewFile.url}
                     alt={previewFile.fileName}
                     width={800}
                     height={600}
                     className="max-w-full h-auto rounded-lg shadow-lg"
                     unoptimized
                   />
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                   <FileText className="w-16 h-16 text-gray-400 mb-4" />
                   <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                   <Button
                     onClick={() => window.open(previewFile.url, '_blank')}
                     className="bg-blue-600 hover:bg-blue-700"
                   >
                     Open in New Tab
                   </Button>
                 </div>
               )}
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default WitnessInformation;
