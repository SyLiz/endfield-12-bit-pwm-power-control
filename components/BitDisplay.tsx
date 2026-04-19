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
  adjustedRequired,
  basePower,
}: BitDisplayProps) {
  // Calculate watt values for each bit position (scaled by base_power)
  // Each bit represents: (base_power / 2^12) * 2^position
  const unitValue = basePower / Math.pow(2, numBits);
  const wattValues = bits.map((_, index) => {
    const bitPosition = numBits - 1 - index;
    return unitValue * Math.pow(2, bitPosition);
  });

  // Calculate total from active bits
  const totalProduced = bits.reduce((sum, bit, index) => {
    return sum + (bit ? wattValues[index] : 0);
  }, 0);

  // Group into 4s for binary display
  const groups: number[][] = [];
  for (let i = 0; i < bits.length; i += 4) {
    groups.push(
      Array.from({ length: Math.min(4, bits.length - i) }, (_, j) => i + j)
    );
  }

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-amber-400 mb-4">
        Power Slots (12-bit: 2<sup>11</sup> to 2<sup>0</sup>)
      </h2>

      {/* Binary string */}
      <div className="text-center mb-6 bg-gray-900/80 rounded-xl p-4 border border-gray-700">
        <div className="font-mono text-3xl font-black tracking-wider">
          {groups.map((group, idx) => (
            <span key={idx}>
              <span>
                {group.map((i) => (
                  <span
                    key={i}
                    className={bits[i] ? "text-amber-400" : "text-gray-600"}
                  >
                    {bits[i] ? "1" : "0"}
                  </span>
                ))}
              </span>
              {idx < groups.length - 1 && (
                <span className="text-gray-700 mx-2">|</span>
              )}
            </span>
          ))}
        </div>
        <div className="text-gray-400 text-sm mt-2 font-semibold">
          Total: {totalProduced.toLocaleString()}W
        </div>
      </div>

      {/* 12 bit cards - 1 row by default, wraps to 4 per row if needed */}
      <div
        className={`flex flex-wrap justify-center gap-3 mb-6 ${
          hasError ? "opacity-30" : ""
        }`}
        style={{ maxWidth: "100%" }}
      >
        {bits.map((bit, index) => {
          const bitPosition = numBits - 1 - index;
          return (
            <div key={index} className="flex-shrink-0">
              <BitCard
                isActive={bit}
                bitPosition={bitPosition}
                wattValue={wattValues[index]}
              />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-6 border-t border-gray-700">
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
            <div>
              <div className="text-white font-bold text-sm">BRIDGE</div>
              <div className="text-gray-400 text-xs">Active (1)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-700 border-2 border-gray-600"></div>
            <div>
              <div className="text-white font-bold text-sm">CONVERGER</div>
              <div className="text-gray-400 text-xs">Inactive (0)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
