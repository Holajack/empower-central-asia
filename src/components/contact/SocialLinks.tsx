
import { Facebook, Linkedin, Instagram } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
      <div className="flex gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our LinkedIn page"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-500 transition-colors"
          aria-label="Visit our Instagram page"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
