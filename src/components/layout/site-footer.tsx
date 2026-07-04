import Link from "next/link";
import { siteConfig } from "@/constants/site";

const links = [
  ["Tools", "/tools"],
  ["Categories", "/categories"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms-of-service"],
  ["Refunds", "/refund-policy"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <p className="font-heading text-lg font-semibold text-metallic-gold">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground transition hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
