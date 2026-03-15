"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { WaitlistModalContent } from "@/components/shared/waitlist-modal";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/help", label: "Help" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-background/90 backdrop-blur-xl border-b border-black/5",
          isScrolled && "shadow-soft"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 h-[60px] sm:h-[72px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 font-extrabold text-lg sm:text-xl"
          >
            <Image
              src="/images/app-icon.png"
              alt="HikeWise"
              width={34}
              height={34}
              className="rounded-[8px] sm:w-10 sm:h-10 sm:rounded-[10px]"
            />
            HikeWise
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Join Waitlist */}
            <Button
              onClick={() => setWaitlistOpen(true)}
              className="hidden md:inline-flex rounded-full px-6 bg-forest hover:bg-forest/90 text-white"
            >
              Join Waitlist
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                <nav className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base sm:text-lg font-medium py-2 active:text-teal transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* Mobile Join Waitlist — closes Sheet first, then opens modal */}
                  <Button
                    className="mt-4 rounded-full bg-forest hover:bg-forest/90 text-white"
                    onClick={() => {
                      setIsOpen(false);
                      // Small delay so Sheet close animation doesn't fight the modal open
                      setTimeout(() => setWaitlistOpen(true), 150);
                    }}
                  >
                    Join Waitlist
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Waitlist modal lives at header level so it survives Sheet unmount */}
      <WaitlistModalContent
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </>
  );
}
