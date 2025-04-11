import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-12 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-terracotta-500">
              Businesses Beyond Borders
            </h3>
            <p className="text-gray-600 mb-4">
              Empowering entrepreneurs and transforming communities across Central
              Asia through sustainable business development.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:donations@businessesbeyondborders.com?subject=Inquiry%20about%20Businesses%20Beyond%20Borders&body=Hello%2C%0A%0AI%20would%20like%20to%20learn%20more%20about%20Businesses%20Beyond%20Borders.%0A%0ABest%20regards%2C%0A" 
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  Text Us
                </a>
              </li>
              <li>
                <a 
                  href="tel:+14074098836" 
                  className="text-gray-600 hover:text-terracotta-500 transition-colors"
                >
                  +1 (407) 409-8836
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Businesses.BB"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="text-gray-400 hover:text-terracotta-500 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/businesses-beyond-borders/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="text-gray-400 hover:text-terracotta-500 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/businessesbeyondborders/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className="text-gray-400 hover:text-terracotta-500 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Businesses Beyond Borders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
