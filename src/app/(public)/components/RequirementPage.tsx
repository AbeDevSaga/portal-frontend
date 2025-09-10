"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import documentIcon from "@/public/images/pajamas_requirements.svg";
import documentIconPrimary from "@/public/images/pajamas_requirements_primary.svg";
import Image from "next/image";
import { serviceRequiremnts } from "../constants/serviceRequirements";

// Import or define the serviceRequirements data

function RequirementPage() {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedSubService, setSelectedSubService] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(0);

  const handleServiceSelect = (index: number) => {
    setSelectedService(index);
    setSelectedSubService(0);
    setSelectedRequest(0);
  };

  const handleSubServiceSelect = (index: number) => {
    setSelectedSubService(index);
    setSelectedRequest(0);
  };

  const handleRequestSelect = (index: number) => {
    setSelectedRequest(index);
  };

  return (
    <section
      className="w-full p-4 bg-[#D6DFE3] flex items-center justify-center min-h-screen bg-no-repeat font-barlow lg:px-[66px]"
      id="requirements"
    >
      <Card className="max-w-[1500px] bg-[#F7F7F7] w-full flex flex-col gap-3 rounded-[21px] py-10 px-5 lg:px-16 shadow-md">
        <div className="text-center mb-3 space-y-5">
          <p className="text-3xl lg:text-5xl font-semibold text-[#073954]">
            Requirements for Services
          </p>
          <p className="text-xl text-[#204D66]">
            These are the prerequisites for getting services from Civil <br />{" "}
            Registration and Residency Service Agency (CRRSA)
          </p>
        </div>

        {/* Service buttons */}
        <div className="w-full lg:px-[120px] w-full items-center">
          <div className="flex flex-wrap gap-5 justify-center">
            {serviceRequiremnts.map((service, index) => (
              <Button
                key={service.name}
                onClick={() => handleServiceSelect(index)}
                variant={selectedService === index ? "default" : "outline"}
                className={`flex-1 space-x-5 p-2 lg:py-4 lg:px-5 rounded-md shadow-md ${
                  selectedService === index ? "bg-[#073954]" : "text-[#073954]"
                }`}
              >
                <div>
                  <Image
                    src={
                      selectedService === index
                        ? documentIcon.src
                        : documentIconPrimary.src
                    }
                    height={30}
                    width={30}
                    alt={service.name}
                  />
                </div>
                <p>{service.name}</p>
              </Button>
            ))}
          </div>
        </div>

        {/* Sub-service tabs */}
        <div className="w-full flex items-center border-b border-b-2 border-b-gray-200 justify-center">
          <div className="flex gap-2 py-2 lg:py-5 overflow-x-auto">
            <div className="flex flex-nowrap gap-2">
              {serviceRequiremnts[selectedService].subService.map(
                (subService, index) => (
                  <div key={subService.name} className="flex-shrink-0">
                    <Button
                      variant="bare"
                      onClick={() => handleSubServiceSelect(index)}
                    >
                      <p
                        className={`capitalize lg:text-xl ${
                          selectedSubService === index
                            ? "text-[#073954]"
                            : "text-[#7D7D7D]"
                        }`}
                      >
                        {subService.name}
                      </p>
                    </Button>
                    {selectedSubService === index && (
                      <div className="w-full py-1 bg-[#073954] rounded-full mt-2"></div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Request details */}
        <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-y-10 gap-5 lg:gap-x-20 lg:px-10 pb-5 mt-5">
          {serviceRequiremnts[selectedService].subService[
            selectedSubService
          ].requests.map((request, index) => (
            <Card
              key={index}
              className="p-5 pb-8 shadow-lg flex shado-lg gap-3 rounded-lg"
            >
              <div>
                <Image
                  src={documentIconPrimary.src}
                  height={40}
                  width={40}
                  alt="document-icon"
                />
              </div>
              <div className="space-y-5">
                <p className="font-semibold text-[#073954]">{request.type}</p>
                <p className="text-sm text-[#7D7D7D]">{request.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}

export default RequirementPage;
