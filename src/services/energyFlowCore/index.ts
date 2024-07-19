import {FlowData, FlowType} from "../../models/flow";

export class EnergyFlowCore {
  private static pv = 0;
  private static grid = 0;

  private static load() {
    return this.pv + this.grid
  };

  private static setFlowData(flowData: FlowData) {
    this.pv = flowData.pv;
    this.grid = flowData.grid;
  }

  public static async getNewFlowData(pv: number, grid: number): Promise<FlowData> {
    const data: FlowData = {
      pv: pv,
      grid: grid,
      load: 0,
      flowType: FlowType.undefined
    }
    this.setFlowData(data)

    return {
      pv: Number((this.pv / 1000).toFixed(2)),
      grid: Number((this.grid / 1000).toFixed(2)),
      load: Number((this.load() / 1000).toFixed(2)),
      flowType: this.calculateFlowType()
    };
  }

  private static calculateFlowType(): FlowType {
    if (this.pv > this.load()) {
      return FlowType.overProduction;
    }
    if (this.pv <= 0) {
      return FlowType.noProduction;
    }
    if (this.pv < this.load()) {
      return FlowType.overConsumption;
    }

    return FlowType.undefined;
  }
}
