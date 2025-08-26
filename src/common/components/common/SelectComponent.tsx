import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";

const SelectComponent = ({
    value,
    options,
    onChange,
}: {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full px-5 py-7">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="w-full">
                {options.map((option) => (
                    <SelectItem
                        value={option.value}
                        key={option.value}
                        className="px-5 py-7"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectComponent;
