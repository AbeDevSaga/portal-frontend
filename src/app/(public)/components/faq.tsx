import { AccordionComponent } from "@/common/components/common/AccordionComponent";
import { Card } from "@/common/components/ui/card";
import {
    Award,
    CircleAlert,
    Heart,
    ListChecks,
    Minus,
    Plus,
} from "lucide-react";
import React from "react";

const Faq = () => {
    const faqData = [
        {
            icon: <CircleAlert className='rotate-180' size={30} />,
            title: "What is CRVS and why is it important?",
            description:
                "CRSV stands for Civil Registration and Vital Statistics. It is a system for recording vital events such as birth, death, marriage and divorce, it ensures legal identity, support s public services, and provides data for planning and development.",
        },
        {
            icon: <Heart size={30} />,
            title: "Which services are avaliable on this portal?",
            description:
                "CRSV stands for Civil Registration and Vital Statistics. It is a system for recording vital events such as birth, death, marriage and divorce, it ensures legal identity, support s public services, and provides data for planning and development.",
        },
        {
            icon: <ListChecks size={30} />,
            title: "Who can access these services?",
            description:
                "CRSV stands for Civil Registration and Vital Statistics. It is a system for recording vital events such as birth, death, marriage and divorce, it ensures legal identity, support s public services, and provides data for planning and development.",
        },
        {
            icon: <Award size={30} />,
            title: "How do i create and account?",
            description:
                "CRSV stands for Civil Registration and Vital Statistics. It is a system for recording vital events such as birth, death, marriage and divorce, it ensures legal identity, support s public services, and provides data for planning and development.",
        },
        // {
        //     icon: <Award size={30} />,
        //     title: "What documents do i need to register a birth or death?",
        //     description:
        //         "CRSV stands for Civil Registration and Vital Statistics. It is a system for recording vital events such as birth, death, marriage and divorce, it ensures legal identity, support s public services, and provides data for planning and development.",
        // },
    ];
    return (
        <div
            className='flex flex-col flex-1 min-h-screen items-center justify-center gap-5 py-10 lg:py-20 px-5'
            id='faq'
        >
            <Card className='p-4 w-full max-w-[1200px] rounded-3xl'>
                <div className='bg-[#E1E7EA] rounded-xl text-center py-10 lg:py-20 px-5 lg:px-32 space-y-5'>
                    <p className='text-3xl lg:text-5xl font-semibold text-[#073954]'>
                        FAQ
                    </p>
                    <p className='text-xl text-[#204D66]'>
                        These are the prerequisites for getting services from
                        Civil
                        <br /> Registration and Residency Service Agency (CRRSA)
                    </p>
                    <Card className='px-5 lg:px-10 py-5 w-full text-left'>
                        <AccordionComponent data={faqData} />
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default Faq;
