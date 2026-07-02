import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingContact from "./FloatingContact";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <FloatingContact />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
