export interface SeoConfig {
  siteName: string;
  /** Default document title. */
  title: string;
  /** Title template for child routes, e.g. "%s | Victor Ipil Soren". */
  titleTemplate: string;
  description: string;
  /** Canonical absolute site URL. */
  url: string;
  locale: string;
  keywords: string[];
  authorName: string;
  twitterHandle?: string;
  /** Absolute or app-relative path to the default OG image. */
  ogImage: string;
  themeColor: string;
}
