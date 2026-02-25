import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const VolunteerApplication = () => {
  const topRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    topRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup, remove script when unmounting
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <Helmet>
      <title>Volunteer Application | Businesses Beyond Borders</title>
      <meta name="description" content="Apply to volunteer with Businesses Beyond Borders. Join our mission to create sustainable economic opportunities through entrepreneurship training in Central Asia." />
      <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-application" />
      <meta property="og:title" content="Volunteer Application - Businesses Beyond Borders" />
      <meta property="og:description" content="Apply to volunteer with Businesses Beyond Borders. Join our mission to empower entrepreneurs in Central Asia." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-application" />
      <meta property="og:site_name" content="Businesses Beyond Borders" />
    </Helmet>
    <div className="min-h-screen bg-white">
      {/* Header Section - Copied from About page */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Volunteer Application
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Join our mission to create sustainable economic opportunities
          </p>
        </div>
      </div>

      {/* Existing Volunteer Application Content */}
      <div ref={topRef} className="container mx-auto px-4 py-12">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-4">
          <div style={{
            width: "100%",
            minHeight: 934
          }}>
            <iframe 
              src="https://api.leadconnectorhq.com/widget/form/Eik96ptPRWcPm5P2Am2w"
              style={{
                width: "100%",
                height: 934,
                border: "none",
                borderRadius: 3
              }} 
              id="inline-Eik96ptPRWcPm5P2Am2w" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Volunteer Application"
              data-height="934"
              data-layout-iframe-id="inline-Eik96ptPRWcPm5P2Am2w"
              data-form-id="Eik96ptPRWcPm5P2Am2w"
              title="Volunteer Application"
              allow="clipboard-write"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VolunteerApplication;
