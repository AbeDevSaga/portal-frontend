// path: birth/[request]/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import BirthCorrection from "@/features/vital-service/components/BirthCorrection";
import BirthDetail from "@/features/vital-service/components/BirthDetail";
import { getResidentByFormNumber } from "@/common/utils/constants/mock/resident-mock";

type RequestType = "lost" | "damaged" | "correction" | "print";

function RequestDeatil({
  params,
}: {
  params: Promise<{ id: string; request: string }>;
}) {
  const { id, request } = React.use(params);

  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate the request
  const validRequestType = ["lost", "damaged", "correction", "print"].includes(
    request
  )
    ? (request as RequestType)
    : undefined;
  if (!validRequestType) {
    notFound(); // return 404 page if undefined
  }

  useEffect(() => {
    const result = getResidentByFormNumber(id);
    console.log("result: ", result)
    setUserData(result);
  }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(
  //         `http://168.231.109.155:8081/api/v1/birth-registrations/vital-request?registrationFormNumber=${id}`
  //       );
  //       const data = await res.json();

  //       if (data.success && data.data) {
  //         setUserData(data.data);
  //       } else {
  //         setError(
  //           "No record found. Please check your information and try again."
  //         );
  //       }
  //     } catch (err) {
  //       setError("An error occurred. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  console.log("user data: ", userData);

  if (validRequestType === "correction") {
    return <BirthCorrection data={userData} loading={loading} error={error} />;
  }
  return (
    <BirthDetail
      data={userData}
      loading={loading}
      error={error}
      requestType={validRequestType}
    />
  );
}

export default RequestDeatil;
