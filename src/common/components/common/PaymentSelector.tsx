"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import LineSeparator from "./LineSeparator";

interface PaymentOption {
  id: string | number;
  label: string;
  value: string;
  data?: {
    image?: string;
    serviceType?: string;
    price?: string | number;
    class?: string;
  };
}

interface PaymentSelectorProps {
  options: PaymentOption[];
  onPaid?: (option: PaymentOption) => void;
}

const PaymentSelector = ({ options, onPaid }: PaymentSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(
    null
  );
  const [pendingOption, setPendingOption] = useState<PaymentOption | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleConfirm = async (option: PaymentOption) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate payment
      setSelectedOption(option);
      setPendingOption(null);
      setIsPaid(true);
      onPaid?.(option);
    } catch (err) {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {options.map((option) => {
        const { image, serviceType, price, class: bgClass } = option.data || {};
        const isSelected = selectedOption?.value === option.value;

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
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1 flex-col">
                <h3 className="font-semibold text-gray-800">Service Type</h3>
                <LineSeparator height="h-[2px]" />
                {serviceType && (
                  <span className="font-bold text-lg text-gray-700">
                    {serviceType}
                  </span>
                )}
              </div>
              <div className="flex-1 flex-col">
                <h3 className="font-semibold text-gray-800">Price</h3>
                <LineSeparator height="h-[2px]" />
                {price && (
                  <span className="font-bold text-lg text-gray-700">
                    {price}
                  </span>
                )}
              </div>
            </div>
            <Button type="button">{isSelected ? "Selected" : "Pay"}</Button>
          </div>
        );
      })}

      {pendingOption && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Payment
            </h2>
            <p className="mb-4">
              Do you want to complete payment with{" "}
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

      {isPaid && (
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
          onClick={() => alert("Request submitted successfully!")}
        >
          Submit Request
        </Button>
      )}
    </div>
  );
};

export default PaymentSelector;
