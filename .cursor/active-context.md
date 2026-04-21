> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `islands\MobileMenu.tsx` (Domain: **Frontend (React/UI)**)

### 📐 Frontend (React/UI) Conventions & Fixes
- **[what-changed] what-changed in DashboardSidebar.tsx**: File updated (external): islands/DashboardSidebar.tsx

Content summary (417 lines):
import { useEffect, useState } from "preact/hooks";
import { type ComponentChildren } from "preact";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentChildren;
  exact?: boolean;
}

interface SidebarProps {
  currentPath: string;
}

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
];

export default function DashboardSidebar({ currentPath }: SidebarProps) {
  const [activePath, setActivePat
- **[what-changed] what-changed in index.tsx**: File updated (external): routes/index.tsx

Content summary (521 lines):
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import ListingCarousel from "../islands/ListingCarousel.tsx";
import ScraperPreview from "../islands/ScraperPreview.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { ArrowRightIcon, CheckIcon } from "../components/Icons.tsx";
import { getGlobalS
- **[convention] what-changed in pricing.tsx — confirmed 3x**: File updated (external): routes/pricing.tsx

Content summary (326 lines):
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import EarningsCalculator from "../islands/EarningsCalculator.tsx";
import PricingCheckout from "../islands/PricingCheckout.tsx";
import FaqSearch from "../islands/FaqSearch.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { ArrowRightIcon, CheckIcon } from "../components/Icons.tsx";
import { parseCoo
- **[discovery] discovery in _layout.tsx**: File updated (external): routes/dashboard/_layout.tsx

Content summary (220 lines):
import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";
import type { DashboardState, Notification } from "../../utils/types.ts";
import DashboardSidebar from "../../islands/DashboardSidebar.tsx";
import ResendVerificationBtn from "../../islands/ResendVerificationBtn.tsx";
import ErrorBoundary from "../../islands/ErrorBoundary.tsx";

import { getKv } from "../../utils/db.ts";

interface LayoutData {
  unreadCount: number;
}

export const handler: Hand
