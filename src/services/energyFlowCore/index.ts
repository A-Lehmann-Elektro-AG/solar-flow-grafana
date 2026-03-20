import { FlowData, AdditionalSourceFlow, MeasurementUnit, UNIT_TO_WATTS } from '../../models/flow';

export interface RawAdditionalSource {
  value: number;
  soc: number;
}

export class EnergyFlowCore {
  public static calculateFlowData(
    pv: number,
    grid: number,
    sources: RawAdditionalSource[],
    unit: MeasurementUnit,
    measuredLoad?: number,
  ): FlowData {
    const unitFactor = UNIT_TO_WATTS[unit];
    const sourcesSum = sources.reduce((sum, s) => sum + (s.value || 0), 0);
    const load = measuredLoad ?? (pv + grid + sourcesSum);

    const additionalSources: AdditionalSourceFlow[] = sources.map(s => ({
      value: Number((s.value / unitFactor).toFixed(3)),
      soc: Number(s.soc.toFixed(0)),
    }));

    return {
      pv: Number((pv / unitFactor).toFixed(3)),
      grid: Number((grid / unitFactor).toFixed(3)),
      load: Number((load / unitFactor).toFixed(3)),
      additionalSources,
    };
  }
}
