export interface Achievement {
  title: string;
  description: string;
  date?: string;
  /** Icon key resolved by the UI layer. */
  icon?: string;
  href?: string;
}
