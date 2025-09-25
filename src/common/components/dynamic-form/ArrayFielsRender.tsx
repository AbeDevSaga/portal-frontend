"use client";

import React, { useEffect, useMemo } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FieldConfig } from "@/common/types/formType";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { updateField } from "@/features/vital-service/birth-service/store/birthSlice";

interface ArrayFieldRendererProps {
  field: FieldConfig;
}

export const ArrayFieldRenderer: React.FC<ArrayFieldRendererProps> = ({
  field,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const dispatch = useDispatch();

  const dependentValues = field.getDependentValue?.(values) || null;

  // Hide array if dependent value not set
  if (field.isHide?.(dependentValues)) return null;

  // Determine how many children to render
  const arrayLength = useMemo(
    () => field.getLength?.(dependentValues?.birthType) || 1,
    [dependentValues?.birthType, field.getLength]
  );

  // Initialize array and nested fields
  useEffect(() => {
    const currentArray = values[field.key] || [];
    if (currentArray.length !== arrayLength) {
      const newArray = Array.from({ length: arrayLength }, (_, i) => {
        const existing = currentArray[i] || {};
        // Initialize nested fields if undefined
        const initialized = { ...existing };
        field.fields?.forEach((nestedField) => {
          if (initialized[nestedField.key] === undefined) {
            initialized[nestedField.key] = "";
          }
        });
        return initialized;
      });
      setFieldValue(field.key, newArray);
    }
  }, [arrayLength, field.key, field.fields, setFieldValue, values[field.key]]);

  // Render a single nested field
  const renderField = (nestedField: FieldConfig, childIndex: number) => {
    const fieldKey = `${field.key}[${childIndex}].${nestedField.key}`;
    return (
      <Field key={fieldKey} name={fieldKey}>
        {({ field: formikField, form }: any) => {
          const isDisabled =
            nestedField.isDisabled?.(values) ?? nestedField.disabled;
          const isRequired =
            nestedField.isRequired?.(values) ?? nestedField.required;
          const description =
            nestedField.getDescription?.(values) || nestedField.description;
          const getFieldClassName = (baseClassName: string = "") => {
            const customClass = field.className || "";
            return [baseClassName, customClass].filter(Boolean).join(" ");
          };

          // Get custom labelClassName from field configuration
          const getLabelClassName = (
            baseClassName: string = "text-primary font-semibold"
          ) => {
            const customClass = field.labelClassName || "";
            return [baseClassName, customClass].filter(Boolean).join(" ");
          };

          switch (nestedField.type) {
            case "input":
              return (
                <Field name={field.key}>
                  {({ field: formikField, form }: any) => {
                    // Get dependent field values if callback is provided
                    const dependentValues = field.getDependentValue
                      ? field.getDependentValue(form.values)
                      : null;

                    // Handle default values for dependent fields - DYNAMIC SOLUTION
                    // Auto-detect and track dependency changes from getDependentValue function
                    const getDependencyKeys = useMemo(() => {
                      if (!field.getDependentValue) return [];

                      try {
                        // Call getDependentValue to see what keys it accesses
                        const sampleResult = field.getDependentValue(
                          form.values
                        );
                        return Object.keys(sampleResult || {});
                      } catch (error) {
                        // Fallback: extract potential keys from function string
                        const functionStr = field.getDependentValue.toString();
                        const matches =
                          functionStr.match(/formValues\.(\w+)/g) || [];
                        return matches.map((match) =>
                          match.replace("formValues.", "")
                        );
                      }
                    }, [field.getDependentValue]);

                    // Create a stable dependency tracker using useRef
                    const dependencyTracker = React.useRef("");
                    const currentDependencyString = getDependencyKeys
                      .map((key) => {
                        const value = form.values[key];
                        return `${key}:${
                          value?.id ||
                          value?.value ||
                          JSON.stringify(value) ||
                          ""
                        }`;
                      })
                      .join("|");

                    React.useEffect(() => {
                      // Check if dependencies have actually changed
                      const hasChanged =
                        dependencyTracker.current !== currentDependencyString;

                      if (
                        hasChanged &&
                        field.defaultValue &&
                        typeof field.defaultValue === "function"
                      ) {
                        const newDefaultValue = field.defaultValue(
                          dependentValues,
                          form.values
                        );

                        // Only set if the value is meaningful and different from current field value
                        if (
                          newDefaultValue &&
                          newDefaultValue !== form.values[field.key]
                        ) {
                          form.setFieldValue(field.key, newDefaultValue, false);
                          dispatch(
                            updateField({
                              key: field.key,
                              value: newDefaultValue,
                            })
                          );
                        }

                        // Update the tracker
                        dependencyTracker.current = currentDependencyString;
                      }
                    }, [
                      currentDependencyString,
                      field.defaultValue,
                      field.key,
                      form.values[field.key],
                    ]); // Track only what matters

                    // Dynamic field properties based on dependent values
                    const dynamicDescription = field.getDescription
                      ? field.getDescription(dependentValues)
                      : field.description;
                    const dynamicPlaceholder = field.getPlaceholder
                      ? field.getPlaceholder(dependentValues)
                      : field.placeholder;
                    const isFieldDisabled = field.isDisabled
                      ? field.isDisabled(dependentValues)
                      : field.disabled;
                    const isFieldHidden = field.isHide
                      ? field.isHide(dependentValues)
                      : false;
                    const isFieldRequired = field.isRequired
                      ? field.isRequired(dependentValues)
                      : field.required;

                    // If field is hidden, render empty div to maintain hook consistency
                    if (isFieldHidden) {
                      return <div style={{ display: "none" }}></div>;
                    }

                    return (
                      <div className={getFieldClassName()}>
                        <Label
                          className={`${
                            getLabelClassName() ?? "text-primary font-semibold"
                          }`}
                          htmlFor={field.key}
                        >
                          {field.label}
                          {isFieldRequired ? (
                            <span className="text-red-600">*</span>
                          ) : null}
                        </Label>
                        <Input
                          {...formikField}
                          placeholder={dynamicPlaceholder}
                          disabled={isFieldDisabled}
                          className={getFieldClassName()}
                          onChange={(e) => {
                            const value = e.target.value;
                            dispatch(
                              updateField({
                                key: field.key,
                                value,
                              })
                            );
                            form.setFieldValue(field.key, value);
                          }}
                        />
                        {dynamicDescription &&
                          dynamicDescription.trim() !== "" && (
                            <p className="text-[#7D7D7D] text-sm mt-1">
                              {dynamicDescription}
                            </p>
                          )}
                        <ErrorMessage
                          name={field.key}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    );
                  }}
                </Field>
              );
            case "number":
              return (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label} {isRequired && "*"}
                  </label>
                  <Input
                    {...formikField}
                    type={nestedField.type === "number" ? "number" : "text"}
                    placeholder={nestedField.placeholder}
                    disabled={isDisabled}
                  />
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                </div>
              );
            case "select":
              return (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label}
                  </label>
                  <Select
                    value={formikField.value}
                    onValueChange={(value) =>
                      form.setFieldValue(fieldKey, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={nestedField.placeholder || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {nestedField.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            case "radio":
              return (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label}
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
                </div>
              );
            case "date":
              return (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {nestedField.label}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          !formikField.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formikField.value
                          ? format(formikField.value, "PPP")
                          : "Pick a date"}
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
                </div>
              );
            default:
              return (
                <Input
                  {...formikField}
                  placeholder={nestedField.placeholder}
                  disabled={isDisabled}
                />
              );
          }
        }}
      </Field>
    );
  };

  return (
    <div className="space-y-4">
      <label className="block mb-2 font-semibold">{field.label}</label>
      {(values[field.key] || []).map((child: any, idx: number) => (
        <Card key={idx} className="p-4 border rounded-md">
          <CardHeader>
            <CardTitle>Child {idx + 1}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-6 md:grid-cols-12 gap-4">
            {field.fields?.map((nestedField) => renderField(nestedField, idx))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
