import React from "react";
import Image from "next/image";
import { MessageCircleWarning } from "lucide-react";

// Import all SVG icons
import birth from "@/public/images/sidebar/birth.svg";
import death from "@/public/images/sidebar/death.svg";
import marriage from "@/public/images/sidebar/marriage.svg";
import divorce from "@/public/images/sidebar/divorce.svg";
import adoption from "@/public/images/sidebar/adoption.svg";
import legitmation from "@/public/images/sidebar/legitimationoffather.svg";
import recognition from "@/public/images/sidebar/recognitionofchild.svg";
import id from "@/public/images/sidebar/id.svg";
import family from "@/public/images/sidebar/family.svg";
import list from "@/public/images/sidebar/list.svg";
import create from "@/public/images/sidebar/create.svg";
import { getSvgFilter } from "./iconColors";

interface IconRendererProps {
  icon: string;
  alt?: string;
  className?: string;
  color?: string;
}

// Icon mapping object
const iconMap: Record<string, string> = {
  birth: birth.src,
  death: death.src,
  marriage: marriage.src,
  divorce: divorce.src,
  adoption: adoption.src,
  legitimation: legitmation.src,
  recognition: recognition.src,
  id: id.src,
  family: family.src,
  list: list.src,
  create: create.src
};

export const IconRenderer: React.FC<IconRendererProps> = ({ 
  icon, 
  alt = "icon",  
  className = "",
  color 
}) => {
  // If icon is a Lucide icon
  if (icon === "MessageCircleWarning") {
    return <MessageCircleWarning className={className} />;
  }
  
  // If icon is a mapped SVG icon
  if (iconMap[icon]) {
    const filterStyle = color ? { filter: getSvgFilter(color) } : {};
    return (
      <Image
        src={iconMap[icon]}
        width={24}
        height={24}
        alt={alt}
        className={className}
        style={filterStyle}
      />
    );
  }
  
  // Fallback for unknown icons
  console.warn(`Unknown icon: ${icon}`);
  return <div className={`w-6 h-6 bg-gray-300 rounded ${className}`} />;
};
