"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

/**
 * Route error boundary (SRS routing shell). Error boundaries must be Client
 * Components. Next.js 16 supplies `unstable_retry` to re-render the segment
 * (replaces the older `reset`). Renders inside the root layout.
 */
export default function Error({
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
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <Eyebrow>Something went wrong</Eyebrow>
      <Heading as="h1" size="h1">
        An unexpected error occurred
      </Heading>
      <Text variant="lead" className="max-w-md">
        Sorry about that. You can try again, and if the problem persists, please
        reload the page.
      </Text>
      <Button
        type="button"
        variant="gradient"
        size="lg"
        onClick={() => unstable_retry()}
      >
        <RotateCcw />
        Try again
      </Button>
    </Container>
  );
}
