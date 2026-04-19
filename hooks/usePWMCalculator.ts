import { useMemo } from "react";

export interface PWMCalculatorInputs {
  batteryWatts: number;
  batterySeconds: number;
  requiredWatts: number;
}

export interface PWMCalculatorOutputs {
  totalUnits: number;
  basePower: number;
  numBits: number;
  maxWatts: number;
  adjustedRequired: number;
  bits: boolean[];
  errors: string[];
  warnings: string[];
}

export function usePWMCalculator({
  batteryWatts,
  batterySeconds,
  requiredWatts,
}: PWMCalculatorInputs): PWMCalculatorOutputs {
  return useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Step 1: Calculate total units (Blue Section - initial split)
    const totalUnits = (batteryWatts * batterySeconds) / 2;

    // Step 2: Calculate base power (Blue Section - split to ~4000, then feedback loop to reach power of 2)
    const rawPower = totalUnits / 8;
    // Round to nearest power of 2 (this simulates the Blue Section feedback loop)
    const basePower = Math.pow(2, Math.ceil(Math.log2(rawPower)));

    // Step 3: Always use 12 bits (2^11 down to 2^0) for Red Section
    const numBits = 12;

    // Step 4: Calculate max watts (Red Section can produce base_power - 1)
    // For 1600W × 40s: base_power = 4096, max = 4095
    // For 3200W × 40s: base_power = 8192, max = 8191
    const maxWatts = basePower - 1;

    // Step 5: Adjust required watts (subtract PAC cost)
    const adjustedRequired = requiredWatts - 200;

    // Validation
    if (adjustedRequired < 0) {
      errors.push(
        "Required watts must be at least 200W (after PAC subtraction)"
      );
    }

    if (adjustedRequired > maxWatts) {
      errors.push(`Exceeds maximum! Max = ${maxWatts.toLocaleString()} W`);
    }

    if (batterySeconds % 2 !== 0) {
      warnings.push("Duration should be a multiple of 2 seconds");
    }

    // Check if base_power is a power of 2
    if (basePower > 0 && (basePower & (basePower - 1)) !== 0) {
      warnings.push("Non-power-of-2 base may cause imprecise results");
    }

    // Step 6: Calculate the watt value per bit unit
    // Each bit position represents: (base_power / 2^12) * 2^position
    // Simplified: base_power * 2^(position - 12)
    const unitValue = basePower / Math.pow(2, numBits);

    // Step 7: Convert adjusted required to binary using scaled bit values
    const bits: boolean[] = [];
    let remaining = Math.max(0, Math.min(adjustedRequired, maxWatts));

    for (let i = numBits - 1; i >= 0; i--) {
      const bitWattValue = unitValue * Math.pow(2, i);
      if (remaining >= bitWattValue) {
        bits.push(true);
        remaining -= bitWattValue;
      } else {
        bits.push(false);
      }
    }

    return {
      totalUnits,
      basePower,
      numBits,
      maxWatts,
      adjustedRequired,
      bits,
      errors,
      warnings,
    };
  }, [batteryWatts, batterySeconds, requiredWatts]);
}
