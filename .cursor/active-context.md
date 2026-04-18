> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `islands\DeveloperApi.tsx` (Domain: **Frontend (React/UI)**)

### 🔴 Frontend (React/UI) Gotchas
- **⚠️ GOTCHA: Fixed null crash in ProofOfCleanUploader — avoids unnecessary re-renders in R...**: - import { useState, useRef, useMemo } from "preact/hooks";
+ import { useMemo, useRef, useState } from "preact/hooks";
- export default function ProofOfCleanUploader({ bookingId, guestName }: ProofOfCleanUploaderProps) {
+ export default function ProofOfCleanUploader(
-   const [_file, setFile] = useState<File | null>(null);
+   { bookingId, guestName }: ProofOfCleanUploaderProps,
-   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
+ ) {
-   const [isUploading, setIsUploading] = useState(false);
+   const [_file, setFile] = useState<File | null>(null);
-   const [uploadProgress, setUploadProgress] = useState(0);
+   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
-   const [success, setSuccess] = useState(false);
+   const [isUploading, setIsUploading] = useState(false);
-   const [error, setError] = useState<string | null>(null);
+   const [uploadProgress, setUploadProgress] = useState(0);
-   const [checklist, setChecklist] = useState<Record<string, boolean>>({});
+   const [success, setSuccess] = useState(false);
-   const [isCompressing, setIsCompressing] = useState(false);
+   const [error, setError] = useState<string | null>(null);
-   const fileInputRef = useRef<HTMLInputElement>(null);
+   const [checklist, setChecklist] = useState<Record<string, boolean>>({});
- 
+   const [isCompressing, setIsCompressing] = useState(false);
-   const checklistComplete = useMemo(() => {
+   const fileInputRef = useRef<HTMLInputElement>(null);
-     return Object.keys(checklist).length > 0 && Object.values(checklist).every(Boolean);
+ 
-   }, [checklist]);
+   const checklistComplete = useMemo(() => {
- 
+     return Object.keys(checklist).length > 0 &&
-   const handleFileChange = (e: Event) => {
+       Object.values(checklist).every(Boolean);
-     const input = e.target as HTMLInputElement;
+   }, [checklist]);
-     if (input.files && input.files[0]) {
+ 
-       const selectedFile = input.files[0];
+   const handleFileChange = (e:
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [ProofOfCleanUploaderProps, ProofOfCleanUploaderProps, COMPRESS_TIMEOUT_MS, COMPRESS_TIMEOUT_MS, ProofOfCleanUploader]

### 📐 Frontend (React/UI) Conventions & Fixes
- **[problem-fix] Fixed null crash in LedgerEntry — avoids unnecessary re-renders in React**: - /** @jsx h */
+ import { useCallback, useMemo, useState } from "preact/hooks";
- import { h } from "preact";
+ import type { LedgerEntry } from "../utils/types.ts";
- import { useCallback, useMemo, useState } from "preact/hooks";
+ 
- import type { LedgerEntry } from "../utils/types.ts";
+ interface FinancialLedgerProps {
- 
+   entries: LedgerEntry[];
- interface FinancialLedgerProps {
+ }
-   entries: LedgerEntry[];
+ 
- }
+ const PAGE_SIZE = 20;
- const PAGE_SIZE = 20;
+ export default function FinancialLedger({ entries }: FinancialLedgerProps) {
- 
+   const [filter, setFilter] = useState<"all" | "settled" | "pending">("all");
- export default function FinancialLedger({ entries }: FinancialLedgerProps) {
+   const [currentPage, setCurrentPage] = useState(1);
-   const [filter, setFilter] = useState<"all" | "settled" | "pending">("all");
+   const [dateFrom, setDateFrom] = useState("");
-   const [currentPage, setCurrentPage] = useState(1);
+   const [dateTo, setDateTo] = useState("");
-   const [dateFrom, setDateFrom] = useState("");
+ 
-   const [dateTo, setDateTo] = useState("");
+   // ── Filtered + date-ranged entries (memoized) ──────────────
- 
+   const filtered = useMemo(() => {
-   // ── Filtered + date-ranged entries (memoized) ──────────────
+     let result = entries;
-   const filtered = useMemo(() => {
+ 
-     let result = entries;
+     // Status filter
- 
+     if (filter !== "all") {
-     // Status filter
+       result = result.filter((e) => e.status === filter);
-     if (filter !== "all") {
+     }
-       result = result.filter((e) => e.status === filter);
+ 
-     }
+     // Date range filter
- 
+     if (dateFrom) {
-     // Date range filter
+       result = result.filter((e) => e.createdAt.slice(0, 10) >= dateFrom);
-     if (dateFrom) {
+     }
-       result = result.filter((e) => e.createdAt.slice(0, 10) >= dateFrom);
+     if (dateTo) {
-     }
+       result = result.filter((e) => e.createdAt.slice(0, 10) <= dateTo);
-     if (d
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FinancialLedgerProps, FinancialLedgerProps, PAGE_SIZE, PAGE_SIZE, FinancialLedger]
- **[problem-fix] problem-fix in EarningsCalculator.tsx**: -             <div class="border-t border-current border-opacity-10 pt-3 space-y-1">
+             {/* Visual Bar */}
-               <div class="flex justify-between text-xs text-gray-500">
+             <div class="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden flex">
-                 <span>Commission</span>
+               <div 
-                 <span class="font-600">{(commission * 100).toFixed(0)}%</span>
+                 class={`h-full ${name === 'istay' ? 'bg-mint-500' : 'bg-gray-300'}`} 
-               </div>
+                 style={{ width: `${(1 - commission) * 100}%` }}
-               <div class="flex justify-between text-xs text-gray-500">
+               />
-                 <span>Platform fee</span>
+               <div 
-                 <span class="font-600 text-rose-500">
+                 class={`h-full ${name === 'istay' ? 'bg-mint-200' : 'bg-rose-400'}`} 
-                   -{formatINR(fee)}
+                 style={{ width: `${commission * 100}%` }}
-                 </span>
+               />
-               </div>
+             </div>
-             </div>
+ 
-           </div>
+             <div class="border-t border-current border-opacity-10 pt-3 space-y-1">
-         ))}
+               <div class="flex justify-between text-xs text-gray-500">
-       </div>
+                 <span>Commission</span>
- 
+                 <span class="font-600">{(commission * 100).toFixed(0)}%</span>
-       {/* ── SAVINGS BANNER ──────────────────────────────── */}
+               </div>
-       <div class="rounded-2xl bg-gradient-to-r from-mint-500 to-emerald-400 p-5 sm:p-6 text-istay-900 shadow-md">
+               <div class="flex justify-between text-xs text-gray-500">
-         <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
+                 <span>Platform fee</span>
-           <div>
+                 <span class="font-600 text-rose-500">
-             <p class="text-sm font-800 text-istay-900/80 mb-1"
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [SETUP_FEE, SETUP_FEE, Platform, Platform, PLATFORMS]
- **[problem-fix] problem-fix in ErrorBoundary.tsx**: -   static getDerivedStateFromError(error: Error) {
+   static override getDerivedStateFromError(error: Error) {

📌 IDE AST Context: Modified symbols likely include [Props, Props, State, State, ErrorBoundary]
- **[what-changed] what-changed in OtaSavingsChart.tsx**: - interface SavingsData {
+ export interface SavingsData {

📌 IDE AST Context: Modified symbols likely include [SavingsData, SavingsData, OtaSavingsChartProps, OtaSavingsChartProps, OtaSavingsChart]
- **[problem-fix] problem-fix in ErrorBoundary.tsx**: -           <h3 class="text-sm font-700 text-gray-900 mb-1">Component Failed to Load</h3>
+           <h3 class="text-sm font-700 text-gray-900 mb-1">
-           <p class="text-xs text-gray-500 max-w-sm">
+             Component Failed to Load
-             Something went wrong while rendering this section. Please refresh the page.
+           </h3>
-           </p>
+           <p class="text-xs text-gray-500 max-w-sm">
-         </div>
+             Something went wrong while rendering this section. Please refresh
-       );
+             the page.
-     }
+           </p>
- 
+         </div>
-     return this.props.children;
+       );
-   }
+     }
- }
+ 
- 
+     return this.props.children;
+   }
+ }
+ 

📌 IDE AST Context: Modified symbols likely include [Props, Props, State, State, ErrorBoundary]
- **[decision] Optimized Date — avoids unnecessary re-renders in React**: - import { useState, useCallback, useMemo } from "preact/hooks";
+ import { useCallback, useMemo, useState } from "preact/hooks";
-     const headers = ["Date", "Transaction ID", "Booking Ref", "Gross Amount", "iStay Fee", "Net Payout", "Status"];
+     const headers = [
-     const rows = filtered.map((e) => [
+       "Date",
-       new Date(e.createdAt).toISOString().slice(0, 10),
+       "Transaction ID",
-       e.gatewayOrderId,
+       "Booking Ref",
-       e.bookingId,
+       "Gross Amount",
-       e.grossAmount.toString(),
+       "iStay Fee",
-       e.istayAmount.toString(),
+       "Net Payout",
-       e.hostAmount.toString(),
+       "Status",
-       e.status,
+     ];
-     ]);
+     const rows = filtered.map((e) => [
- 
+       new Date(e.createdAt).toISOString().slice(0, 10),
-     const csvContent = [
+       e.gatewayOrderId,
-       headers.join(","),
+       e.bookingId,
-       ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
+       e.grossAmount.toString(),
-     ].join("\n");
+       e.istayAmount.toString(),
- 
+       e.hostAmount.toString(),
-     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
+       e.status,
-     const url = URL.createObjectURL(blob);
+     ]);
-     const link = document.createElement("a");
+ 
-     link.href = url;
+     const csvContent = [
-     link.download = `istay-ledger-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
+       headers.join(","),
-     link.click();
+       ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
-     URL.revokeObjectURL(url);
+     ].join("\n");
-   }, [filtered, filter]);
+ 
- 
+     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
-   return (
+     const url = URL.createObjectURL(blob);
-     <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
+     const link = document.createElement("a");
-       <div class="px-8 py-6 border-b border-gray-50 flex fle
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FinancialLedgerProps, FinancialLedgerProps, PAGE_SIZE, PAGE_SIZE, FinancialLedger]
- **[decision] Optimized Record — avoids unnecessary re-renders in React**: - import { useState, useMemo } from "preact/hooks";
+ import { useMemo, useState } from "preact/hooks";
-   onComplete: (checklist: Record<string, boolean>, photoBase64?: string) => void;
+   onComplete: (
-   disabled?: boolean;
+     checklist: Record<string, boolean>,
- }
+     photoBase64?: string,
- 
+   ) => void;
- const CHECKLIST_ITEMS = [
+   disabled?: boolean;
-   { id: "ac_lights_off", label: "AC/Lights Off" },
+ }
-   { id: "windows_locked", label: "Windows Locked" },
+ 
-   { id: "geyser_off", label: "Geyser Off" },
+ const CHECKLIST_ITEMS = [
-   { id: "key_returned", label: "Key Returned" },
+   { id: "ac_lights_off", label: "AC/Lights Off" },
- ] as const;
+   { id: "windows_locked", label: "Windows Locked" },
- 
+   { id: "geyser_off", label: "Geyser Off" },
- export default function CaretakerChecklist({ bookingId: _bookingId, onComplete, disabled }: CaretakerChecklistProps) {
+   { id: "key_returned", label: "Key Returned" },
-   const [state, setState] = useState<Record<string, boolean>>({
+ ] as const;
-     ac_lights_off: false,
+ 
-     windows_locked: false,
+ export default function CaretakerChecklist(
-     geyser_off: false,
+   { bookingId: _bookingId, onComplete, disabled }: CaretakerChecklistProps,
-     key_returned: false,
+ ) {
-   });
+   const [state, setState] = useState<Record<string, boolean>>({
-   const [photo, setPhoto] = useState<string | null>(null);
+     ac_lights_off: false,
- 
+     windows_locked: false,
-   const allChecked = useMemo(() => {
+     geyser_off: false,
-     return Object.values(state).every(Boolean) && !!photo;
+     key_returned: false,
-   }, [state, photo]);
+   });
- 
+   const [photo, setPhoto] = useState<string | null>(null);
-   const toggle = (id: string) => {
+ 
-     if (disabled) return;
+   const allChecked = useMemo(() => {
-     const newState = { ...state, [id]: !state[id] };
+     return Object.values(state).every(Boolean) && !!photo;
-     setState(newState);
+   }, [state, photo]);
-  
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [CaretakerChecklistProps, CaretakerChecklistProps, CHECKLIST_ITEMS, CHECKLIST_ITEMS, CaretakerChecklist]
- **[trade-off] trade-off in OtaSavingsChart.tsx**: -     1
+     1,
-           <p class="text-xs text-gray-400 mt-0.5">Estimated commissions retained vs Airbnb/Booking.com</p>
+           <p class="text-xs text-gray-400 mt-0.5">
-         </div>
+             Estimated commissions retained vs Airbnb/Booking.com
- 
+           </p>
-         {/* Summary pills */}
+         </div>
-         <div class="flex items-center gap-3">
+ 
-           <div class="flex items-center gap-1.5 px-3 py-1.5 bg-mint-50 rounded-lg">
+         {/* Summary pills */}
-             <span class="w-2.5 h-2.5 rounded-full bg-mint-500 animate-pulse" />
+         <div class="flex items-center gap-3">
-             <span class="text-xs font-800 text-mint-700">
+           <div class="flex items-center gap-1.5 px-3 py-1.5 bg-mint-50 rounded-lg">
-               ₹{totalSavings.toLocaleString("en-IN")} Total Saved
+             <span class="w-2.5 h-2.5 rounded-full bg-mint-500 animate-pulse" />
-             </span>
+             <span class="text-xs font-800 text-mint-700">
-           </div>
+               ₹{totalSavings.toLocaleString("en-IN")} Total Saved
-         </div>
+             </span>
-       </div>
+           </div>
- 
+         </div>
-       {/* Chart Grid */}
+       </div>
-       <div class="relative">
+ 
-         <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
+       {/* Chart Grid */}
-           {[0, 1, 2, 3].map((i) => (
+       <div class="relative">
-             <div key={i} class="border-b border-gray-50 w-full h-0" />
+         <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
-           ))}
+           {[0, 1, 2, 3].map((i) => (
-         </div>
+             <div key={i} class="border-b border-gray-50 w-full h-0" />
- 
+           ))}
-         {/* Bars */}
+         </div>
-         <div class="relative flex items-end justify-between gap-4 sm:gap-6 h-44">
+ 
-           {data.map((month) => {
+         {/* Bars */}
-             const barHeight = ma
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [SavingsData, SavingsData, OtaSavingsChartProps, OtaSavingsChartProps, OtaSavingsChart]
- **[what-changed] Replaced preact/hooks with preact/hooks — avoids unnecessary re-renders in React**: - import { useState, useCallback } from "preact/hooks";
+ import { useCallback, useState } from "preact/hooks";
- export default function SettingsTabs({ initialTab = "general", tabs, children }: SettingsTabsProps) {
+ export default function SettingsTabs(
-   const [activeTab, setActiveTab] = useState(initialTab);
+   { initialTab = "general", tabs, children }: SettingsTabsProps,
- 
+ ) {
-   // Update URL without refresh
+   const [activeTab, setActiveTab] = useState(initialTab);
-   const switchTab = useCallback((id: string) => {
+ 
-     setActiveTab(id);
+   // Update URL without refresh
-     const url = new URL(globalThis.location.href);
+   const switchTab = useCallback((id: string) => {
-     url.searchParams.set("tab", id);
+     setActiveTab(id);
-     globalThis.history.pushState({}, "", url);
+     const url = new URL(globalThis.location.href);
-   }, []);
+     url.searchParams.set("tab", id);
- 
+     globalThis.history.pushState({}, "", url);
-   return (
+   }, []);
-     <div class="space-y-6">
+ 
-       {/* Tab Navigation */}
+   return (
-       <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit overflow-x-auto no-scrollbar">
+     <div class="space-y-6">
-         {tabs.map((tab) => (
+       {/* Tab Navigation */}
-           <button
+       <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit overflow-x-auto no-scrollbar">
-             type="button"
+         {tabs.map((tab) => (
-             key={tab.id}
+           <button
-             onClick={() => switchTab(tab.id)}
+             type="button"
-             class={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all whitespace-nowrap ${
+             key={tab.id}
-               activeTab === tab.id
+             onClick={() => switchTab(tab.id)}
-                 ? "bg-white text-gray-900 shadow-sm"
+             class={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all whitespace-nowrap ${
-  
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [Tab, Tab, SettingsTabsProps, SettingsTabsProps, SettingsTabs]
- **[what-changed] Refactored Step logic**: - import { useState, useEffect } from "preact/hooks";
+ import { useEffect, useState } from "preact/hooks";
-            <span class={`text-[10px] sm:text-xs text-gray-500 font-mono overflow-hidden whitespace-nowrap transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
+           <span
-              https://airbnb.com/h/beautiful-villa-stay
+             class={`text-[10px] sm:text-xs text-gray-500 font-mono overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
-            </span>
+               step >= 1 ? "opacity-100" : "opacity-0"
-         </div>
+             }`}
-       </div>
+           >
- 
+             https://airbnb.com/h/beautiful-villa-stay
-       <div class="flex-1 relative flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
+           </span>
-         
+         </div>
-         {/* Step 0: Idle/Waiting */}
+       </div>
-         <div class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
+ 
-           <div class="w-16 h-16 rounded-2xl bg-mint-50 text-mint-600 flex items-center justify-center mb-4 border border-mint-100 shadow-sm">
+       <div class="flex-1 relative flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
-             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
+         {/* Step 0: Idle/Waiting */}
-               <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
+         <div
-               <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
+           class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
-             </svg>
+             step === 0
-           </div>
+               ? "opac
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [MagicScraperAnimation, MagicScraperAnimation]
- **[discovery] discovery in AddProperty.tsx**: File updated (external): islands/AddProperty.tsx

Content summary (494 lines):
import { useSignal } from "@preact/signals";
import type { ScrapedListing } from "../utils/types.ts";

// ── Step State Machine ────────────────────────────────────────
type Step = "idle" | "loading" | "preview" | "saving" | "success" | "error";

// ── Skeleton Loader ───────────────────────────────────────────
function SkeletonPulse({ class: cls }: { class: string }) {
  return (
    <div
      class={`animate-pulse bg-gray-200 rounded-xl ${cls}`}
      aria-hidden="true"
    />
  );
}

functio
- **[what-changed] what-changed in BookingCalendar.tsx**: File updated (external): islands/BookingCalendar.tsx

Content summary (407 lines):
import { computed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface BookingCalendarProps {
  /** ISO date strings (YYYY-MM-DD) that are blocked/unavailable */
  blockedDates: string[];
  /** Nightly rate in INR */
  basePrice: number;
  /** Property ID for linking to checkout */
  propId: string;
}

// Days header (Monday-start)
const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",

- **[problem-fix] problem-fix in CheckoutForm.tsx**: File updated (external): islands/CheckoutForm.tsx

Content summary (316 lines):
import { useSignal } from "@preact/signals";

interface CheckoutFormProps {
  propId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  propertyName: string;
}

type FormStep = "details" | "submitting" | "redirecting" | "error";

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onInput,
  required = true,
  pattern,
  autocomplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onInput: (v: string) => void;
  required
- **[what-changed] what-changed in DashboardSidebar.tsx**: File updated (external): islands/DashboardSidebar.tsx

Content summary (383 lines):
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
