"use client";

import { motion } from "framer-motion";

interface MaxWattsBadgeProps {
  maxWatts: number;
  basePower: number;
}

export function MaxWattsBadge({ maxWatts }: MaxWattsBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6 shadow-xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-4">
        <div className="text-gray-300 text-lg font-bold">Max Capacity:</div>
        <div className="text-5xl font-black text-amber-400 font-mono">
          {maxWatts.toLocaleString()}
          <span className="text-2xl ml-2 text-amber-500">W</span>
        </div>
      </div>
    </motion.div>
  );
}
