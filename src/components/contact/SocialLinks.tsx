
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Connect With Us</h3>
      <p className="text-gray-600 text-sm mb-4">
        Follow our journey and stay updated on our latest programs and success stories.
      </p>
      <div className="flex gap-4 flex-wrap">
        <a
          href="https://facebook.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://linkedin.com/company/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our LinkedIn page"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://instagram.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our Instagram page"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://twitter.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our Twitter page"
        >
          <Twitter className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://youtube.com/@businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our YouTube channel"
        >
          <Youtube className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>📧 Subscribe to our newsletter for monthly updates</p>
        <p>🌍 Join our global community of changemakers</p>
      </div>
    </div>
  );
};

export default SocialLinks;
