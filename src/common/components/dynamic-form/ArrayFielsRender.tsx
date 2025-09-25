"use client";

import React, { useEffect, useMemo } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FieldConfig } from "@/common/types/formType";

interface ArrayFieldRendererProps {
  field: FieldConfig;
}

export const ArrayFieldRenderer: React.FC<ArrayFieldRendererProps> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const dependentValues = field.getDependentValue?.(values) || null;

  if (field.isHide?.(dependentValues)) return null;

  const arrayLength = useMemo(() => field.getLength?.(dependentValues?.birthType) || 1, [dependentValues, field.getLength]);

  useEffect(() => {
    const currentArray = values[field.key] || [];
    if (currentArray.length !== arrayLength) {
      const newArray = Array.from({ length: arrayLength }, (_, i) => {
        const existing = currentArray[i] || {};
        const initialized = { ...existing };
        field.fields?.forEach((nestedField) => {
          if (initialized[nestedField.key] === undefined) initialized[nestedField.key] = "";
        });
        return initialized;
      });
      setFieldValue(field.key, newArray);
    }
  }, [arrayLength, field.key, field.fields, setFieldValue, values[field.key]]);

  const renderField = (nestedField: FieldConfig, childIndex: number) => {
    const fieldKey = `${field.key}[${childIndex}].${nestedField.key}`;

    return (
      <Field key={fieldKey} name={fieldKey}>
        {({ field: formikField, form }: any) => {
          const isDisabled = nestedField.isDisabled?.(form.values) ?? nestedField.disabled;
          const isRequired = nestedField.isRequired?.(form.values) ?? nestedField.required;
          const description = nestedField.getDescription?.(form.values) || nestedField.description;
          const placeholder = nestedField.getPlaceholder?.(form.values) || nestedField.placeholder;

          if (nestedField.isHide?.(form.values)) return null;

          const gridClass = nestedField.gridCols ? `col-span-6 md:col-span-${nestedField.gridCols}` : "col-span-6";
          console.log("gridclass: ", gridClass)

          switch (nestedField.type) {
            case "input":
            case "number":
              return (
                <div className={`md:col-span-6 mb-4`}>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Input
                    {...formikField}
                    type={nestedField.type === "number" ? "number" : "text"}
                    placeholder={placeholder}
                    disabled={isDisabled}
                  />
                  {description && <p className="text-sm text-gray-500">{description}</p>}
                  <ErrorMessage name={fieldKey} component="div" className="text-red-500 text-sm" />
                </div>
              );

            case "select":
              return (
                <div className={`${gridClass} mb-4`}>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Select
                    value={formikField.value}
                    onValueChange={(value) => form.setFieldValue(fieldKey, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={placeholder || "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                      {nestedField.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {description && <p className="text-sm text-gray-500">{description}</p>}
                  <ErrorMessage name={fieldKey} component="div" className="text-red-500 text-sm" />
                </div>
              );

            case "radio":
              return (
                <div className={`${gridClass} mb-4`}>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <RadioGroup
                    value={formikField.value}
                    onValueChange={(val) => form.setFieldValue(fieldKey, val)}
                  >
                    {nestedField.options?.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`${fieldKey}-${idx}`} />
                        <label htmlFor={`${fieldKey}-${idx}`}>{opt.label}</label>
                      </div>
                    ))}
                  </RadioGroup>
                  <ErrorMessage name={fieldKey} component="div" className="text-red-500 text-sm" />
                </div>
              );

            case "date":
              return (
                <div className={`${gridClass} mb-4`}>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formikField.value ? format(formikField.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formikField.value}
                        onSelect={(date) => form.setFieldValue(fieldKey, date)}
                        disabled={(date) => date < new Date("1900-01-01") || date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  {description && <p className="text-sm text-gray-500">{description}</p>}
                  <ErrorMessage name={fieldKey} component="div" className="text-red-500 text-sm" />
                </div>
              );

            default:
              return null;
          }
        }}
      </Field>
    );
  };

  return (
    <div className="space-y-4">
      <label className="block mb-2 font-semibold">{field.label}</label>
      <div className="w-full flex flex-col space-y-4">
        {(values[field.key] || []).map((child: any, idx: number) => (
          <Card key={idx} className="p-4 border rounded-md">
            <CardHeader>
              <CardTitle>Child {idx + 1}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-12 md:grid-cols-6 gap-4">
              {field.fields?.map((nestedField) => renderField(nestedField, idx))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
