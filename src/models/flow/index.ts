export type MeasurementUnit = 'W' | 'kW' | 'MW' | 'auto';

// 'auto' keeps values as-is in W (no conversion); display is handled by formatEnergyValue
export const UNIT_TO_WATTS: Record<MeasurementUnit, number> = {
    W: 1,
    kW: 1000,
    MW: 1000000,
    auto: 1,
};

export function formatEnergyValue(value: number, unit: MeasurementUnit): { displayValue: string; displayUnit: string } {
    if (unit !== 'auto') {
        return { displayValue: String(value), displayUnit: unit };
    }
    const absValue = Math.abs(value);
    if (absValue >= 1000) {
        return { displayValue: (value / 1000).toFixed(2), displayUnit: 'kW' };
    }
    return { displayValue: String(value), displayUnit: 'W' };
}

export interface AdditionalSourceFlow {
    value: number;
    soc: number;
}

export interface FlowData {
    pv: number;
    grid: number;
    load: number;
    additionalSources: AdditionalSourceFlow[];
}
