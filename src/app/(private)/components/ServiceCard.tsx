import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { serviceList } from "@/common/utils/constants/services";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Animated expansion component
interface ExpandableContentProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({
  isExpanded,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isExpanded ? height : 0 }}
    >
      {children}
    </div>
  );
};

// Service Card Component
interface ServiceCardProps {
  service: (typeof serviceList)[0];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [showAllSubServices, setShowAllSubServices] = useState(false);
  const [expandedSubService, setExpandedSubService] = useState<string | null>(
    null
  );
  const maxVisibleSubServices = 4;

  const baseSubServices = service.subServices.slice(0, maxVisibleSubServices);
  const additionalSubServices = service.subServices.slice(
    maxVisibleSubServices
  );

  const toggleSubService = (subServiceName: string) => {
    setExpandedSubService(
      expandedSubService === subServiceName ? null : subServiceName
    );
  };

  return (
    <Card className="w-full bg-[#FFFFFF]">
      <CardHeader className="flex-row items-center gap-4">
        <div className="w-12 h-12 relative">
          <Image
            src={service.icon}
            alt={service.name}
            fill
            className="object-contain"
          />
        </div>
        <CardTitle className="text-xl">{service.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="mb-4 text-[16.64px]">
          {service.description}
        </CardDescription>

        {/* Base Sub Services - Always visible */}
        <div className="flex flex-col space-y-1">
          {baseSubServices.map((subService) => (
            <div
              key={subService.name}
              className="border rounded-lg p-2 space-y-2"
            >
              {/* Sub Service Header */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleSubService(subService.name)}
              >
                <div className="w-8 h-8 relative">
                  <Image
                    src={subService.icon}
                    alt={subService.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-[16.83px] text-[#073954]">
                  {subService.name}
                </span>
                <div className="ml-auto transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "transform transition-transform duration-300",
                      expandedSubService === subService.name
                        ? "rotate-180"
                        : "rotate-0"
                    )}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* Requests with animated expansion */}
              <ExpandableContent
                isExpanded={expandedSubService === subService.name}
              >
                <div className="mt-2 space-x-2 w-full flex items-center justify-between">
                  {subService.requests.map((request) => (
                    <a
                      key={request.type}
                      href={request.link}
                      className="w-full flex bg-gray-200 hover:bg-gray-600 hover:text-white items-center justify-center  text-xs p-2 bg-muted rounded   transition-colors"
                    >
                      {request.type}
                    </a>
                  ))}
                </div>
              </ExpandableContent>
            </div>
          ))}
        </div>

        {/* Additional Sub Services */}
        <ExpandableContent isExpanded={showAllSubServices}>
          <div className="flex flex-col space-y-1 mt-1">
            {additionalSubServices.map((subService) => (
              <div
                key={subService.name}
                className="border rounded-lg p-2 space-y-2"
              >
                {/* Sub Service Header */}
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => toggleSubService(subService.name)}
                >
                  <div className="w-8 h-8 relative">
                    <Image
                      src={subService.icon}
                      alt={subService.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-sm">{subService.name}</span>
                  <div className="ml-auto transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn(
                        "transform transition-transform duration-300",
                        expandedSubService === subService.name
                          ? "rotate-180"
                          : "rotate-0"
                      )}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Requests with animated expansion */}
                <ExpandableContent
                  isExpanded={expandedSubService === subService.name}
                >
                  <div className="mt-2 space-x-2 w-full flex items-center justify-between">
                    {subService.requests.map((request) => (
                      <a
                        key={request.type}
                        href={request.link}
                        className="w-full flex items-center justify-center block text-xs p-2 bg-muted rounded hover:bg-muted/80 transition-colors"
                      >
                        {request.type}
                      </a>
                    ))}
                  </div>
                </ExpandableContent>
              </div>
            ))}
          </div>
        </ExpandableContent>

        {/* Show More/Less Button */}
        {service.subServices.length > maxVisibleSubServices ? (
          <button
            onClick={() => setShowAllSubServices(!showAllSubServices)}
            className="w-full text-[16.81px] text-[#073954] text-bold hover:text-foreground transition-colors flex items-center justify-end py-2 mt-2"
          >
            {showAllSubServices ? (
              <>
                <span>Less</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform transition-transform duration-300"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg> */}
              </>
            ) : (
              <>
                <span>More</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform transition-transform duration-300"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg> */}
              </>
            )}
          </button>
        ) : (
          <button className="w-full p-2">
            <button className="w-full h-3 mt-3 gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"></button>
          </button>
        )}
      </CardContent>
    </Card>
  );
};

interface ServiceListProps {
  gap?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ gap = "2" }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start",
        `${gap}`
      )}
    >
      {serviceList.map((service) => (
        <ServiceCard key={service.name} service={service} />
      ))}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ServiceCard,
  ServiceList,
};
