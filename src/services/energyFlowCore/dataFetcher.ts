import {FlowData, FlowType} from "../../models/flow";

export class DataFetcher {
  public static async fetchNewFlowData(): Promise<FlowData> {
    return {
      pv: 1500,
      grid: -500,
      load: 1000,
      flowType: FlowType.overConsumption
    };
  }

  public static async fetchDailyData(): Promise<number[]> {
    return [0, 0, 0, 0, 0, 0, 0];
  }

  public static async fetchAutarkyData(): Promise<number> {
    // dummy data
    return 0;
  }

  public static async fetchEfficiencyData(): Promise<number> {
    // dummy data
    return 0;
  }
}


export default DataFetcher;
