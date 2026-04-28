"use client";

import { BitCard } from "./BitCard";

interface BitDisplayProps {
  bits: boolean[];
  numBits: number;
  hasError: boolean;
  adjustedRequired: number;
  basePower: number;
}

export function BitDisplay({
  bits,
  numBits,
  hasError,
  basePower,
}: BitDisplayProps) {
  const unitValue = basePower / Math.pow(2, numBits);
  const wattValues = bits.map((_, index) => {
    const bitPosition = numBits - 1 - index;
    return unitValue * Math.pow(2, bitPosition);
  });

  const totalProduced = bits.reduce((sum, bit, index) => {
    return sum + (bit ? wattValues[index] : 0);
  }, 0);

  const groups: number[][] = [];
  for (let i = 0; i < bits.length; i += 4) {
    groups.push(
      Array.from({ length: Math.min(4, bits.length - i) }, (_, j) => i + j)
    );
  }

  return (
    <div>
      <div className="font-mono text-lg tracking-wider mb-2">
        {groups.map((group, idx) => (
          <span key={idx}>
            {group.map((i) => (
              <span
                key={i}
                className={bits[i] ? "text-amber-600" : "text-gray-300"}
              >
                {bits[i] ? "1" : "0"}
              </span>
            ))}
            {idx < groups.length - 1 && (
              <span className="text-gray-300 mx-1">|</span>
            )}
          </span>
        ))}
        <span className="text-gray-500 text-sm ml-3">
          Total: {totalProduced.toLocaleString()}W
        </span>
      </div>

      <div
        className={`flex gap-0.5 mb-2 ${hasError ? "opacity-30" : ""}`}
      >
        {bits.map((bit, index) => (
          <BitCard
            key={index}
            isActive={bit}
            bitPosition={numBits - 1 - index}
            wattValue={wattValues[index]}
          />
        ))}
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-amber-500"></div>
          <span className="text-gray-500">BRIDGE (1)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-gray-200 border border-gray-300"></div>
          <span className="text-gray-500">CONVERGER (0)</span>
        </div>
      </div>
    </div>
  );
}
