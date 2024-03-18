import React from "react";
import {PointPosition} from "./index";
import {FlowType, CustomXarrowProps} from "../../models/flow";

interface EnergyLinesProps {
 flow: FlowType;
 pvPoint: PointPosition;
 loadPoint: PointPosition;
 gridPoint: PointPosition;
}

export const EnergyLines: React.FC<EnergyLinesProps> = ({flow, pvPoint, loadPoint, gridPoint}) => {

 switch (flow) {
  case FlowType.overConsumption:
   return (
    <>
     {EmptyLines(pvPoint, loadPoint, gridPoint)}

     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} className="animated-line"/>
     <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} className="animated-line-reverse"/>
     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} className="animated-line-reverse"/>

    </>
   );
  case FlowType.overProduction:
   return (
    <>
     {EmptyLines(pvPoint, loadPoint, gridPoint)}

     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} className="animated-line-reverse"/>
     <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} className="animated-line-reverse"/>
     <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} className="animated-line-reverse"/>
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


const EnergyLine: React.FC<CustomXarrowProps> = ({start, end, className}) => {
 const color = "rgb(104,193,255, 1)";
 return (
  <line
   x1={start.x} y1={start.y}
   x2={end.x} y2={end.y}
   stroke={color} strokeWidth="8"
   className={className || ""}
  />
 );
};

const EmptyLine: React.FC<CustomXarrowProps> = ({start, end, className}) => {
 const color = "rgba(52,52,52, 0.7)";
 return (
  <line
   x1={start.x} y1={start.y}
   x2={end.x} y2={end.y}
   stroke={color} strokeWidth="4"
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
