import {FlowData} from "../../models/flow";

export class EnergyFlowCore {
  public static async calculateNewFlowData(pv: number, grid: number, extraSource: number, unit: 'W' | 'kW' | 'MW' = 'kW'): Promise<FlowData> {
    const unitFactor = unit === 'MW' ? 1000000 : unit === 'kW' ? 1000 : 1;

    const data: FlowData = {
      pv: Number((pv / unitFactor).toFixed(2)),
      grid: Number((grid / unitFactor).toFixed(2)),
      load: Number(((pv + grid + (extraSource !== 0 ? extraSource : 0)) / unitFactor).toFixed(2)),
      extraSource: Number((extraSource / unitFactor).toFixed(2)),
    };

    return data;
  }
}