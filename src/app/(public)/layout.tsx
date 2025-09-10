"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Footer from "./components/footer";
import LandingPageNavbar from "./components/LandingPageNavbar";

export default function LandingPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const appBarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState({ top: 64, bottom: 96 });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const appBarHeight = appBarRef.current?.offsetHeight || 64;
      const footerHeight = footerRef.current?.offsetHeight || 96;
      setPadding({ top: appBarHeight, bottom: footerHeight });
    });

    if (appBarRef.current) observer.observe(appBarRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen flex flex-col scrollbar-hide">
      <div ref={appBarRef} className="fixed top-0 left-0 right-0 z-50">
        {/* <AppBar
          logo={appBarData.logo}
          button={appBarData.button}
          navLinks={navLinks}
        /> */}
        <LandingPageNavbar />
      </div>
      <main
        className="flex-1 overflow-auto"
        style={{
          paddingTop: `${padding.top}px`,
        }}
      >
        {children}
      </main>
      <Footer />
      {/* <Footer footer={defaultFooterData} navLinks={navLinks} /> */}
    </div>
  );
}
