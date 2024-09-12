import React from "react";
import {PointPosition} from "./index";
import { CustomXarrowProps, FlowData } from '../../models/flow';

interface EnergyLinesProps {
 flow: FlowData;
 pvPoint: PointPosition;
 loadPoint: PointPosition;
 gridPoint: PointPosition;
 extraEnergyPoint: PointPosition;
 linesColor: string;
}


export const EnergyLines: React.FC<EnergyLinesProps> = ({flow, pvPoint, loadPoint, gridPoint, extraEnergyPoint, linesColor}) => {
  return (
    <>
      <EmptyLine start={{x: pvPoint.x + 2, y: loadPoint.y}} end={gridPoint}/>
      <EmptyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y - 2}}/>
      <EmptyLine start={{x: pvPoint.x - 2, y: loadPoint.y}} end={loadPoint}/>

      {flow.extraSource !== 0 && (
        <>
          <EmptyLine start={extraEnergyPoint} end={{x: pvPoint.x, y: loadPoint.y + 2}}/>
          <EnergyLine start={extraEnergyPoint} end={{x: pvPoint.x, y: loadPoint.y }} linesColor={linesColor} className={flow.extraSource < 0 ? "animated-line" : "animated-line-reverse"}/>
        </>)
      }

      {/*Grid line*/}
      <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} linesColor={linesColor} className={flow.grid < 0 ? "animated-line-reverse" : "animated-line"}/>

      {/*Solar line*/}
      <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} linesColor={linesColor} className="animated-line-reverse"/>

      {/*Load line*/}
      <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} linesColor={linesColor} className="animated-line-reverse"/>


    </>
  );
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