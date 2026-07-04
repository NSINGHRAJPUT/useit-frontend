export const tokens = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  typography: {
    fontFamily: "var(--font-sans)",
    body: "16px",
    lead: "18px",
    h1: "2.25rem",
    h2: "1.75rem",
    h3: "1.25rem",
  },
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    pill: "9999px",
  },
  shadows: {
    subtle: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
    card: "0 4px 20px rgba(16,24,40,0.08)",
  },
  animations: {
    fast: "200ms",
    normal: "320ms",
    slow: "520ms",
  },
};

export type Tokens = typeof tokens;
