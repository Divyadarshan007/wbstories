import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {siteConfig.nav.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>
          Powered by{" "}
          <Link
            href={siteConfig.builtBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground"
          >
            {siteConfig.builtBy.name}
          </Link>
        </p>
      </div>
    </footer>
  );
}
