import LandingNavBar from "@/components/layout/landingNavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RequirementForService from "./components/requirementForService";
import looper from "@/public/images/Looper-bg.svg";
import Faq from "./components/faq";
import Image from "next/image";
import ellipse from "@/public/images/Ellipse-25.svg";
import Footer from "./components/footer";
export default function Home() {
    return (
        <div
            className='min-h-screen bg-cover bg-no-repeat font-barlow'
            id='home'
        >
            <LandingNavBar />
            <div className='relative overflow-clip'>
                <div className='absolute h-full w-full z-10 md:bottom-40 lg:left-[15rem]'>
                    <div className='flex-1 relative h-full w-full min-h-[70vh] lg:min-h-[125vh]'>
                        <Image src={looper.src} alt='looper' fill></Image>
                    </div>
                </div>
                <div className='absolute bottom-10 md:-bottom-36 right-[20rem] w-[125vw] z-10 h-[800px]'>
                    <div className='flex-1 relative h-full w-full '>
                        <Image src={ellipse.src} alt='ellipse' fill></Image>
                    </div>
                </div>
                <div className='flex flex-col flex-1 min-h-screen lg:min-h-[91vh] lg:items-center justify-center px-5 text-center !z-30'>
                    <p className='text-[#073954] text-4xl lg:text-[64px] font-bold leading-[50px] lg:leading-[96px] tracking-tighter'>
                        Your Gateway to Identity, Citizenship, <br />
                        and Residence Services.
                    </p>
                    <p className='text-xl max-w-[1200px] mb-[30px] text-[#204D66]'>
                        Your Gateway to Identity, Citizenship, and Residence
                        Services. Your Gateway to Identity, Citizenship, and
                        Residence Services. Your Gateway to Identity,
                        Citizenship, and Residence Services.
                    </p>
                    <Button asChild className='bg-[#073954]'>
                        <Link
                            href='/login'
                            className='text-xl lg:!py-5 lg:!px-14 w-fit mx-auto !z-30  text-white'
                        >
                            Access Services
                        </Link>
                    </Button>
                </div>
            </div>
            <RequirementForService />
            <Faq />
            <Footer />
        </div>
    );
}
