"use client";

import { useState } from "react";
import { usePWMCalculator } from "@/hooks/usePWMCalculator";
import { InputPanel } from "@/components/InputPanel";
import { BitDisplay } from "@/components/BitDisplay";

export default function Home() {
  const [batteryWatts, setBatteryWatts] = useState(1600);
  const [batterySeconds, setBatterySeconds] = useState(40);
  const [requiredWatts, setRequiredWatts] = useState(2235);
  const [topView, setTopView] = useState(false);

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
  const suffix = topView ? "3d" : "2d";

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">
        12 Bit PWM Power Control
      </h1>

      {/* Inputs on left, BitDisplay on right */}
      <div className="flex items-start gap-8 mb-4">
        <InputPanel
          batteryWatts={batteryWatts}
          batterySeconds={batterySeconds}
          requiredWatts={requiredWatts}
          onBatteryWattsChange={setBatteryWatts}
          onBatterySecondsChange={setBatterySeconds}
          onRequiredWattsChange={setRequiredWatts}
          warnings={warnings}
          adjustedRequired={adjustedRequired}
          maxWatts={maxWatts}
          errors={errors}
        />

        <BitDisplay
          bits={bits}
          numBits={numBits}
          hasError={hasError}
          adjustedRequired={adjustedRequired}
          basePower={basePower}
        />
      </div>

      <div className="mb-2">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={topView}
            onChange={(e) => setTopView(e.target.checked)}
            className="mr-2"
          />
          Enter Top View 3D
        </label>
      </div>

      {/* Blueprint visual with overlay */}
      <div className="relative" style={{ width: 1600, height: 966 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${suffix}.png`}
          alt="View"
          className="absolute"
          style={{ width: 1600, height: 966 }}
        />
        <div
          className="absolute flex"
          style={{ top: 194, left: 233 }}
        >
          {bits.map((bit, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`/images/${bit ? "beltBridge" : "converger"}${suffix}.png`}
              alt={bit ? "1" : "0"}
              style={{
                width: 59,
                height: 59,
                marginRight: i === 4 ? 0 : 1,
              }}
            />
          ))}
        </div>
      </div>

      <footer className="mt-4 text-sm text-[#808080]">
        Copyright &copy; 2026. All Rights Reserved.
      </footer>
    </div>
  );
}
