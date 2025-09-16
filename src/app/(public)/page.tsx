"use client";
import React from "react";
import HomePage from "./components/HomePage";
import ServicePage from "./components/ServicePage";
import RequirementPage from "./components/RequirementPage";
import FAQ from "./components/FAQ";
import AnnouncementPage from "./components/fakeAnnouncement";

function page() {
  return (
    <div className="w-full">
      <HomePage />
      <ServicePage />
      <RequirementPage />
      <AnnouncementPage />
      <FAQ />
    </div>
  );
}

export default page;
