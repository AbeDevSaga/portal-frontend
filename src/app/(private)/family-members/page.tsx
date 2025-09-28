"use client";
import FamilyTree from "@/features/vital-service/components/FamilyTree";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleContinue = (value: string) => {
    console.log("value: ", value);
    router.push(`/family-members/${value}`);
  };
  return <FamilyTree onContinue={handleContinue} />;
};

export default page;
