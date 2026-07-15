"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Global error boundary (SRS routing shell). Catches errors thrown in the root
 * layout/template and replaces the whole document, so it must render its own
 * `<html>`/`<body>` and import global styles. Client Component per Next.js 16.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="bg-background text-foreground flex min-h-full flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-md">
          A critical error occurred. Please try again or reload the page.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="bg-gradient-brand text-brand-foreground rounded-lg px-5 py-2.5 text-sm font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
