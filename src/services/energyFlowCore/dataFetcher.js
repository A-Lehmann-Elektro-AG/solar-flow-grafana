import { __awaiter } from "tslib";
import { FlowType } from "../../models/flow";
export class DataFetcher {
    static fetchNewFlowData() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                pv: 1500,
                grid: -500,
                load: 1000,
                flowType: FlowType.overConsumption
            };
        });
    }
    static fetchDailyData() {
        return __awaiter(this, void 0, void 0, function* () {
            return [0, 0, 0, 0, 0, 0, 0];
        });
    }
    static fetchAutarkyData() {
        return __awaiter(this, void 0, void 0, function* () {
            // dummy data
            return 0;
        });
    }
    static fetchEfficiencyData() {
        return __awaiter(this, void 0, void 0, function* () {
            // dummy data
            return 0;
        });
    }
}
export default DataFetcher;
//# sourceMappingURL=dataFetcher.js.map