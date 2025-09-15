"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import {
  useSubmitResolutionFormMutation,
} from "@/features/application-service/api/applicationApi";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import { mockBirthResponse } from "@/common/utils/constants/mock/birth";
import { BirthResponse } from "@/features/birth-service/types";

export default function BirthDetailPage() {
  const [response, setResponse] = useState<BirthResponse | null>(null);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
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
          `https://crvs-birth.itsidx.com/api/v1/birth-registrations/vital-request/${slug}`
        );
        setResponse(res.data); // ✅ use live data
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
    // {
    //   title: "Correction",
    //   details: [
    //     "For Name Change, the person must provide court letter",
    //     "For age correction if the new age is two years less than or greater than current age, court letter must be provided",
    //     "For Spelling correction, user consent is enough",
    //   ],
    //   buttonTitle: "Request Correction",
    //   paymentAmount: 250,
    // },
    {
      title: "Lost",
      details: [
        "Confirmation letter from woreda police department is required",
      ],
      buttonTitle: "Request Lost Certificate",
      paymentAmount: 250,
    },
    // {
    //   title: "Damaged",
    //   details: ["The Damaged certificate must be presented"],
    //   buttonTitle: "Request Damaged Certificate",
    //   paymentAmount: 250,
    // },
  ];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
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
            onClick={() => setShowTimer(true)}
            disabled={resolutionIsLoading}
          >
            Request Certificate
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

  // Inline Info Sections (instead of external components)
  const renderBasicInfo = () => {
    const d = response?.data;
    if (!d) return null;
    const child = d.localizations[0];

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          {/* Profile (left) */}
          <div className="flex flex-col space-y-2 items-center w-full md:w-1/3">
            <div className="w-full p-4 pl-[0] flex items-center">
              <div className="relative w-full max-w-[250px] aspect-square rounded-full overflow-hidden">
                <Image
                  src={child_image}
                  alt="Child Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <div className="w-full pr-4 flex flex-col items-center -justify-center">
              <div className="text-sm text-[#073954] font-medium">
                {child.childFirstName || "-"}
              </div>
              <div className="rounded-full py-1 px-4 bg-[#E8EEFD] text-[#073954] font-semibold text-sm">
                Child
              </div>
            </div>
          </div>

          {/* Info (right) */}
          <div className="flex flex-col max-w-[250px] md:w-2/3 gap-3">
            <span className="text-left font-semibold">Basic Information</span>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Child Name</p>
              <p className="text-sm font-semibold">
                {child.childFirstName || "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Birth Date</p>
              <p className="text-sm font-semibold">{child.birthDate || "-"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Birth Time</p>
              <p className="text-sm font-semibold">{child.birthTime || "-"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-sm font-semibold">{child.gender || "-"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-sm font-semibold">
                {child.childWeight || "-"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-sm font-semibold">
                {child.childHeight || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicationInfo = () => {
    const d = response?.data;
    if (!d) return null;
    const child = d.localizations[0];

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold">Application</span>
        <div className="flex flex-col md:flex-row w-full">
          <div className="gap-2 max-w-[250px] flex flex-col justify-center w-full">
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Service</p>
              <p className="text-sm text-right font-semibold w-fit">Birth</p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Service Type</p>
              <p className="text-sm text-right font-semibold w-fit">Lost</p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Appointment Date</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.issuedDate || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBirthInfo = () => {
    const d = response?.data;
    if (!d) return null;
    const child = d.localizations[0];

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold">Birth Information</span>
        <div className="gap-2 min-w-[250px] flex flex-col justify-center w-full">
          <div className="flex justify-between space-x-5 border-b pb-2">
            <p className="text-sm text-gray-600">Child Name</p>
            <p className="text-sm font-semibold">
              {child.childFirstName || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Birth Date</p>
            <p className="text-sm font-semibold">{child.birthDate || "-"}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Birth Time</p>
            <p className="text-sm font-semibold">{child.birthTime || "-"}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Gender</p>
            <p className="text-sm font-semibold">{child.gender || "-"}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Weight</p>
            <p className="text-sm font-semibold">{child.childWeight || "-"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Height</p>
            <p className="text-sm font-semibold">{child.childHeight || "-"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderLegalInfo = () => {
    const d = response?.data;
    if (!d) return null;
    return (
      <div className="space-y-3">
        <p>
          <b>Child Name:</b> {d.localizations[0].childFirstName}
        </p>
        <p>
          <b>Birth Date:</b> {d.localizations[0].birthDate}
        </p>
        <p>
          <b>Gender:</b> {d.localizations[0].gender}
        </p>
        <p>
          <b>Weight:</b> {d.localizations[0].childWeight}
        </p>
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

  const renderEducationInfo = () => {
    const d = response?.data;
    if (!d) return null;
    const child = d.localizations[0];

    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold">
          Education and Work Information
        </span>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full min-w-[250px] gap-2 flex flex-col justify-center">
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Education Level</p>
              <p className="text-sm text-right font-semibold w-fit">{"----"}</p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Occupation Type</p>
              <p className="text-sm text-right font-semibold w-fit">{"----"}</p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Work Place Home</p>
              <p className="text-sm text-right font-semibold w-fit">{"----"}</p>
            </div>
          </div>
        </div>
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
        {/* Inofrmation Section */}
        {response ? (
          <Card className="w-full w-2/3 flex flex-col p-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 h-fit">
              <div className="w-full md:col-span-3 h-fit">
                {renderBasicInfo()}
              </div>
              <div className="w-full md:col-span-2 h-fit">
                {renderApplicationInfo()}
              </div>
            </div>
            {renderLineSeparator()}
            <div className="flex flex-cols item-center justify-between gap-5 h-fit">
              <div className="h-fit">{renderBirthInfo()}</div>
              <div className="h-fit">{renderBirthInfo()}</div>
            </div>
            {renderLineSeparator()}
            <div className="flex flex-cols item-center justify-between gap-5 h-fit">
              <div className="h-fit">{renderEducationInfo()}</div>
              <div className="h-fit">{renderEducationInfo()}</div>
            </div>
          </Card>
        ) : null}

        {/* Sidebar */}
        <div className="w-1/3 flex-1 flex flex-col md:flex-row xl:flex-col gap-5">
          {showTimer ? (
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
          ) : null}

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
    </>
  );
}
