import * as React from "react";

const RequestTypeDropdown = React.forwardRef(
  (
    {
      requestOptions,
      selectedRequest,
      setSelectedRequest,
      className,
      ...props
    }: any,
    ref: any
  ) => {
    console.log("selectedRequest: ", selectedRequest);
    return (
      <div
        ref={ref}
        className={`py-2 px-3 rounded-md border-2 border-[#e4e4e4] w-fit ${className}`}
        {...props}
      >
        <select
          value={selectedRequest}
          onChange={(e) => setSelectedRequest(e.target.value)}
          className="w-full px-4 py-2 bg-transparent outline-none capitalize cursor-pointer 
                     rounded-md text-primary focus:ring-2 focus:ring-[#2C566A]"
        >
          {/* Default option */}
          <option
            value=""
            className={`capitalize ${selectedRequest == "" ? "primary-button" : ""}`}
          >
            All Requests
          </option>
          {requestOptions.map((option: any) => (
            <option
              key={option.value}
              value={option.value}
              className={`capitalize ${
                option.value === selectedRequest ? "primary-button" : ""
              }`}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

RequestTypeDropdown.displayName = "RequestTypeDropdown";

export default RequestTypeDropdown;
