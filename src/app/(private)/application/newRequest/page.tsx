"use client";
import HeroSection from "@/common/components/common/HeroSection";
import { ServiceList } from "../../components/ServiceCard";
export default function Page() {
  return (
    <>
      <HeroSection
        title="New Request"
        description="This is the New Request Section"
        action={<></>}
      />
      <ServiceList />
    </>
  );
}
