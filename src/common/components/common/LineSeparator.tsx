import React from "react";

interface LineSeparatorProps {
  height?: string; // Tailwind height class, e.g., "h-1", "h-2"
  color?: string; // Tailwind background color class, e.g., "bg-gray-200", "bg-red-500"
  width?: string; // Tailwind width class, e.g., "w-full", "w-1/2"
  margin?: string; // Tailwind margin class, e.g., "my-4", "mt-2"
  className?: string; // Additional custom classes
}

const LineSeparator: React.FC<LineSeparatorProps> = ({
  height = "h-1",
  color = "bg-gray-200",
  width = "w-full",
  margin = "my-2",
  className = "w-full",
}) => {
  return (
    <div className={`${width} ${height} ${color} ${margin} ${className}`} />
  );
};

export default LineSeparator;
