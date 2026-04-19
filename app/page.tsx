"use client";

import { useState } from "react";
import { usePWMCalculator } from "@/hooks/usePWMCalculator";
import { InputPanel } from "@/components/InputPanel";
import { MaxWattsBadge } from "@/components/MaxWattsBadge";
import { BitDisplay } from "@/components/BitDisplay";

export default function Home() {
  const [batteryWatts, setBatteryWatts] = useState(1600);
  const [batterySeconds, setBatterySeconds] = useState(40);
  const [requiredWatts, setRequiredWatts] = useState(2235);

  const {
    basePower,
    numBits,
    maxWatts,
    adjustedRequired,
    bits,
    errors,
    warnings,
  } = usePWMCalculator({
    batteryWatts,
    batterySeconds,
    requiredWatts,
  });

  const hasError = errors.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-500/20">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold text-amber-400 text-center">
            PWM Power System Calculator
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-8 py-8 max-w-[1600px]">
        {/* Top: Inputs in one row */}
        <div className="mb-8">
          <InputPanel
            batteryWatts={batteryWatts}
            batterySeconds={batterySeconds}
            requiredWatts={requiredWatts}
            onBatteryWattsChange={setBatteryWatts}
            onBatterySecondsChange={setBatterySeconds}
            onRequiredWattsChange={setRequiredWatts}
            warnings={warnings}
            adjustedRequired={adjustedRequired}
          />
        </div>

        {/* Max Watts Badge */}
        <div className="mb-8">
          <MaxWattsBadge maxWatts={maxWatts} basePower={basePower} />
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-8">
            {errors.map((error, index) => (
              <div
                key={index}
                className="px-6 py-4 bg-red-500/20 border-l-4 border-red-500 rounded-lg text-red-300 font-semibold text-lg"
              >
                ⚠️ {error}
              </div>
            ))}
          </div>
        )}

        {/* Bit Display - Full width */}
        <div>
          <BitDisplay
            bits={bits}
            numBits={numBits}
            hasError={hasError}
            adjustedRequired={adjustedRequired}
            basePower={basePower}
          />
        </div>
      </main>
    </div>
  );
}
