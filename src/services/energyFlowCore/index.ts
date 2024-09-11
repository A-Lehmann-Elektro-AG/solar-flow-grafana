import {FlowData} from "../../models/flow";

export class EnergyFlowCore {
  public static async calculateNewFlowData(pv: number, grid: number): Promise<FlowData> {
    const data: FlowData = {
      pv: Number((pv / 1000).toFixed(2)),
      grid: Number((grid / 1000).toFixed(2)),
      load: Number((pv + grid / 1000).toFixed(2)),
    };

    return data;
  }
}
