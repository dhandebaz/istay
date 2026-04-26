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

const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getTodayIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 10);
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${
    String(day).padStart(2, "0")
  }`;
}

function buildMonthGrid(year: number, month: number): (string | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rawFirstDay = new Date(year, month, 1).getDay();
  const firstDayOffset = rawFirstDay === 0 ? 6 : rawFirstDay - 1;

  const cells: (string | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(toDateStr(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function hasBlockedInRange(
  checkIn: string,
  target: string,
  blocked: Set<string>,
): boolean {
  const cur = new Date(checkIn + "T00:00:00Z");
  cur.setUTCDate(cur.getUTCDate() + 1);
  const end = new Date(target + "T00:00:00Z");
  while (cur < end) {
    if (blocked.has(cur.toISOString().slice(0, 10))) return true;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return false;
}

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function BookingCalendar(
  { blockedDates, basePrice, propId }: BookingCalendarProps,
) {
  const today = getTodayIST();
  const blocked = new Set(blockedDates);

  const todayDate = new Date(today);
  const displayYear = useSignal(todayDate.getFullYear());
  const displayMonth = useSignal(todayDate.getMonth());
  const checkIn = useSignal<string | null>(null);
  const checkOut = useSignal<string | null>(null);
  const hovered = useSignal<string | null>(null);
  const showSoldOutAlert = useSignal(false);
  
  const isWidget = typeof window !== "undefined" && window.location.search.includes("widget=true");

  const nights = computed(() => {
    if (!checkIn.value || !checkOut.value) return 0;
    return Math.round(
      (new Date(checkOut.value).getTime() - new Date(checkIn.value).getTime()) /
        86_400_000,
    );
  });

  const totalAmount = computed(() => nights.value * basePrice);

  const canGoBack = computed(() => {
    const cur = new Date(displayYear.value, displayMonth.value);
    const now = new Date(todayDate.getFullYear(), todayDate.getMonth());
    return cur > now;
  });

  function prevMonth() {
    if (!canGoBack.value) return;
    if (displayMonth.value === 0) {
      displayMonth.value = 11;
      displayYear.value--;
    } else {
      displayMonth.value--;
    }
  }

  function nextMonth() {
    if (displayMonth.value === 11) {
      displayMonth.value = 0;
      displayYear.value++;
    } else {
      displayMonth.value++;
    }
  }

  function handleDateClick(date: string) {
    if (date < today || blocked.has(date)) {
      if (blocked.has(date)) {
        showSoldOutAlert.value = true;
        setTimeout(() => (showSoldOutAlert.value = false), 5000);
      }
      return;
    }
    showSoldOutAlert.value = false;

    if (!checkIn.value || (checkIn.value && checkOut.value)) {
      checkIn.value = date;
      checkOut.value = null;
    } else {
      if (date <= checkIn.value) {
        checkIn.value = date;
        checkOut.value = null;
      } else if (hasBlockedInRange(checkIn.value, date, blocked)) {
        checkIn.value = date;
        checkOut.value = null;
      } else {
        checkOut.value = date;
        hovered.value = null;
      }
    }
  }

  function getDayClasses(date: string): string {
    const isPast = date < today;
    const isBlocked = blocked.has(date);
    const isCheckIn = date === checkIn.value;
    const isCheckOut = date === checkOut.value;
    const inRange = checkIn.value && checkOut.value &&
      date > checkIn.value && date < checkOut.value;
    const inHover = checkIn.value && !checkOut.value && hovered.value &&
      date > checkIn.value && date <= hovered.value;

    const base =
      "w-11 h-11 flex items-center justify-center text-[13px] font-bold rounded-2xl transition-all duration-300 select-none";

    if (isPast || isBlocked) {
      return `${base} text-gray-200 line-through cursor-not-allowed opacity-30`;
    }
    if (isCheckIn || isCheckOut) {
      return `${base} bg-gray-900 text-white shadow-premium z-10 scale-110`;
    }
    if (inRange) {
      return `${base} bg-emerald-50 text-emerald-600 rounded-none cursor-pointer relative after:absolute after:inset-y-2 after:inset-x-0 after:bg-emerald-50/50 hover:bg-emerald-100 transition-colors`;
    }
    if (inHover) {
      return `${base} bg-emerald-50/50 text-emerald-400 rounded-none cursor-pointer transition-colors`;
    }
    return `${base} text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer`;
  }

  function handleBookNow() {
    if (!checkIn.value || !checkOut.value) return;
    const params = new URLSearchParams({
      propId,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      nights: String(nights.value),
      amount: String(totalAmount.value),
    });
    const url = `/p/checkout?${params.toString()}`;
    
    if (isWidget) {
      try {
        if (window.parent && window.parent !== window) {
          window.parent.location.href = url;
        } else {
          globalThis.location.href = url;
        }
      } catch {
        window.open(url, "_blank");
      }
    } else {
      globalThis.location.href = url;
    }
  }

  const weeks = buildMonthGrid(displayYear.value, displayMonth.value);
  const monthLabel = `${MONTHS[displayMonth.value]} ${displayYear.value}`;

  return (
    <div class="bg-white rounded-[3rem] border border-gray-50 shadow-premium-lg overflow-hidden transition-all duration-700 hover:shadow-premium-xl animate-fade-in">
      <div class="flex items-center justify-between px-10 py-8 border-b border-gray-50 bg-gray-50/20">
        <button
          onClick={prevMonth}
          disabled={!canGoBack.value}
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-premium transition-all disabled:opacity-10 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h3 class="text-[12px] font-bold text-gray-900 uppercase tracking-[0.4em]">{monthLabel}</h3>
        <button
          onClick={nextMonth}
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-premium transition-all"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div class="px-10 py-10">
        <div class="grid grid-cols-7 mb-6">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              class="flex items-center justify-center h-10 text-[11px] font-bold text-gray-300 uppercase tracking-widest"
            >
              {d}
            </div>
          ))}
        </div>

        <div class="space-y-1">
          {weeks.map((week, wi) => (
            <div key={wi} class="grid grid-cols-7">
              {week.map((date, di) => (
                <div
                  key={di}
                  class="flex items-center justify-center py-0.5"
                >
                  {date
                    ? (
                      <button
                        type="button"
                        onClick={() => handleDateClick(date)}
                        onMouseEnter={() => {
                          if (checkIn.value && !checkOut.value) {
                            hovered.value = date;
                          }
                        }}
                        onMouseLeave={() => {
                          hovered.value = null;
                        }}
                        class={getDayClasses(date)}
                        aria-label={date}
                      >
                        {Number(date.slice(8))}
                      </button>
                    )
                    : <div class="w-11 h-11" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div class="px-10 pb-8 flex items-center gap-10 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-t border-gray-50 pt-8 mx-10 mb-6">
        <span class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-gray-900" />
          Selected
        </span>
        <span class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-50" />
          In Range
        </span>
        <span class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-gray-100 opacity-30" />
          Occupied
        </span>
      </div>

      <div class="px-10 pb-12">
        {checkIn.value && !checkOut.value && (
          <div class="bg-emerald-50/50 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.4em] text-center py-5 rounded-[1.8rem] mb-6 animate-pulse border border-emerald-100 italic">
            Confirm Departure Protocol
          </div>
        )}

        {checkIn.value && checkOut.value && (
          <div class="space-y-8 animate-slide-up">
            <div class="p-8 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 space-y-4 shadow-inner">
              <div class="flex justify-between items-center">
                <div class="flex flex-col">
                   <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic">Stay Duration</span>
                   <span class="text-base font-bold text-gray-900 mt-1">
                      {nights} Operational Night{nights.value > 1 ? "s" : ""}
                   </span>
                </div>
                <div class="text-right">
                   <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic">Protocol Rate</span>
                   <p class="text-base font-bold text-emerald-600 mt-1">{formatINR(basePrice)}</p>
                </div>
              </div>
              <div class="pt-5 border-t border-gray-100 flex justify-between items-center">
                <span class="text-[11px] font-bold text-gray-900 uppercase tracking-[0.4em]">Residency Valuation</span>
                <span class="text-2xl font-bold text-gray-900 tracking-tighter transition-all">
                  {formatINR(totalAmount.value)}
                </span>
              </div>
              <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] text-center pt-3 opacity-60">
                ✓ Optimized Yield Protocol
              </div>
            </div>

            <button
              id="book-now-btn"
              onClick={handleBookNow}
              class="w-full py-6 rounded-[1.8rem] bg-gray-900 text-white font-bold text-[12px] uppercase tracking-[0.4em] shadow-premium-lg hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-500 group"
            >
              <span class="flex items-center justify-center gap-3">
                Secure Residency
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>

            <button
              onClick={() => {
                checkIn.value = null;
                checkOut.value = null;
              }}
              class="w-full text-center text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.4em] transition-all duration-500 hover:tracking-[0.6em] opacity-40 hover:opacity-100"
            >
              Reset Synchronization
            </button>
          </div>
        )}

        {!checkIn.value && (
          <div class="space-y-6">
            {showSoldOutAlert.value && (
              <div class="p-8 rounded-[2.5rem] bg-rose-50/50 border border-rose-100 animate-slide-up relative overflow-hidden group">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
                <p class="text-[11px] font-bold text-rose-500 uppercase tracking-[0.4em] mb-2 italic relative z-10">
                  Occupancy Threshold Reached
                </p>
                <p class="text-[13px] font-medium text-rose-700/70 leading-relaxed relative z-10">
                  These dates are currently synchronized with another residency node. Would you like to view curated alternatives?
                </p>
                <a
                  href={`#vibe-match?checkIn=${checkIn.value || ""}`}
                  class="mt-6 block w-full py-5 rounded-2xl bg-white border border-rose-100 text-rose-600 text-center text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-rose-50 transition-all shadow-sm relative z-10 active:scale-95"
                  onClick={(e) => {
                    const el = document.getElementById("vibe-match");
                    if (el) {
                       e.preventDefault();
                       el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explore Alternatives →
                </a>
              </div>
            )}
            <div class="py-6 text-center space-y-4">
               <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 mx-auto animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
               <p class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em] italic opacity-60">
                 Initialize Check-In Node
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

