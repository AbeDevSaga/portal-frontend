"use client";
import HeroSection from "@/common/components/common/HeroSection";
import { Card, CardContent, CardHeader } from "@/common/components/ui/card";
import { newVitalRequestOptions } from "@/common/utils/constants/vitalServices";
import Image from "next/image";
import Link from "next/link";
import { ServiceList } from "../../components/ServiceCard";
export default function Page() {
  return (
    <>
      {" "}
      <HeroSection
        title="New Vital Request"
        description="This is the New Vital Request Section"
        action={<></>}
      />
      {/* <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-7 xl:gap-10'>
                {newVitalRequestOptions.map((option) => (
                    <Link
                        href={option.link}
                        key={option.title}
                        className='flex-1 flex h-full w-full'
                    >
                        <Card className='flex-1'>
                            <CardHeader>
                                <div className='flex gap-3 items-center'>
                                    <Image
                                        src={option.icon}
                                        width={41}
                                        height={41}
                                        alt={option.title}
                                    />
                                    <p className='text-2xl font-bold leading-none text-primary'>
                                        {option.title}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>{option.description}</CardContent>
                        </Card>
                    </Link>
                ))}
            </div> */}
      <ServiceList />
    </>
  );
}
