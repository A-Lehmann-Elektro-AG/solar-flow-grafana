export const UNIT_TO_WATTS: Record<'W' | 'kW' | 'MW', number> = {
    W: 1,
    kW: 1000,
    MW: 1000000,
};

export interface FlowData {
    pv: number;
    grid: number;
    load: number;
    additionalSource: number;
    additionalSourceSOC: number;
}
