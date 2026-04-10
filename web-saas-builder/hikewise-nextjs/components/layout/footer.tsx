import Link from "next/link";
import Image from "next/image";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

const footerLinks = {
  product: [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#nora", label: "Meet Nora" },
    { href: "/#features", label: "Pricing" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/faq", label: "FAQ" },
  ],
};

// Social links - add real URLs when accounts are created
const socialLinks: Array<{ href: string; label: string; icon: React.ReactNode }> = [];

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 font-extrabold text-lg sm:text-xl mb-3 sm:mb-4"
            >
              <Image
                src="/images/app-icon.png"
                alt="HikeWise"
                width={36}
                height={36}
                className="rounded-[10px] sm:w-10 sm:h-10"
              />
              HikeWise
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xs mb-5 sm:mb-6">
              Helping students study smarter and achieve their academic goals
              through intelligent focus tracking and AI-powered insights.
            </p>
            <div className="max-w-sm">
              <h4 className="font-semibold text-sm mb-3">Get Study Tips</h4>
              <NewsletterSignup variant="inline" />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:space-y-3 sm:gap-0">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} HikeWise. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
