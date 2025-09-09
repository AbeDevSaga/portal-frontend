"use client";
import { useParams } from "next/navigation";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import {
  useGetVitalServiceEventQuery,
  useSubmitResolutionFormMutation,
} from "@/features/application-service/api/applicationApi";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import { mockBirthResponse } from "@/common/utils/constants/mock/birth";
import { BirthResponse } from "@/features/birth-service/types";
import { useGetBirthBySlugQuery } from "@/redux/api/birthApi";

export default function BirthDetail() {
  const [response, setResponse] = useState<BirthResponse | null>(null);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [displayData, setDisplayData] = useState("child");

  const params = useParams();
  const slug = params.slug;

  const { isLoading, isError, data } = useGetBirthBySlugQuery({ id: slug });

  // ✅ fallback logic
  useEffect(() => {
    if (!isError && !isLoading && data) {
      setResponse(data);
    } else if (!isLoading && isError) {
      setResponse(mockBirthResponse); // fallback mock
    }
  }, [data, isError, isLoading]);

  const {
    data: vitalData,
    isLoading: isVitalLoading,
    isError: isVitalError,
  } = useGetVitalServiceEventQuery({ id: slug });

  const requirementsandaction = [
    {
      title: "Lost",
      details: [
        "Confirmation letter from woreda police department is required",
      ],
      buttonTitle: "Attach Your File Here",
      paymentAmount: 250,
    },
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
      <div className="flex flex-col lg:flex-row w-full">
        <Card className="flex flex-col md:flex-row w-full">
          {/* Profile (left) */}
          <div className="p-5 flex flex-col items-center">
            <Image
              src={child_image}
              alt="Child Profile"
              width={150}
              height={150}
              className="rounded-sm overflow-clip mb-4"
            />
            <div className="rounded-full px-2 py-0.5 mx-auto text-sm text-[#073954]">
              {child.childFirstName}
            </div>
            <div className="rounded-full py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD] text-[#073954] font-semibold">
              Child
            </div>
          </div>

          {/* Info (right) */}
          <div className="rounded-md py-5 px-5 gap-2 min-w-fit flex flex-col justify-center w-full">
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Child Name</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.childFirstName || "-"}
              </p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Birth Date</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.birthDate || "-"}
              </p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Birth Time</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.birthTime || "-"}
              </p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Gender</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.gender || "-"}
              </p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Weight</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.childWeight || "-"}
              </p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Height</p>
              <p className="text-sm text-right font-semibold w-fit">
                {child.childHeight || "-"}
              </p>
            </div>
          </div>
        </Card>
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

  const renderEducationInfo = () => {
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

  return (
    <>
      <HeroSection
        redirectTo="/application"
        title="Birth Detail"
        description="This is the birth detail for your lost birth certificate"
        action={
          <div className="space-y-5 space-x-5">
            {handleRenderApplicationDecisionButtons(
              vitalData ? vitalData.data.status : ""
            )}
          </div>
        }
      />

      <div className="flex flex-wrap xl:flex-nowrap gap-10">
        {isLoading ? (
          <Card className="flex-1 flex items-center justify-center min-h-[350px] h-fit">
            <Loader className="animate-spin" />
          </Card>
        ) : null}

        {response ? (
          <div className="grid grid-cols-2 gap-5 w-full h-fit">
            <Card className="p-5 pb-10 space-y-5 w-full col-span-2 h-fit">
              {renderBasicInfo()}
            </Card>
          </div>
        ) : null}

        {/* Sidebar */}
        <div className="w-fit min-w-[350px] 2xl:min-w-[500px] flex-1 flex flex-col md:flex-row xl:flex-col gap-5">
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
