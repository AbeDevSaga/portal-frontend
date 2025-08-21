import React from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

export const SelectComponent = ({
    options,
    multiselect = false,
    value,
    handleChange,
}: {
    options: { label: string; value: string }[];
    multiselect?: boolean;
    value: { label: string; value: string };
    handleChange: (
        newValue:
            | MultiValue<{ label: string; value: string }>
            | SingleValue<{ label: string; value: string }>,
        actionMeta: ActionMeta<{ label: string; value: string }>
    ) => void;
}) => (
    <Select
        options={options}
        isMulti={multiselect}
        value={value}
        onChange={handleChange}
    />
);
