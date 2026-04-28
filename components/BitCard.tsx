"use client";

interface BitCardProps {
  isActive: boolean;
  bitPosition: number;
  wattValue: number;
}

export function BitCard({ isActive, bitPosition, wattValue }: BitCardProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-gray-400 font-mono text-[10px]">
        2<sup>{bitPosition}</sup>
      </div>

      <div
        className={`
          w-12 h-12 rounded flex items-center justify-center
          ${
            isActive
              ? "bg-amber-500"
              : "bg-gray-200 border border-gray-300"
          }
        `}
      >
        <span
          className={`font-bold text-xl ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {isActive ? "1" : "0"}
        </span>
      </div>

      <div
        className={`text-[8px] font-bold uppercase ${
          isActive ? "text-amber-600" : "text-gray-400"
        }`}
      >
        {isActive ? "BRIDGE" : "CONV"}
      </div>

      <div
        className={`text-[8px] font-mono ${
          isActive ? "text-amber-600" : "text-gray-400"
        }`}
      >
        {wattValue.toLocaleString()}W
      </div>
    </div>
  );
}
