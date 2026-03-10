"use client";

import { useEffect, useRef, useState } from "react";
import { fetchRates } from "@/lib/api";

interface TickerItem {
  label: string;
  rate: number;
  currency: string;
  type: "BUY" | "SELL";
}

const PAIRS: { token: string; currency: string; type: "BUY" | "SELL" }[] = [
  { token: "STX",   currency: "NGN", type: "BUY"  },
  { token: "STX",   currency: "NGN", type: "SELL" },
  { token: "USDCx", currency: "NGN", type: "BUY"  },
  { token: "STX",   currency: "GHS", type: "BUY"  },
  { token: "STX",   currency: "KES", type: "BUY"  },
  { token: "STX",   currency: "KES", type: "SELL" },
  { token: "BTC",   currency: "NGN", type: "BUY"  },
  { token: "USDCx", currency: "GHS", type: "BUY"  },
];

const FLAG: Record<string, string> = {
  NGN: "🇳🇬",
  GHS: "🇬🇭",
  KES: "🇰🇪",
};

function formatRate(rate: number): string {
  if (rate >= 1000) return rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return rate.toFixed(2);
}

export default function RatesTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled(
        PAIRS.map(async (p) => {
          const quote = await fetchRates(p.token, 1, p.currency);
          // For SELL use a slightly lower rate (simulated spread)
          const rate = p.type === "SELL" ? quote.flwRate * 0.997 : quote.flwRate;
          return {
            label: `${p.token}`,
            rate,
            currency: p.currency,
            type: p.type,
          } satisfies TickerItem;
        })
      );
      const settled = results
        .filter((r): r is PromiseFulfilledResult<TickerItem> => r.status === "fulfilled")
        .map((r) => r.value);
      if (settled.length > 0) setItems(settled);
    }

    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  if (items.length === 0) return null;

  // Duplicate items so the loop animation is seamless
  const doubled = [...items, ...items];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f0f0f] border-t border-white/[0.07] overflow-hidden h-9 flex items-center select-none">
      <div
        ref={trackRef}
        className="flex items-center animate-ticker whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-5 text-xs">
            <span className="text-gray-500">{FLAG[item.currency]}</span>
            <span className="text-gray-400 font-medium">{item.currency}</span>
            <span
              className={`font-semibold text-[11px] tracking-wide ${
                item.type === "BUY" ? "text-emerald-400" : "text-[#f97316]"
              }`}
            >
              {item.type}
            </span>
            <span className="text-white font-mono font-medium">
              {formatRate(item.rate)}
            </span>
            <span className="text-gray-600 text-[10px] ml-0.5">{item.label}</span>
            <span className="text-white/10 mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
