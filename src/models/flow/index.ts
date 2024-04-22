import {PointPosition} from "../../components/energyFlow";

export enum FlowType {
 overProduction = "overProduction",
 noProduction = "noProduction",
 overConsumption = "overConsumption",
 undefined = "undefined"
}

export interface FlowData {
 pv: number;
 grid: number;
 load: number;
 flowType: FlowType;
}

export interface CustomXarrowProps {
 start: PointPosition;
 end: PointPosition;
 className?: string;
 strokeWidth?: number;
 linesColor?: string;
}
