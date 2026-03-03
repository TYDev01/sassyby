"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Currency = "USD" | "EUR" | "GBP" | "NGN" | "KES";

interface ReceiveCardProps {
  /** Calculated receive amount (controlled by parent) */
  amount: number;
  /** Minimum receivable amount */
  minimum: number;
  /** Selected currency */
  currency: Currency;
  /** Notifies parent when currency changes */
  onCurrencyChange: (currency: Currency) => void;
}

const CURRENCY_COLORS: Record<Currency, string> = {
  USD: "#06b6d4", // teal
  EUR: "#3b82f6", // blue
  GBP: "#8b5cf6", // violet
  NGN: "#22c55e", // green
  KES: "#f59e0b", // amber
};

const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "NGN", "KES"];

// ─── Currency Dot ─────────────────────────────────────────────────────────────

function CurrencyDot({ currency }: { currency: Currency }) {
  return (
    <span
      className="w-4 h-4 rounded-full shrink-0 transition-colors duration-300"
      style={{ backgroundColor: CURRENCY_COLORS[currency] }}
    />
  );
}

// ─── Currency Dropdown ────────────────────────────────────────────────────────

function CurrencyDropdown({
  selected,
  onSelect,
}: {
  selected: Currency;
  onSelect: (c: Currency) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select currency"
        aria-expanded={open}
        className="
          flex items-center gap-2 bg-[#1a1a1a] border border-white/10
          rounded-full px-3 py-1.5 focus:outline-none
          hover:border-white/20 transition-colors duration-200
        "
      >
        <CurrencyDot currency={selected} />
        <span className="text-white text-sm font-semibold tracking-wide">
          {selected}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Currency options"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="
              absolute right-0 top-full mt-2 z-50
              bg-[#1a1a1a] border border-white/10 rounded-xl
              py-1 min-w-[110px] shadow-xl
            "
          >
            {CURRENCIES.map((c) => (
              <li key={c}>
                <button
                  role="option"
                  aria-selected={c === selected}
                  onClick={() => {
                    onSelect(c);
                    setOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm
                    transition-colors duration-150
                    ${
                      c === selected
                        ? "text-white bg-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <CurrencyDot currency={c} />
                  {c}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Amount Display ───────────────────────────────────────────────────────────

function AmountDisplay({ amount }: { amount: number }) {
  const formatted = amount.toFixed(2);

  return (
    <motion.p
      key={formatted}
      initial={{ opacity: 0.4, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="text-white text-2xl font-light"
    >
      {formatted}
    </motion.p>
  );
}

// ─── Minimum Label ────────────────────────────────────────────────────────────

function MinimumLabel({
  minimum,
  currency,
}: {
  minimum: number;
  currency: Currency;
}) {
  return (
    <p className="text-gray-500 text-sm mt-1">
      Min:{" "}
      <span className="text-gray-400">
        {minimum.toFixed(2)} {currency}
      </span>
    </p>
  );
}

// ─── ReceiveCard ──────────────────────────────────────────────────────────────

export default function ReceiveCard({
  amount,
  minimum,
  currency,
  onCurrencyChange,
}: ReceiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      className="
        w-full bg-[#111111] border border-white/[0.07]
        rounded-2xl px-5 py-4
      "
    >
      {/* Header */}
      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">
        You&apos;ll receive
      </p>

      {/* Amount row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <AmountDisplay amount={amount} />
          <MinimumLabel minimum={minimum} currency={currency} />
        </div>

        {/* Currency selector */}
        <div className="pt-1">
          <CurrencyDropdown selected={currency} onSelect={onCurrencyChange} />
        </div>
      </div>
    </motion.div>
  );
}
