import Link from "next/link";
import { siteConfig } from "@/constants/site";

const columns = [
  {
    title: "Product",
    links: [
      ["All tools", "/tools"],
      ["Categories", "/categories"],
      ["Blog", "/blog"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms of Service", "/terms-of-service"],
      ["Cookie Policy", "/cookie-policy"],
      ["Refunds", "/refund-policy"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <p className="font-heading text-lg font-semibold text-metallic-gold">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <a className="text-gold hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-semibold text-foreground">{column.title}</p>
              <ul className="mt-3 grid gap-2">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-muted-foreground transition hover:text-gold">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gold/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ApkaOS · apkaos.in · Free online file tools
        </p>
      </div>
    </footer>
  );
}
