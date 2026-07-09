"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light treatment only over a dark full-bleed hero (home), before scrolling.
  const light = overlay && !scrolled && !open;
  const solid = !overlay || scrolled || open;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "border-b border-line bg-paper/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/meec/logo.png"
            alt="MEEC logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className={`font-display text-2xl font-medium ${light ? "text-white" : "text-primary-deep"}`}>
              MEEC
            </span>
            <span className={`text-[11px] uppercase tracking-[0.18em] ${light ? "text-white/70" : "text-muted"}`}>
              Education Centre
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] font-medium transition-colors ${
                  light
                    ? active
                      ? "text-white"
                      : "text-white/85 hover:text-white"
                    : active
                      ? "text-primary"
                      : "text-ink/80 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            Enroll now
          </Link>
        </div>

        <button
          className={`flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${
            light ? "border-white/40 text-white" : "border-line text-ink"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Hamburger — three bars morphing into an X when open */}
          <span aria-hidden className="relative flex h-[14px] w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium hover:bg-primary-soft ${
                  isActive(item.href) ? "text-primary" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
            >
              Enroll now
            </Link>
            <p className="mt-3 px-3 text-xs text-muted">{site.phones.join(" · ")}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
