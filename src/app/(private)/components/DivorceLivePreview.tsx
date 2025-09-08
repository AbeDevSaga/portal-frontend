import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../common/components/ui/accordion";

// Mock data for preview
const mockValues = {
  exHusbandResidentNumber: "1234567890",
  divorceDate: "2025-09-08",
  exHusbandFullName: "John Doe",
  exHusbandNationality: "Ethiopian",
  exHusbandDOB: "1980-01-01",
  exHusbandAddress: "Addis Ababa, Ethiopia",
  previousMarriageCertificateNo: "CERT-001",
  exWifeResidentNumber: "0987654321",
  exWifeFullName: "Jane Doe",
  exWifeNationality: "Ethiopian",
  exWifeDOB: "1982-02-02",
  exWifeAddress: "Addis Ababa, Ethiopia",
  previousMarriageCertificateNoWife: "CERT-002",
};

const DivorceLivePreview: React.FC = () => {
  return (
    <div className="flex min-w-[20%] md:min-w-[20%] lg:min-w-[30%] xl:min-w-[30%] h-screen border p-4 ml-4">
      <div className="w-full">
        <div className="space-y-3.5 w-full">
          <p className="border-b pb-2.5 max-w-fit pr-20 text-xl font-bold text-primary">
            Live Preview
          </p>
          <div
            className="rounded-lg shadow"
            style={{
              padding: "1.25rem",
              background: "linear-gradient(to right, #2A7299, #0c4A6B)",
              color: "white",
              borderRadius: "0.5rem",
            }}
          >
            <div className="border-b border-white/30 flex gap-2 pb-3 items-center">
              <span className="bg-white/20 rounded-full p-2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                </svg>
              </span>
              <p className="text-white font-medium">
                Divorce Registration Preview
              </p>
            </div>
            <div className="pt-3 px-5">
              <Accordion type="single" defaultValue="exHusband">
                <AccordionItem value="exHusband">
                  <AccordionTrigger className="text-white hover:text-white/80 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold">
                        1
                      </div>
                      <span className="text-lg font-semibold text-white">
                        Ex Husband Info
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Resident Number</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exHusbandResidentNumber || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Divorce Date</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.divorceDate || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Full Name</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exHusbandFullName || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Nationality</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exHusbandNationality || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Date of Birth</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exHusbandDOB || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Address</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exHusbandAddress || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Previous Marriage Certificate No.</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.previousMarriageCertificateNo || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="exWife">
                  <AccordionTrigger className="text-white hover:text-white/80 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold">
                        2
                      </div>
                      <span className="text-lg font-semibold text-white">
                        Ex Wife Info
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Resident Number</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exWifeResidentNumber || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Full Name</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exWifeFullName || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Nationality</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exWifeNationality || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Date of Birth</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exWifeDOB || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Address</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.exWifeAddress || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white/90 block mb-1">Previous Marriage Certificate No.</span>
                        <span className="text-sm text-white/80 block">
                          {mockValues.previousMarriageCertificateNoWife || (<span className="text-white/50 italic">Not filled</span>)}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivorceLivePreview;