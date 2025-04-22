
import React, { useEffect, useRef } from "react";

const PartnerApplication = () => {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    // Inject external form script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header from About page */}
      <div
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Partner Application
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Become a partner and help us create sustainable economic opportunities.
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div ref={topRef} className="container mx-auto px-4 py-12">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-4">
          <div
            style={{
              width: "100%",
              minHeight: 883,
            }}
          >
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/RrXeqfzdcMvMmpel5vRG"
              style={{
                width: "100%",
                height: 883,
                border: "none",
                borderRadius: 3,
              }}
              id="inline-RrXeqfzdcMvMmpel5vRG"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Partner With Us"
              data-height="883"
              data-layout-iframe-id="inline-RrXeqfzdcMvMmpel5vRG"
              data-form-id="RrXeqfzdcMvMmpel5vRG"
              title="Partner With Us"
              allow="clipboard-write"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerApplication;
