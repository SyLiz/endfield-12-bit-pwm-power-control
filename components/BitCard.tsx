"use client";

import { motion } from "framer-motion";

interface BitCardProps {
  isActive: boolean;
  bitPosition: number;
  wattValue: number;
}

export function BitCard({ isActive, bitPosition, wattValue }: BitCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-1.5"
    >
      {/* Bit position label */}
      <div className="text-gray-400 font-mono text-[10px] font-semibold">
        2<sup>{bitPosition}</sup>
      </div>

      {/* Main card - smaller to fit 12 in a row */}
      <motion.div
        key={isActive ? "active" : "inactive"}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
        className={`
          w-16 h-24 rounded-lg
          flex flex-col items-center justify-center gap-1.5
          transition-all duration-200
          ${
            isActive
              ? "bg-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              : "bg-gray-700 border-2 border-gray-600"
          }
        `}
      >
        {/* Bit value */}
        <div
          className={`font-black text-4xl ${
            isActive ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {isActive ? "1" : "0"}
        </div>

        {/* Label */}
        <div
          className={`
            text-[9px] font-black uppercase tracking-tight px-2 py-0.5 rounded-full
            ${
              isActive
                ? "bg-gray-900 text-amber-400"
                : "bg-gray-800 text-gray-500"
            }
          `}
        >
          {isActive ? "BRIDGE" : "CONV"}
        </div>
      </motion.div>

      {/* Watt value */}
      <div
        className={`text-[10px] font-bold ${
          isActive ? "text-amber-400" : "text-gray-600"
        }`}
      >
        {wattValue.toLocaleString()}W
      </div>
    </motion.div>
  );
}
