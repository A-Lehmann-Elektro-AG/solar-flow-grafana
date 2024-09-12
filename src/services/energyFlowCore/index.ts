import {FlowData} from "../../models/flow";

export class EnergyFlowCore {
  public static async calculateNewFlowData(pv: number, grid: number, additionalSource: number, unit: 'W' | 'kW' | 'MW'): Promise<FlowData> {
    const unitFactor
      = unit === 'W' ? 1
      : unit === 'kW' ? 1000
      : unit === 'MW' ? 1000000
      : 1;

    const data: FlowData = {
      pv: Number((pv / unitFactor).toFixed(3)),
      grid: Number((grid / unitFactor).toFixed(3)),
      load: Number(((pv + grid + (additionalSource !== 0 ? additionalSource : 0)) / unitFactor).toFixed(3)),
      additionalSource: Number((additionalSource / unitFactor).toFixed(3)),
    };

    return data;
  }
}
