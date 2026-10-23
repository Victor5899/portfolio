import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { AccentText } from "@/components/common/AccentText";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Custom 404 (SRS routing shell). Renders inside the root layout, so the nav and
 * footer remain available for recovery. Data-free, so it stays a static shell.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center gap-8 py-24">
      <Eyebrow className="text-brand">Error 404</Eyebrow>
      <Heading as="h1" size="display" className="max-w-4xl">
        This page <AccentText>wandered off</AccentText>
      </Heading>
      <Text variant="lead" className="max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </Text>
      <Button
        render={<Link href={ROUTES.home} />}
        size="xl"
        className="self-start"
      >
        <ArrowLeft />
        Back to home
      </Button>
    </Container>
  );
}
