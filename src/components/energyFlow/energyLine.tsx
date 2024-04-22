import React from "react";
import {PointPosition} from "./index";
import {CustomXarrowProps, FlowType} from "../../models/flow";

interface EnergyLinesProps {
 flow: FlowType;
 pvPoint: PointPosition;
 loadPoint: PointPosition;
 gridPoint: PointPosition;
 linesColor: string;
}


export const EnergyLines: React.FC<EnergyLinesProps> = ({flow, pvPoint, loadPoint, gridPoint, linesColor}) => {
 switch (flow) {
  case FlowType.overConsumption:
   return (
    <>
     {EmptyLines(pvPoint, loadPoint, gridPoint)}

     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} linesColor={linesColor} className="animated-line"/>
     <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} linesColor={linesColor} className="animated-line-reverse"/>
     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} linesColor={linesColor} className="animated-line-reverse"/>

    </>
   );
  case FlowType.overProduction:
   return (
    <>
     {EmptyLines(pvPoint, loadPoint, gridPoint)}

     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} linesColor={linesColor} className="animated-line-reverse"/>
     <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} linesColor={linesColor} className="animated-line-reverse"/>
     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} linesColor={linesColor} className="animated-line-reverse"/>
    </>
   );
  case FlowType.noProduction:
   return (
    <>
     {EmptyLines(pvPoint, loadPoint, gridPoint)}

     <EnergyLine start={loadPoint} end={gridPoint} className="animated-line"/>
    </>
   );
  default:
   return null;
 }
};


const EnergyLine: React.FC<CustomXarrowProps> = ({start, end, className, linesColor = "rgb(104, 193, 255)"}) => {
  return (
  <line
    x1={start.x} y1={start.y}
    x2={end.x} y2={end.y}
    stroke={linesColor} strokeWidth="8"
    style={{
      filter: "drop-shadow(0px 0px 2px " + linesColor + ")",
    }}
    className={className || ""}
  />
 );
};

const EmptyLine: React.FC<CustomXarrowProps> = ({start, end, className, linesColor = "rgb(104, 193, 255)"}) => {
 const color = "rgba(52,52,52, 0.7)";
 return (
  <line
   x1={start.x} y1={start.y}
   x2={end.x} y2={end.y}
   stroke={color} strokeWidth="4"
   style={{
     filter: "drop-shadow(0px 0px 0.8px " + linesColor + ")",
   }}
   className={className || ""}
  />
 );
}

const EmptyLines = (pvPoint: PointPosition, loadPoint: PointPosition, gridPoint: PointPosition) => {
 return (
  <>
   <EmptyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}}/>
   <EmptyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint}/>
   <EmptyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint}/>
  </>
 )
}
