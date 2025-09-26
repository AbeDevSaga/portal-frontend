"use client";
import HeroSection from "@/common/components/common/HeroSection";
import { ServiceList } from "@/common/components/common/ServiceCard";
export default function Page() {
  return (
    <>
      <HeroSection
        title="New Request"
        description="This is the New Request Section"
        action={<></>}
      />
      <ServiceList gap="gap-[15px]" />
    </>
  );
}
