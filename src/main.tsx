import { createRoot, hydrateRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Single QueryClient for the whole app. Used by Sanity content hooks + future fetches.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Content doesn't change every minute — 5 min stale, 30 min in cache.
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootElement = document.getElementById("root")!;

const tree = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// If the page was prerendered, hydrate to attach event handlers.
// Otherwise, do a fresh render (development or non-prerendered routes).
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}
