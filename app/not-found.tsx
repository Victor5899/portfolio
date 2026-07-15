import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { GradientText } from "@/components/common/GradientText";
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
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <Eyebrow>Error 404</Eyebrow>
      <GradientText as="p" className="font-mono text-7xl font-semibold sm:text-8xl">
        404
      </GradientText>
      <Heading as="h1" size="h1">
        This page wandered off
      </Heading>
      <Text variant="lead" className="max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </Text>
      <Button render={<Link href={ROUTES.home} />} variant="gradient" size="lg">
        <ArrowLeft />
        Back to home
      </Button>
    </Container>
  );
}
