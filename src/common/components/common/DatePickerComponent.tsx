"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { FormikErrors, FormikTouched } from "formik";

const DatePickerComponent = ({
  value,
  setFieldValue,
  formItem,
  error,
  touched,
  className,
}: {
  touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  value: string;
  setFieldValue: (arg1: string, value: string) => void;
  formItem: {
    label: string;
    name: string;
    required: boolean;
  };
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  className?: string;
}) => {
  // Create date safely to avoid timezone issues
  const date =
    value && value.trim() !== ""
      ? (() => {
          const [year, month, day] = value.split("-");
          if (year && month && day) {
            // Create date in local timezone to avoid shifting
            const localDate = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day)
            );
            return !isNaN(localDate.getTime()) ? localDate : undefined;
          }
          return undefined;
        })()
      : undefined;
  return (
    <div
      className="gap-y-2 w-full flex flex-col"
      key={formItem.name}>
      <Label>{formItem.label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}>
            {value && date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="start">
          <Calendar
            mode="single"
            className="w-full"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                // Create a timezone-safe date string to avoid date shifting
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(selectedDate.getDate()).padStart(2, "0");
                const dateString = `${year}-${month}-${day}`;

                setFieldValue(formItem.name, dateString);
              }
            }}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {touched && error ? (
        <p className="text-red-500 text-sm">{error as string}</p>
      ) : null}
    </div>
  );
};

export default DatePickerComponent;
