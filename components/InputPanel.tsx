"use client";

interface InputPanelProps {
  batteryWatts: number;
  batterySeconds: number;
  requiredWatts: number;
  onBatteryWattsChange: (value: number) => void;
  onBatterySecondsChange: (value: number) => void;
  onRequiredWattsChange: (value: number) => void;
  warnings: string[];
  adjustedRequired: number;
}

export function InputPanel({
  batteryWatts,
  batterySeconds,
  requiredWatts,
  onBatteryWattsChange,
  onBatterySecondsChange,
  onRequiredWattsChange,
  warnings,
  adjustedRequired,
}: InputPanelProps) {
  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-xl backdrop-blur-sm">
      <h2 className="text-lg font-bold text-amber-400 mb-4">Inputs</h2>

      {/* All inputs in one row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Battery Output */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Battery Output
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={batteryWatts}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                onBatteryWattsChange(val === "" ? 0 : Number(val));
              }}
              className="w-full px-3 py-2 pr-10 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold pointer-events-none">
              W
            </div>
          </div>
        </div>

        {/* Battery Duration */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Battery Duration
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={batterySeconds}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                onBatterySecondsChange(val === "" ? 0 : Number(val));
              }}
              className="w-full px-3 py-2 pr-10 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold pointer-events-none">
              sec
            </div>
          </div>
        </div>

        {/* Required Watts */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Required Watts
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={requiredWatts}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                onRequiredWattsChange(val === "" ? 0 : Number(val));
              }}
              className="w-full px-3 py-2 pr-10 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold pointer-events-none">
              W
            </div>
          </div>
        </div>

        {/* Adjusted value display */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            After PAC (−200W)
          </label>
          <div className="px-3 py-2 bg-gray-900 border border-amber-600/50 rounded-lg">
            <div className="text-amber-400 font-mono text-lg font-bold text-center">
              {adjustedRequired}W
            </div>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-700">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className="px-3 py-2 bg-yellow-900/30 border border-yellow-700/50 rounded text-yellow-400 text-xs"
            >
              ⚠️ {warning}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
