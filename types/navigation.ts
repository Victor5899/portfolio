export interface NavItem {
  /** Stable section id used as the in-page anchor target. */
  id: string;
  label: string;
  /** In-page href, e.g. "#projects". */
  href: string;
  /** When true, shown in the desktop header. All items remain in the drawer and footer. */
  primary?: boolean;
}
