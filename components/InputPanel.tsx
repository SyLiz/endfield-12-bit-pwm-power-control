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
  maxWatts: number;
  errors: string[];
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
  maxWatts,
  errors,
}: InputPanelProps) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 mb-2">
        <input
          type="number"
          value={batteryWatts || ""}
          min="0"
          placeholder="0"
          onChange={(e) =>
            onBatteryWattsChange(
              e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0
            )
          }
        />
        <span>Battery Output (W)</span>
      </div>
      <br />

      <div className="inline-flex items-center gap-2 mb-2">
        <input
          type="number"
          value={batterySeconds || ""}
          min="0"
          placeholder="0"
          onChange={(e) =>
            onBatterySecondsChange(
              e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0
            )
          }
        />
        <span>Battery Duration (sec)</span>
      </div>
      <br />

      <div className="inline-flex items-center gap-2 mb-0">
        <input
          type="number"
          value={requiredWatts || ""}
          min="0"
          placeholder="0"
          onChange={(e) =>
            onRequiredWattsChange(
              e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0
            )
          }
        />
        <span>Required Watts (W)</span>
      </div>
      {errors.map((error, i) => (
        <div key={i} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
      <br />

      <div className="inline-flex items-center gap-4 mb-1">
        <span>
          After PAC (−200W):{" "}
          <strong className="font-mono">{adjustedRequired}W</strong>
        </span>
        <span>
          Max Capacity:{" "}
          <strong className="font-mono">{maxWatts.toLocaleString()}W</strong>
        </span>
      </div>

      {warnings.length > 0 &&
        warnings.map((warning, index) => (
          <div key={index} className="text-yellow-600 text-sm">
            {warning}
          </div>
        ))}
    </div>
  );
}
