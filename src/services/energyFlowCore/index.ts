import {FlowData, FlowType} from "../../models/flow";
import DataFetcher from "./dataFetcher";

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

  public static async getNewFlowData(): Promise<FlowData> {
    const data = await DataFetcher.fetchNewFlowData()
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
