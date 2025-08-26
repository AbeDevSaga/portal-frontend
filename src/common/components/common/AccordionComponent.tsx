import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/common/components/ui/accordion";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export function AccordionComponent({
    data,
}: {
    data: {
        title: string;
        description: string;
        icon?: ReactNode;
    }[];
}) {
    return (
        <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='item-1'
        >
            {data.map((faq) => (
                <AccordionItem value={faq.title} key={faq.title}>
                    <div className='flex gap-5 w-full py-5'>
                        <div className='text-[#073954] pt-4'>{faq.icon}</div>
                        <div className='w-full'>
                            <AccordionTrigger className='text-[#073954] text-2xl'>
                                {faq.title}
                            </AccordionTrigger>
                            <AccordionContent className='flex flex-col gap-4 text-balance'>
                                <p className='text-[#7D7D7D] text-lg'>
                                    {faq.description}
                                </p>
                            </AccordionContent>
                        </div>
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
