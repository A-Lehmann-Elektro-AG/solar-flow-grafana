import {FlowData, FlowType} from "../../models/flow";

export class EnergyFlowCore {
  public static async calculateNewFlowData(pv: number, grid: number): Promise<FlowData> {
    const data: FlowData = {
      pv: Number((pv / 1000).toFixed(2)),
      grid: Number((grid / 1000).toFixed(2)),
      load: Number((pv + grid / 1000).toFixed(2)),
      flowType: FlowType.undefined,
    };
    data.flowType = this.calculateFlowType(data);

    return data;
  }

  private static calculateFlowType(flowData: FlowData): FlowType {
    if (flowData.pv > flowData.load) {
      return FlowType.overProduction;
    }
    if (flowData.pv <= 0) {
      return FlowType.noProduction;
    }
    if (flowData.pv < flowData.load) {
      return FlowType.overConsumption;
    }

    return FlowType.undefined;
  }
}
