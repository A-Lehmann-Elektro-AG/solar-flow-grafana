import {FlowData} from "../../models/flow";

export class EnergyFlowCore {
  public static async calculateNewFlowData(pv: number, grid: number, additionalSource: number, unit: 'W' | 'kW' | 'MW' = 'kW'): Promise<FlowData> {
    const unitFactor = unit === 'MW' ? 1000000 : unit === 'kW' ? 1000 : 1;

    const data: FlowData = {
      pv: Number((pv / unitFactor).toFixed(2)),
      grid: Number((grid / unitFactor).toFixed(2)),
      load: Number(((pv + grid + (additionalSource !== 0 ? additionalSource : 0)) / unitFactor).toFixed(2)),
      additionalSource: Number((additionalSource / unitFactor).toFixed(2)),
    };

    return data;
  }
}
