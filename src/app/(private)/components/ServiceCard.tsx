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
    <Card className="w-full">
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
        <CardDescription className="mb-6">
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-2"
          >
            {showAllSubServices ? (
              <>
                <span>Show Less</span>
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
                  className="transform transition-transform duration-300"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </>
            ) : (
              <>
                <span>
                  Show {service.subServices.length - maxVisibleSubServices} More
                </span>
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
                  className="transform transition-transform duration-300"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
          </button>
        ) : (
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors"></button>
        )}
      </CardContent>
    </Card>
  );
};

// Main Service List Component
const ServiceList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
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
