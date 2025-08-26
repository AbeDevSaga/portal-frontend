import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import { showError } from './CustomToast';

interface DynamicCsvHandlerProps {
  headers?: { csvHeader: string; backendHeader: string }[]; // Array of column headers for the CSV file
  onFileParsed: (data: Array<Record<string, string>>) => void; // Callback to handle parsed data
  fileName?: string; // Name of the file to be downloaded
}

const DynamicCsvHandler: React.FC<DynamicCsvHandlerProps> = ({ headers, onFileParsed, fileName = "data.csv" }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0); // State for tracking progress
  const [isUploading, setIsUploading] = useState<boolean>(false); // State for upload status
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null); // File info state

  // Generate CSV and trigger download
  const handleDownload = () => {
    // Extract csvHeader values from headers array
    const csvHeaders = headers?.map((header) => header.csvHeader);
    
    // Create CSV header string
    const csvContent = [csvHeaders?.join(',')].join('\n');
    
    // Create a Blob for the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  // Handle file upload and parsing
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("am in if file")
      setUploadedFile({ name: file.name, size: file.size });
      parseFile({ name: file.name, size: file.size });
    }
  };

  const parseFile = (theUploadedFile: any) => {
    console.log("am in parse file method", theUploadedFile)

    if (!theUploadedFile || !inputRef.current?.files?.[0]) return;

    const file = inputRef.current.files[0];
    setProgress(0);
    setIsUploading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (result: any) => {
        setIsUploading(false);

        if (result.errors && result.errors.length > 0) {
          console.error("Error parsing CSV:", result.errors);
          showError("Error parsing CSV");
        } else if (result.data) {
          const transformedData = result.data.map((row: Record<string, string>) => {
            // Transform data based on headers mapping
            const transformedRow: Record<string, string> = {};
            headers?.forEach(({ csvHeader, backendHeader }) => {
              if (row[csvHeader] !== undefined) {
                transformedRow[backendHeader] = row[csvHeader];
              }
            });
            return transformedRow;
          });
          console.log("parsed data", transformedData)

          onFileParsed(transformedData); // Send parsed data to parent
        }
      },
      error: (error) => {
        setIsUploading(false);
        console.error("Error during file parsing:", error);
        showError("Error during file parsing");
      },
    });
  };

  return (
    <div className="relative flex items-center w-full">
      <div className="w-full p-5 bg-white rounded-xl z-10">
        <div className="mt-2 space-y-3">
          {/* Button and Label on One Line */}
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-500 tracking-wide">CSV Upload</label>
            <button
              type="button"
              className="flex text-center justify-center bg-blue-500 text-gray-100 p-2 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              onClick={handleDownload}>
              Download CSV Template
            </button>
          </div>

          {/* File Upload */}
          <div className="grid grid-cols-1 space-y-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 p-5 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> your file here <br /> or{' '}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => inputRef.current?.click()}>
                      select a file
                    </button>
                    {' '}from your computer
                  </p>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>

          {/* Display File Info */}
          {uploadedFile && (
            <div className="text-sm text-gray-500">
              <p><strong>File Name:</strong> {uploadedFile.name}</p>
              <p><strong>File Size:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB</p>
              {/* <button
                type="button"
                className="mt-2 w-full flex justify-center bg-green-500 text-gray-100 p-2 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300"
                onClick={parseFile}>
                Parse File
              </button> */}
            </div>
          )}
          {isUploading && (
            <div className="relative w-full h-2 bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="text-sm text-gray-500 mt-1">{Math.round(progress)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicCsvHandler;
