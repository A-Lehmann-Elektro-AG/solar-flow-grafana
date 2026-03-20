import { FlowData, UNIT_TO_WATTS } from '../../models/flow';

export class EnergyFlowCore {
  public static calculateFlowData(
    pv: number,
    grid: number,
    additionalSource: number,
    additionalSourceSOC: number,
    unit: 'W' | 'kW' | 'MW',
  ): FlowData {
    const unitFactor = UNIT_TO_WATTS[unit];
    const load = pv + grid + (additionalSource || 0);

    return {
      pv: Number((pv / unitFactor).toFixed(3)),
      grid: Number((grid / unitFactor).toFixed(3)),
      load: Number((load / unitFactor).toFixed(3)),
      additionalSource: Number((additionalSource / unitFactor).toFixed(3)),
      additionalSourceSOC: Number(additionalSourceSOC.toFixed(0)),
    };
  }
}
