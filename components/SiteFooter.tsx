import Image from "next/image";
import Link from "next/link";
import { site, nav } from "@/lib/content";
import Icon from "./Icon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper pb-8 pt-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/meec/logo.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
              <span className="font-display text-lg font-medium text-primary-deep">{site.fullName}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.address}</p>
            <p className="mt-2 text-sm text-muted">{site.phones.join(" · ")}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Links</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Connect with us</p>
            <div className="mt-3 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-primary-deep transition-colors hover:border-primary hover:bg-primary-soft"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center">
          <p className="text-xs text-muted">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
