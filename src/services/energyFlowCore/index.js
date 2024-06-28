import { __awaiter } from "tslib";
import { FlowType } from "../../models/flow";
export class EnergyFlowCore {
    static load() {
        return this.pv + this.grid;
    }
    ;
    static setFlowData(flowData) {
        this.pv = flowData.pv;
        this.grid = flowData.grid;
    }
    static getNewFlowData(pv, grid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                pv: pv,
                grid: grid,
                load: 0,
                flowType: FlowType.undefined
            };
            this.setFlowData(data);
            return {
                pv: Number((this.pv / 1000).toFixed(2)),
                grid: Number((this.grid / 1000).toFixed(2)),
                load: Number((this.load() / 1000).toFixed(2)),
                flowType: this.calculateFlowType()
            };
        });
    }
    static calculateFlowType() {
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
EnergyFlowCore.pv = 0;
EnergyFlowCore.grid = 0;
//# sourceMappingURL=index.js.map