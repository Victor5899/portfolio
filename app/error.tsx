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
    <Container className="flex min-h-[70vh] flex-col justify-center gap-8 py-24">
      <Eyebrow className="text-brand">Something went wrong</Eyebrow>
      <Heading as="h1" size="h1" className="max-w-3xl">
        An unexpected error occurred
      </Heading>
      <Text variant="lead" className="max-w-md">
        Sorry about that. You can try again, and if the problem persists, please
        reload the page.
      </Text>
      <Button
        type="button"
        size="xl"
        className="self-start"
        onClick={() => unstable_retry()}
      >
        <RotateCcw />
        Try again
      </Button>
    </Container>
  );
}
