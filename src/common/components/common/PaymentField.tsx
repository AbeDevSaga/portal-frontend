"use client";
import { updateField } from "@/redux/feature/birthSlice";
import Image from "next/image";
import { useState } from "react";
import { ErrorMessage } from "formik";
import LineSeparator from "./LineSeparator";
import { Button } from "../ui/button";

const PaymentField = ({ field, form, formikField, dispatch }: any) => {
  const [pendingOption, setPendingOption] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (option: any) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Set Formik value as plain string
      form.setFieldValue(field.key, option.value, true);
      form.setFieldTouched(field.key, true, false);

      // Update redux store if needed
      dispatch?.(
        updateField({
          key: field.key,
          value: option.value,
        })
      );

      setPendingOption(null);
    } catch (err) {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedValue = formikField.value;

  return (
    <div className="w-full space-y-2">
      <label className="text-primary font-semibold">
        {field.label}
        {field.required && <span className="text-red-600">*</span>}
      </label>

      <div className="flex flex-col gap-4">
        {field.options.map((option: any) => {
          const { image, price, serviceType } = option.data || {};
          const isSelected = selectedValue === option.value;

          return (
            <div
              key={option.id}
              className={`flex items-center justify-between border rounded-xl p-4 gap-6 shadow-sm cursor-pointer transition
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-white"
                }
              `}
              onClick={() => setPendingOption(option)}
            >
              <div
                className={`flex items-center px-4 ${
                  option.data?.class || "bg-gray-100"
                }`}
              >
                {image && (
                  <div className="w-[100px] aspect-[16/9] relative flex items-center justify-center">
                    <Image
                      src={image}
                      alt={option.label}
                      fill
                      className="rounded-md object-contain p-2"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-1 items-center">
                <div className="flex-1 flex-col items-center space-y-1">
                  <h3 className="font-semibold text-gray-800">Service Type</h3>
                  <LineSeparator height="h-[2px]" />
                  {serviceType && (
                    <span className="font-bold text-lg text-gray-700">
                      {serviceType}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex-col items-center space-y-1">
                  <h3 className="font-semibold text-gray-800">Service Fee</h3>
                  <LineSeparator height="h-[2px]" />
                  {price && (
                    <span className="font-bold text-lg text-gray-700">
                      {price}
                    </span>
                  )}
                </div>
              </div>

              <Button type="button" className="px-6">
                {isSelected ? "Selected" : "Deposit"}
              </Button>
            </div>
          );
        })}
      </div>

      <ErrorMessage
        name={field.key}
        component="div"
        className="text-red-500 text-sm"
      />

      {pendingOption && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Payment
            </h2>
            <p className="mb-4">
              Do you want to complete the payment with{" "}
              <strong>{pendingOption.label}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={() => setPendingOption(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleConfirm(pendingOption)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentField;
