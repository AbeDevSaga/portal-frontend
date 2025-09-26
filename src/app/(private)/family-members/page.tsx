import FamilyTree from "@/features/vital-service/components/FamilyTree";
import React from "react";

const page = () => {
  const handleContinue = (value: string) => {
    console.log("value: ", value);
  };
  return <FamilyTree onContinue={handleContinue} />;
};

export default page;
