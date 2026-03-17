
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

const SocialLinks = () => {
  const { isCentralAsia } = useRegion();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">{isCentralAsia ? "Мы в соцсетях" : "Connect With Us"}</h3>
      <p className="text-gray-600 text-sm mb-4">
        {isCentralAsia
          ? "Следите за нашими новостями и будьте в курсе последних программ и историй успеха."
          : "Follow our journey and stay updated on our latest programs and success stories."}
      </p>
      <div className="flex gap-4 flex-wrap">
        <a
          href="https://facebook.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-[#C9922A]/10 text-gray-600 hover:text-[#C9922A] transition-colors"
          aria-label={isCentralAsia ? "Наша страница в Facebook" : "Visit our Facebook page"}
        >
          <Facebook className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://linkedin.com/company/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-[#C9922A]/10 text-gray-600 hover:text-[#C9922A] transition-colors"
          aria-label={isCentralAsia ? "Наша страница в LinkedIn" : "Visit our LinkedIn page"}
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://instagram.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-[#C9922A]/10 text-gray-600 hover:text-[#C9922A] transition-colors"
          aria-label={isCentralAsia ? "Наша страница в Instagram" : "Visit our Instagram page"}
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://twitter.com/businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-[#C9922A]/10 text-gray-600 hover:text-[#C9922A] transition-colors"
          aria-label={isCentralAsia ? "Наша страница в Twitter" : "Visit our Twitter page"}
        >
          <Twitter className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://youtube.com/@businessesbeyondborders"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-[#C9922A]/10 text-gray-600 hover:text-[#C9922A] transition-colors"
          aria-label={isCentralAsia ? "Наш канал на YouTube" : "Visit our YouTube channel"}
        >
          <Youtube className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        {isCentralAsia
          ? "Присоединяйтесь к нашему глобальному сообществу тех, кто меняет мир к лучшему."
          : "Follow our journey and join our global community of changemakers."}
      </p>
    </div>
  );
};

export default SocialLinks;
