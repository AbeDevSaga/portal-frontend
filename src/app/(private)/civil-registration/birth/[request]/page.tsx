// path: application/birth/[request]
"use client";
import React, { useState } from "react";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

type RequestType = "lost" | "damaged" | "correction";

function Page({ params }: { params: Promise<{ request: string }> }) {
  const { request } = React.use(params);
  // const t = useTranslations();

  const [formNumber, setFormNumber] = useState("");
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // http://168.231.109.155:8081/api/v1/birth-registrations/vital-request?registrationFormNumber=RO-2025-00220250195

  // Validate the request
  if (!["lost", "damaged", "correction"].includes(request)) {
    notFound(); // return 404 page if not valid
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNumber.trim()) return; // prevent empty search
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const res = await fetch(
        `http://168.231.109.155:8081/api/v1/birth-registrations/vital-request?registrationFormNumber=${formNumber}`
      );
      const data = await res.json();

      if (data.success && data.data) {
        setUserData(data.data);
      } else {
        setError(
          "No record found. Please check your information and try again."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getTitleText = () => {
    switch (request as RequestType) {
      case "lost":
        return "Report Lost Birth Certificate";
      case "damaged":
        return "Replace Damaged Birth Certificate";
      case "correction":
        return "Request Birth Certificate Correction";
      default:
        return "Birth Certificate Service";
    }
  };

  const getDescriptionText = () => {
    switch (request as RequestType) {
      case "lost":
        return "Enter your birth registration ID to report a lost certificate";
      case "damaged":
        return "Enter your birth registration ID to replace a damaged certificate";
      case "correction":
        return "Enter your birth registration ID to request corrections";
      default:
        return "Enter your birth registration ID";
    }
  };

  const placeholderText = "Enter your birth registration ID";

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getTitleText()}
          </h1>
          <p className="text-gray-600 mb-8">{getDescriptionText()}</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={formNumber}
                onChange={(e) => setFormNumber(e.target.value)}
                className="flex-1 block w-full focus:outline-none sm:text-sm"
                placeholder={placeholderText}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!formNumber.trim() || loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
              formNumber.trim()
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {userData && (
          <div className="animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-700 text-sm">
                  Record found First Name:{" "}
                  {userData.localizations[0]?.childFirstName} You can proceed
                  with your request.
                </span>
              </div>
            </div>

            <a
              href={`/civil-registration/birth/${request}/form`} // This would be your actual form page
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Continue to Application
            </a>
          </div>
        )}

        {!userData && error.trim() && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-yellow-700 text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
