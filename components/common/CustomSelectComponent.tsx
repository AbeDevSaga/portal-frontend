import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { JSX } from "react";

const CustomSelectComponent = ({
    name = "",
    value,
    options,
    onChange,
    placeholder = "",
}: {
    name: string;
    value: string;
    options: { value: string; label: JSX.Element }[];
    onChange: (value: string) => void;
    placeholder: string;
}) => {
    return (
        <Select name={name} value={value} onValueChange={onChange}>
            <SelectTrigger className='w-full bg-[#E1E7EA]'>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='w-full'>
                {options.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CustomSelectComponent;
