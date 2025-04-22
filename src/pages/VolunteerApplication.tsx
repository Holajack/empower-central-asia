
import React, { useEffect, useRef } from "react";

const VolunteerApplication = () => {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    topRef.current?.scrollIntoView({ behavior: 'smooth' });

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
    <div className="min-h-screen bg-sage-50 flex items-center justify-center py-12 px-2">
      <div ref={topRef} className="w-full max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-md" style={{ minHeight: 950 }}>
        <h1 className="text-2xl font-bold mb-6 text-center text-sand-500">Volunteer Application</h1>
        <div style={{ width: "100%", minHeight: 934 }}>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/Eik96ptPRWcPm5P2Am2w"
            style={{ width: "100%", height: 934, border: "none", borderRadius: 3 }}
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
  );
};

export default VolunteerApplication;
