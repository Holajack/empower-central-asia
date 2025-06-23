
const LocationMap = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Visit Our Location</h3>
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.8234567890123!2d-81.02345678901234!3d29.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6c8b123456789%3A0x123456789abcdef0!2s2570%20Jasmine%20Rd%2C%20Port%20Orange%2C%20FL%2032128%2C%20USA!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our office location in Port Orange, Florida"
          aria-label="Interactive map showing our office location at 2570 Jasmine Rd, Port Orange, FL"
        ></iframe>
      </div>
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium">Visiting Our Office:</p>
        <p>Please schedule an appointment in advance. Walk-ins welcome during business hours, but appointments ensure dedicated time with our team.</p>
      </div>
    </div>
  );
};

export default LocationMap;
