import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Injects analytics / verification tags into index.html from env vars so no
 * IDs are hard-coded in the repo:
 *   VITE_GA_MEASUREMENT_ID   → Google Analytics 4 (gtag.js)
 *   VITE_GTM_ID              → Google Tag Manager (optional, instead of gtag)
 *   VITE_META_PIXEL_ID       → Meta/Facebook Pixel
 *   VITE_GSC_VERIFICATION    → Google Search Console meta verification
 *   VITE_BING_VERIFICATION   → Bing Webmaster meta verification
 *   VITE_CLARITY_ID          → Microsoft Clarity
 */
function envTagsPlugin(env: Record<string, string>): Plugin {
  return {
    name: "env-tags",
    transformIndexHtml(html) {
      const tags: string[] = [];
      if (env.VITE_GSC_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}" />`);
      if (env.VITE_BING_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${env.VITE_BING_VERIFICATION}" />`);
      if (env.VITE_GTM_ID) {
        tags.push(
          `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${env.VITE_GTM_ID}');</script>`
        );
      } else if (env.VITE_GA_MEASUREMENT_ID) {
        tags.push(
          `<script async src="https://www.googletagmanager.com/gtag/js?id=${env.VITE_GA_MEASUREMENT_ID}"></script>`,
          `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${env.VITE_GA_MEASUREMENT_ID}');</script>`
        );
      }
      if (env.VITE_META_PIXEL_ID) {
        tags.push(
          `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${env.VITE_META_PIXEL_ID}');fbq('track','PageView');</script>`
        );
      }
      if (env.VITE_CLARITY_ID) {
        tags.push(
          `<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${env.VITE_CLARITY_ID}");</script>`
        );
      }
      return html.replace("<!--ENV_TAGS-->", tags.join("\n    "));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    server: { host: "::", port: 8080 },
    plugins: [react(), envTagsPlugin(env)],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    build: { chunkSizeWarningLimit: 1500 },
  };
});
