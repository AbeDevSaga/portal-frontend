import { ServiceList } from "@/common/components/common/ServiceCard";
import React from "react";

function ServicePage() {
  return (
    <section
      className="w-full p-4 flex items-center justify-center min-h-screen bg-[#F1F4F5] bg-no-repeat font-barlow lg:px-[66px]"
      id="services"
    >
      <ServiceList gap="gap-[35px]" />
    </section>
  );
}

export default ServicePage;
