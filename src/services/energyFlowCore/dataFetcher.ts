import {FlowType, FlowData} from "../../models/flow";

export class DataFetcher {
  public static async fetchNewFlowData(): Promise<FlowData> {
    return {
      pv: 1000,
      grid: 500,
      load: 1500,
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
