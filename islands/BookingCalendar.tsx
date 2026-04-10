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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Returns today's date in IST as YYYY-MM-DD */
function getTodayIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 10);
}

/** Returns YYYY-MM-DD string for a given year/month/day */
function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Builds a 6-row × 7-col calendar grid of date strings or nulls */
function buildMonthGrid(year: number, month: number): (string | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // getDay(): 0=Sun. Convert to Mon-start: Mon=0 … Sun=6
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

/** Checks if any date from (checkIn exclusive) to (target exclusive) is blocked */
function hasBlockedInRange(
  checkIn: string,
  target: string,
  blocked: Set<string>,
): boolean {
  const cur = new Date(checkIn + "T00:00:00Z");
  cur.setUTCDate(cur.getUTCDate() + 1); // start from day after checkIn
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

  // ── State signals ──────────────────────────────────────────
  const todayDate = new Date(today);
  const displayYear = useSignal(todayDate.getFullYear());
  const displayMonth = useSignal(todayDate.getMonth());
  const checkIn = useSignal<string | null>(null);
  const checkOut = useSignal<string | null>(null);
  const hovered = useSignal<string | null>(null);

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

  // ── Navigation ─────────────────────────────────────────────
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

  // ── Date selection logic ───────────────────────────────────
  function handleDateClick(date: string) {
    if (date < today || blocked.has(date)) return;

    if (!checkIn.value || (checkIn.value && checkOut.value)) {
      // Start fresh selection
      checkIn.value = date;
      checkOut.value = null;
    } else {
      // checkIn set, checkOut not set
      if (date <= checkIn.value) {
        // Clicked before or on checkIn — restart
        checkIn.value = date;
        checkOut.value = null;
      } else if (hasBlockedInRange(checkIn.value, date, blocked)) {
        // Blocked date in range — restart from clicked date
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
      "w-9 h-9 flex items-center justify-center text-sm rounded-full transition-all duration-100 select-none";

    if (isPast || isBlocked) {
      return `${base} text-gray-300 line-through cursor-not-allowed`;
    }
    if (isCheckIn || isCheckOut) {
      return `${base} bg-teal-500 text-white font-700 shadow-sm cursor-pointer`;
    }
    if (inRange) {
      return `${base} bg-teal-100 text-teal-800 rounded-none cursor-pointer`;
    }
    if (inHover) {
      return `${base} bg-teal-50 text-teal-600 rounded-none cursor-pointer`;
    }
    return `${base} text-gray-700 hover:bg-gray-100 cursor-pointer`;
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
    globalThis.location.href = `/p/checkout?${params.toString()}`;
  }

  const weeks = buildMonthGrid(displayYear.value, displayMonth.value);
  const monthLabel = `${MONTHS[displayMonth.value]} ${displayYear.value}`;

  return (
    <div class="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
      {/* Month Navigation */}
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <button
          onClick={prevMonth}
          disabled={!canGoBack.value}
          class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <h3 class="text-sm font-700 text-gray-900">{monthLabel}</h3>
        <button
          onClick={nextMonth}
          class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label="Next month"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div class="px-4 py-3">
        {/* Day labels */}
        <div class="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              class="flex items-center justify-center h-8 text-xs font-600 text-gray-400"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date rows */}
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
                      aria-disabled={date < today || blocked.has(date)}
                      aria-pressed={
                        date === checkIn.value || date === checkOut.value
                      }
                    >
                      {Number(date.slice(8))}
                    </button>
                  )
                  : <div class="w-9 h-9" />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div class="px-5 pb-3 flex items-center gap-4 text-xs text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-teal-500 inline-block" />
          Selected
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-gray-200 inline-block" />
          Unavailable
        </span>
      </div>

      {/* Booking Summary + CTA */}
      <div class="px-5 pb-5">
        {checkIn.value && !checkOut.value && (
          <p class="text-xs text-teal-600 font-500 text-center py-2">
            Now select your check-out date
          </p>
        )}

        {checkIn.value && checkOut.value && (
          <div class="space-y-3">
            {/* Summary */}
            <div class="p-3 rounded-xl bg-gray-50 space-y-1.5">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">
                  {formatINR(basePrice)} × {nights} night{nights.value > 1 ? "s" : ""}
                </span>
                <span class="font-700 text-gray-900">
                  {formatINR(totalAmount.value)}
                </span>
              </div>
              <div class="flex justify-between text-xs text-gray-400">
                <span>{checkIn.value} → {checkOut.value}</span>
                <span class="text-teal-600 font-500">No hidden fees</span>
              </div>
            </div>

            {/* Book Now CTA */}
            <button
              id="book-now-btn"
              onClick={handleBookNow}
              class="w-full py-3.5 rounded-xl bg-teal-500 text-white font-700 text-sm shadow-sm hover:bg-teal-600 active:scale-95 transition-all duration-150"
            >
              Book Now — {formatINR(totalAmount.value)}
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                checkIn.value = null;
                checkOut.value = null;
              }}
              class="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              Clear selection
            </button>
          </div>
        )}

        {!checkIn.value && (
          <p class="text-xs text-gray-400 text-center py-2">
            Select your check-in date to begin
          </p>
        )}
      </div>
    </div>
  );
}
