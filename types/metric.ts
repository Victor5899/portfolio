/** A measurable, animated headline metric (SRS §7.7 achievements-by-numbers). */
export interface Metric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  /** Semantic icon key resolved by the UI layer. */
  icon?: string;
}
