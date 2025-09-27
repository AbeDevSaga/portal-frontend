"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CalendarIcon, Trash2Icon } from "lucide-react";
import { format } from "date-fns";
import { FieldConfig } from "@/common/types/formType";

interface ArrayFieldRendererProps {
  field: FieldConfig;
}

export const ArrayFieldRenderer: React.FC<ArrayFieldRendererProps> = ({
  field,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const [manuallyAdded, setManuallyAdded] = useState(0);

  const dependentValues = field.getDependentValue?.(values) || null;

  // Move all hooks to the top before any conditional returns
  const baseLength = useMemo(() => {
    return field.getLength?.(dependentValues?.birthType) || 1;
  }, [dependentValues?.birthType, field]);

  const addButtonValidator = field.validators?.find(
    (v) => v.type === "button" && v.button
  );
  const maxItems = addButtonValidator?.maxItems || Infinity;

  // Calculate total allowed length (base + manually added)
  const totalAllowedLength = Math.min(baseLength + manuallyAdded, maxItems);

  // Get current array from formik
  const currentArray = values[field.key] || [];

  // Ensure array has correct length
  useEffect(() => {
    if (currentArray.length !== totalAllowedLength) {
      let newArray = [...currentArray];

      // Remove excess items if current array is longer than allowed
      if (newArray.length > totalAllowedLength) {
        newArray = newArray.slice(0, totalAllowedLength);
        // Update manuallyAdded count when items are removed due to base length change
        const newManuallyAdded = Math.max(0, totalAllowedLength - baseLength);
        setManuallyAdded(newManuallyAdded);
      }

      // Add missing items with proper initialization
      while (newArray.length < totalAllowedLength) {
        const emptyObj: Record<string, any> = {};
        field.fields?.forEach((nestedField) => {
          emptyObj[nestedField.key] = "";
        });
        newArray.push(emptyObj);
      }

      // Initialize each item properly
      newArray = newArray.map((existing: any) => {
        const initialized: Record<string, any> = { ...existing };
        field.fields?.forEach((nestedField) => {
          if (initialized[nestedField.key] === undefined) {
            initialized[nestedField.key] = "";
          }
        });
        return initialized;
      });

      setFieldValue(field.key, newArray, false);
    }
  }, [
    baseLength,
    totalAllowedLength,
    field.key,
    field.fields,
    setFieldValue,
    currentArray,
  ]);

  // Now do the conditional return AFTER all hooks
  if (field.isHide?.(dependentValues)) return null;

  const canAddMore = totalAllowedLength < maxItems;

  const handleAdd = () => {
    if (!canAddMore) return;
    setManuallyAdded((prev) => prev + 1);
  };

  const handleRemove = (index: number) => {
    // Only allow removal of manually added items (items beyond baseLength)
    if (index < baseLength) return;

    // Remove the item from the array
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    setFieldValue(field.key, newArray);

    // Decrement manuallyAdded count
    setManuallyAdded((prev) => Math.max(0, prev - 1));
  };

  // Check if we should show numbering (only when there's more than 1 card)
  const shouldShowNumbering = currentArray.length > 1;

  const renderField = (nestedField: FieldConfig, childIndex: number) => {
    const fieldKey = `${field.key}[${childIndex}].${nestedField.key}`;

    return (
      <Field key={fieldKey} name={fieldKey}>
        {({ field: formikField, form }: any) => {
          const isDisabled =
            nestedField.isDisabled?.(form.values) ?? nestedField.disabled;
          const isRequired =
            nestedField.isRequired?.(form.values) ?? nestedField.required;
          const description =
            nestedField.getDescription?.(form.values) ||
            nestedField.description;
          const placeholder =
            nestedField.getPlaceholder?.(form.values) ||
            nestedField.placeholder;

          if (nestedField.isHide?.(form.values)) return null;

          const gridClass = `${nestedField.className ?? ""} w-full space-y-2`;
          // inputSearch
          switch (nestedField.type) {
            case "input":
            case "number":
              return (
                <div className={`${gridClass}`}>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Input
                    {...formikField}
                    type={nestedField.type === "number" ? "number" : "text"}
                    placeholder={placeholder}
                    disabled={isDisabled}
                  />
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                  <ErrorMessage
                    name={fieldKey}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              );

            case "inputSearch":
              return (
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2">
                  <div className={`${gridClass}`}>
                    <label className="block text-sm font-medium mb-1">
                      {nestedField.label} {isRequired && "*"}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        {...formikField}
                        type="text"
                        placeholder={placeholder}
                        disabled={isDisabled}
                      />
                      <Button
                        type="button"
                        className="bg-[#073954] px-4"
                        onClick={() => {
                          if (nestedField.actionButton?.onClick) {
                            nestedField.actionButton.onClick(formikField.value);
                          } else {
                            console.log(
                              "InputSearch value:",
                              formikField.value
                            );
                          }
                        }}
                      >
                        {nestedField.actionButton?.label || "Search"}
                      </Button>
                    </div>
                    {description && (
                      <p className="text-sm text-gray-500">{description}</p>
                    )}
                    <ErrorMessage
                      name={fieldKey}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              );

            case "select":
              return (
                <div className={`${gridClass}`}>
                  <label className="block text-sm font-medium">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Select
                    value={formikField.value}
                    onValueChange={(value) =>
                      form.setFieldValue(fieldKey, value)
                    }
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
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                  <ErrorMessage
                    name={fieldKey}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              );

            case "radio":
              return (
                <div className={`${gridClass}`}>
                  <label className="block text-sm font-medium">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <RadioGroup
                    value={formikField.value}
                    onValueChange={(val) => form.setFieldValue(fieldKey, val)}
                  >
                    {nestedField.options?.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={opt.value}
                          id={`${fieldKey}-${idx}`}
                        />
                        <label htmlFor={`${fieldKey}-${idx}`}>
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  <ErrorMessage
                    name={fieldKey}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              );

            case "date":
              return (
                <div className={`${gridClass}`}>
                  <label className="block text-sm font-medium">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left flex item-center justify-between"
                      >
                        {formikField.value
                          ? format(formikField.value, "PPP")
                          : placeholder}
                        <CalendarIcon className="mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formikField.value}
                        onSelect={(date) => form.setFieldValue(fieldKey, date)}
                        disabled={(date) =>
                          date < new Date("1900-01-01") || date > new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                  <ErrorMessage
                    name={fieldKey}
                    component="div"
                    className="text-red-500 text-sm"
                  />
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
      <div className="w-full flex flex-col space-y-4">
        {currentArray.map((child: any, idx: number) => {
          // Check if this is a manually added item (can be removed)
          const isManuallyAdded = idx >= baseLength;

          return (
            <Card
              key={idx}
              className="p-4 space-y-4 border rounded-md relative"
            >
              {/* Remove button for manually added items */}
              {isManuallyAdded && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-3 right-3 h-8 w-8 p-0"
                  onClick={() => handleRemove(idx)}
                  title="Remove this item"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              )}

              <CardHeader className="p-0 pr-8">
                {" "}
                {/* Add padding to accommodate remove button */}
                <CardTitle className="text-[#073954] font-semibold text-[17px]">
                  {field.label} {shouldShowNumbering && ` ${idx + 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent
                className={`p-0 ${
                  field.className ||
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                }`}
              >
                {field.fields?.map((nestedField) =>
                  renderField(nestedField, idx)
                )}
              </CardContent>
            </Card>
          );
        })}

        {addButtonValidator && canAddMore && (
          <div className="w-full flex items-center justify-end">
            <Button onClick={handleAdd} className="bg-[#073954] px-4">
              {addButtonValidator.label || "Add"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
