"use client";
import { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import documentIcon from "@/public/images/pajamas_requirements.svg";
import documentIconPrimary from "@/public/images/pajamas_requirements_primary.svg";
import Image from "next/image";

type optionsType =
    | "birth"
    | "marriage"
    | "divorce"
    | "death"
    | "adpotion"
    | "legitimation of father"
    | "recognition of child";

const RequirementForService = () => {
    const [requirementsTab, setRequirementsTab] =
        useState<optionsType>("birth");
    const [documentDisplay, setDocumentDisplay] =
        useState("civil-registration");

    const options: optionsType[] = [
        "birth",
        "marriage",
        "divorce",
        "death",
        "adpotion",
        "legitimation of father",
        "recognition of child",
    ];

    const requirements = {
        birth: [
            {
                title: "New Registration and Certification-b",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "Correction-b",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "Lost-b",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "Damaged-b",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        marriage: [
            {
                title: "New Registration and Certification-m",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-m",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-m",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-m",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        divorce: [
            {
                title: "New Registration and Certification-d",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-d",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-d",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification-d",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        death: [
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        adpotion: [
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        "legitimation of father": [
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
        "recognition of child": [
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
            {
                title: "New Registration and Certification",
                description:
                    "  These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA).   These are the prerequisites for getting services from Civil Registration and Residency Service Agency (CRRSA)",
            },
        ],
    };
    const handleShowRequirement = (option: optionsType) => {
        setRequirementsTab(option);
    };
    return (
        <div
            className='flex flex-col flex-1 min-h-screen items-center justify-center gap-5 bg-[#204D66] py-10 lg:py-20 px-5'
            id='requirements'
        >
            <Card className='max-w-[1500px] bg-[#F7F7F7] w-full flex flex-col gap-3 rounded-[21px] py-10 px-5 lg:px-16 shadow-[inset_0_4px_6px_rgba(0,0,0,0.2),_0_4px_6px_rgba(0,0,0,0.3)]'>
                <div className='text-center mb-3 space-y-5'>
                    <p className='text-3xl lg:text-5xl font-semibold text-[#073954]'>
                        Requirements for Services
                    </p>
                    <p className='text-xl text-[#204D66]'>
                        These are the prerequisites for getting services from
                        Civil <br /> Registration and Residency Service Agency
                        (CRRSA)
                    </p>
                </div>
                <div className='flex flex-wrap gap-5 justify-center'>
                    <Button
                        onClick={() => setDocumentDisplay("civil-registration")}
                        variant={
                            "civil-registration" === documentDisplay
                                ? "default"
                                : "outline"
                        }
                        className={`space-x-5 lg:py-4 lg:px-5 rounded-md shadow-md ${
                            "civil-registration" === documentDisplay
                                ? "bg-[#073954]"
                                : "text-[#073954]"
                        }`}
                    >
                        <div>
                            <Image
                                src={
                                    "civil-registration" === documentDisplay
                                        ? documentIcon.src
                                        : documentIconPrimary.src
                                }
                                height={30}
                                width={30}
                                alt='resident-service-doc'
                            />
                        </div>
                        <p>Civil Registration</p>
                    </Button>
                    <Button
                        onClick={() =>
                            setDocumentDisplay("resident-registration")
                        }
                        variant={
                            "resident-registration" === documentDisplay
                                ? "default"
                                : "outline"
                        }
                        className={`space-x-5 lg:py-4 lg:px-5 rounded-md shadow-md ${
                            "resident-registration" === documentDisplay
                                ? "bg-[#073954]"
                                : "text-[#073954]"
                        }`}
                    >
                        <div>
                            <Image
                                src={
                                    "resident-registration" === documentDisplay
                                        ? documentIcon.src
                                        : documentIconPrimary.src
                                }
                                alt='resident-service-doc'
                                height={30}
                                width={30}
                            />
                        </div>
                        <p>Resident Service</p>
                    </Button>
                </div>
                <div className='flex flex-wrap gap-2 justify-evenly pb-2 lg:pb-5 border-b'>
                    {options.map((option: optionsType) => (
                        <div key={option}>
                            <Button
                                variant='bare'
                                onClick={() => handleShowRequirement(option)}
                            >
                                <p
                                    className={`capitalize lg:text-xl ${
                                        requirementsTab === option
                                            ? "text-[#073954]"
                                            : "text-[#7D7D7D]"
                                    }`}
                                >
                                    {option}
                                </p>
                            </Button>
                            {requirementsTab === option ? (
                                <div className='w-full py-1 bg-[#073954]  rounded-full mt-2'></div>
                            ) : null}
                        </div>
                    ))}
                </div>
                <div className='grid lg:grid-cols-2 gap-y-5 lg:gap-y-10 gap-5 lg:gap-x-20 lg:px-10 pb-5 mt-5'>
                    {requirements[requirementsTab].map((requirement, index) => (
                        <Card
                            key={requirement.title + index}
                            className='p-5 pb-8 shadow-lg flex shado-lg gap-3 rounded-lg'
                        >
                            <div>
                                <Image
                                    src={documentIconPrimary.src}
                                    height={80}
                                    width={80}
                                    alt='resident-service-doc'
                                />
                            </div>
                            <div className='space-y-5'>
                                <p className='font-semibold text-[#073954]'>
                                    {requirement.title}
                                </p>
                                <p className='text-sm text-[#7D7D7D]'>
                                    {requirement.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default RequirementForService;
