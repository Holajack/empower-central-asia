import Link from "next/link";

export function StoreButtons() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
      <Link
        href="#"
        className="flex items-center gap-2.5 sm:gap-3 bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity w-full sm:w-auto justify-center"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] sm:text-xs opacity-80">Download on the</div>
          <div className="font-semibold text-sm sm:text-base">App Store</div>
        </div>
      </Link>
      <Link
        href="#"
        className="flex items-center gap-2.5 sm:gap-3 bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity w-full sm:w-auto justify-center"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.4 0 .77.15 1.05.44l9.95 9.06-9.95 9.06c-.28.29-.65.44-1.05.44-.83 0-1.5-.67-1.5-1.5zm17.5-9L7.12 2.05c-.28-.26-.65-.41-1.05-.41.73 0 1.45.27 2.01.76L19.5 11.5 8.08 20.6c-.56.49-1.28.76-2.01.76.4 0 .77-.15 1.05-.41L20.5 11.5z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] sm:text-xs opacity-80">Get it on</div>
          <div className="font-semibold text-sm sm:text-base">Google Play</div>
        </div>
      </Link>
    </div>
  );
}
