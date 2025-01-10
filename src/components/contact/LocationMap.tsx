const LocationMap = () => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0637731777166!2d-122.39901518441636!3d37.78779997975772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d2a7800a5%3A0x94b02f5b056f3f47!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Our location on Google Maps"
        aria-label="Interactive map showing our location"
      ></iframe>
    </div>
  );
};

export default LocationMap;