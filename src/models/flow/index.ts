import {PointPosition} from "../../components/energyFlow";

export interface FlowData {
 pv: number;
 grid: number;
 load: number;
 extraSource: number;
}

export interface CustomXarrowProps {
 start: PointPosition;
 end: PointPosition;
 className?: string;
 strokeWidth?: number;
 linesColor?: string;
}
