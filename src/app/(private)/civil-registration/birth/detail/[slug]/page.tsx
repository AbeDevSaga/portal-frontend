"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { useSubmitResolutionFormMutation } from "@/features/application-service/api/applicationApi";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import { mockBirthResponse } from "@/common/utils/constants/mock/birth";
import CertificateDialog from "@/common/components/common/CertificateDialog";

export default function BirthDetailPage() {
  const [response, setResponse] = useState<any | null>(null);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    const fetchBirthDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `http://168.231.109.155:8081/api/v1/birth-registrations/vital-request?registrationFormNumber=${slug}`
        );
        setResponse(res.data); // ✅ use live data
        console.log("id: ", slug, " birth detail data: ", res);
      } catch (err: any) {
        console.error("API error:", err.message);
        setError(err.message || "Failed to fetch birth detail");
        setResponse(mockBirthResponse); // ✅ fallback to mock
      } finally {
        setLoading(false);
      }
    };

    fetchBirthDetail();
  }, [slug]);

  const requirementsandaction = [
    {
      title: "Correction",
      details: [
        "For Name Change, the person must provide court letter",
        "For age correction if the new age is two years less than or greater than current age, court letter must be provided",
        "For Spelling correction, user consent is enough",
      ],
      buttonTitle: "Request Correction",
      paymentAmount: 250,
    },
    {
      title: "Lost",
      details: [
        "Confirmation letter from woreda police department is required",
      ],
      buttonTitle: "Request Lost Certificate",
      paymentAmount: 250,
    },
    {
      title: "Damaged",
      details: ["The Damaged certificate must be presented"],
      buttonTitle: "Request Damaged Certificate",
      paymentAmount: 250,
    },
  ];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const [
    submitResolutionForm,
    { isLoading: resolutionIsLoading, isError: resolutionIsError },
  ] = useSubmitResolutionFormMutation();

  const handleValidateApplication = async (values: {
    status: string;
    reason: string;
  }) => {
    const payload = {
      registration_number: slug,
      reviewerId:
        values.status === "UNDER_REVIEW"
          ? "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          : null,
      approverId:
        values.status === "APPROVED"
          ? "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          : null,
      status: values.status,
      localisation: [
        {
          languageCode: "en",
          reviewDate: "2025-08-29T18:13:13.672Z",
          approvedDate: null,
          reviewerNotes: values.reason,
          approverNotes: null,
        },
      ],
    };
    try {
      await submitResolutionForm({ data: payload });
      if (!resolutionIsError) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRenderApplicationDecisionButtons = (status: string) => {
    if (status === "SUBMITTED")
      return (
        <>
          <Button
            onClick={() =>
              handleValidateApplication({ status: "UNDER_REVIEW", reason: "" })
            }
            disabled={resolutionIsLoading}
          >
            Validate Application
          </Button>
          <Button onClick={() => setOpenRejectModal(true)}>
            Reject Application
          </Button>
        </>
      );
    if (status === "UNDER_REVIEW")
      return (
        <>
          <Button
            onClick={() =>
              handleValidateApplication({ status: "APPROVED", reason: "" })
            }
            disabled={resolutionIsLoading}
          >
            Approve Application
          </Button>
          <Button
            onClick={() => setOpenRejectModal(true)}
            disabled={resolutionIsLoading}
          >
            Reject Application
          </Button>
        </>
      );
    if (status === "APPROVED")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 text-center py-2 rounded-sm bg-green-400/50">
            APPROVED
          </div>
          <Button
            className="bg-[#073954]"
            onClick={() => setShowCertificateDialog(true)}
            disabled={resolutionIsLoading}
          >
            View Certificate
          </Button>
        </div>
      );
    if (status === "REJECTED")
      return (
        <div className="px-5 text-center py-2 rounded-sm bg-red-400/50">
          REJECTED
        </div>
      );
    return null;
  };

  // Format date to display only the date part
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return dateString.split(" ")[0];
  };

  // Format time to display only the time part
  const formatTime = (dateString: string) => {
    if (!dateString) return "-";
    const timePart = dateString.split(" ")[1];
    return timePart ? timePart.substring(0, 5) : "-";
  };

  // Inline Info Sections (instead of external components)

  const renderBasicInfo = () => {
    const d = response.data;
    console.log("response data for basic info: ", d);

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Image Section - Fixed */}
          <div className="flex flex-col items-center w-full md:w-1/3 space-y-3">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-[#073954]/20 mx-auto bg-gray-100">
              <Image
                src={child_image || "/images/placeholder-child.png"} // fallback if needed
                alt={`${d.localizations[0].childFirstName || "Child"} profile`}
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="text-base text-[#073954] font-semibold text-center">
              {d.localizations[0].childFirstName || "MockFirst"}{" "}
              {d.localizations[0].childLastName || "MockLast"}
            </div>
          </div>

          {/* Information Section */}
          <div className="flex flex-col w-full md:w-2/3 gap-4">
            <span className="font-semibold text-[#073954] text-lg">
              Basic Information
            </span>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Application Number</p>
              <p className="text-sm font-semibold">
                {d.registration_form_number || "APP-123456"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold">
                {d.phone_number || "0912345678"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="text-sm font-semibold">
                {d.nationality_name || "Ethiopian"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicationInfo = () => {
    const d = response;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Application
        </span>
        <div className="flex flex-col md:flex-row w-full">
          <div className="gap-2 min-w-[250px] flex flex-col w-full">
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Service</p>
              <p className="text-sm font-semibold">Birth</p>
            </div>
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Service Type</p>
              <p className="text-sm font-semibold">New</p>
            </div>
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-sm font-semibold">
                {d.registrationStatus || "APPROVED"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBirthInfo = () => {
    const d = response;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Birth Information
        </span>
        <div className="gap-2 flex flex-col w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Country of Birth</p>
            <p className="text-sm font-semibold">
              {d.nationalityName || "Ethiopia"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Region</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "Addis Ababa"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Zone/Subcity</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.zone?.localizedContent?.en?.name ||
                "Arada"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Woreda</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.woreda?.localizedContent?.en?.name ||
                "Woreda 05"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Kebele</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.kebele || "Kebele 15"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Specific Location</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "Black Lion Hospital"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Birth Date</p>
            <p className="text-sm font-semibold">
              {formatDate(d.birthDate) || "2000-01-01"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLegalInfo = () => {
    const d = response;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Legal Information
        </span>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Digital Registration No</p>
            <p className="text-sm font-semibold">
              {d.registrationFormNumber || "REG-123456"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Passport No</p>
            <p className="text-sm font-semibold">A1234567</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">FIN</p>
            <p className="text-sm font-semibold">FIN-987654</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Driver's License No</p>
            <p className="text-sm font-semibold">DL-12345</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Marital Status</p>
            <p className="text-sm font-semibold">Single</p>
          </div>
        </div>
      </div>
    );
  };

  const renderEducationInfo = () => {
    const d = response;
    if (!d) return null;

    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Education and Work Information
        </span>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Education Level</p>
            <p className="text-sm font-semibold">Bachelor's Degree</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Occupation Type</p>
            <p className="text-sm font-semibold">Software Engineer</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Work Place Name</p>
            <p className="text-sm font-semibold">Tech Company</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAttachments = () => {
    const attachments = response?.personal_info?.attachments || [
      { fileName: "BirthCertificate.pdf", fileType: "PDF", url: "#" },
    ];

    return (
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-[#073954] text-lg">
          Attachments
        </span>
        {attachments.map((att: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="text-sm font-semibold">{att.fileName}</p>
              <p className="text-xs text-gray-500">{att.fileType}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(att.url, "_blank")}
            >
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderLineSeparator = () => {
    return (
      <div className="w-full py-4">
        <div className="w-full h-[2px] bg-gray-200 rounded"></div>
      </div>
    );
  };

  return (
    <>
      <HeroSection
        redirectTo="/application"
        title="Birth Detail"
        description="This is the birth detail for your lost birth certificate"
        action={
          <div className="space-y-5 space-x-5">
            {handleRenderApplicationDecisionButtons(
              response ? response.data?.registrationStatus : ""
            )}
          </div>
        }
      />

      <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
        {loading ? (
          <Card className="flex-1 flex items-center justify-center min-h-[350px] h-fit">
            <Loader className="animate-spin" />
          </Card>
        ) : null}

        {/* Information Section */}
        {response ? (
          <Card className="w-full md:w-2/3 flex flex-col p-6 shadow-md border rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3">{renderBasicInfo()}</div>
              <div className="md:col-span-2">{renderApplicationInfo()}</div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">{renderBirthInfo()}</div>
              <div className="flex-1">{renderLegalInfo()}</div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">{renderEducationInfo()}</div>
              <div className="flex-1">{renderAttachments()}</div>
            </div>
          </Card>
        ) : null}

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex-1 flex flex-col md:flex-row xl:flex-col gap-5">
          {/* {showTimer ? (
            <Card
              className="p-5"
              style={{
                background: "linear-gradient(to right, #2A7299, #0c4A6B)",
                color: "white",
              }}
            >
              <p className="font-semibold">Payment information</p>
              <div className="p-5 flex">
                <div className="w-full space-y-3 border-r">
                  <Button className="flex gap-2 items-center" variant="ghost">
                    <p>payment slip</p>
                    <Eye />
                  </Button>
                  <Button
                    className="flex gap-2 items-center bg-white/20"
                    onClick={() => handleCopy("1211112321321")}
                  >
                    <p>1211112321321</p>
                    {!copied ? <Copy size={20} /> : <Check size={20} />}
                  </Button>
                </div>
                <div className="min-w-fit flex flex-col items-center px-3">
                  <AlarmClock />
                  <p className="text-[#FEC95B] text-5xl font-semibold mt-2">
                    19:24:51
                  </p>
                  <p className="text-sm">Payment time countdown</p>
                </div>
              </div>
            </Card>
          ) : null} */}
          <Card className="p-5 space-y-2">
            <p className="text-lg font-semibold text-[#073954]">
              Requirements and Actions
            </p>
            <div className="space-y-3">
              {requirementsandaction.map((item) => (
                <Card
                  key={item.title}
                  className="p-3 space-y-3 bg-[#E8EEFD] border border-[#204D66] text-[#073954]"
                >
                  <p className="font-semibold mb-3">{item.title}</p>
                  {item.details.map((d) => (
                    <div key={d} className="flex gap-2 items-center">
                      <Check size={24} />
                      <p>{d}</p>
                    </div>
                  ))}
                  <div className="rounded-sm px-5 flex items-center gap-2 bg-[#FFF6E0] py-2">
                    <Info fill="orange" color="white" />
                    <p>You are asked to pay {item.paymentAmount} Br</p>
                  </div>
                  <Button className="bg-[#073954]">{item.buttonTitle}</Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Certificate Dialog */}
      <CertificateDialog
        open={showCertificateDialog}
        handleCancel={setShowCertificateDialog}
        certificateData={response?.data}
      />
    </>
  );
}
