import React from "react";
import {PointPosition} from "./index";
import { CustomXarrowProps, FlowData } from '../../models/flow';

const UNIT_TO_WATTS: Record<string, number> = { W: 1, kW: 1000, MW: 1000000 };
// At `speedReference` watts the animation runs at exactly 1 s per cycle.
const getAnimationDuration = (energy: number, unit: string, speedReference: number): string => {
  const energyInW = Math.abs(energy) * (UNIT_TO_WATTS[unit] ?? 1);
  const duration = Math.max(0.3, Math.min(2.5, speedReference / Math.max(energyInW, 0.001)));
  return `${duration.toFixed(2)}s`;
};

interface EnergyLineProps extends CustomXarrowProps {
  animationDuration?: string;
}

interface EnergyLinesProps {
 flow: FlowData;
 pvPoint: PointPosition;
 loadPoint: PointPosition;
 gridPoint: PointPosition;
 extraEnergyPoint: PointPosition;
 linesColor: string;
 alwaysShowAdditionalSource: boolean;
 showEnergyThreshold: number;
 measurementUnit: string;
 animationSpeedReference: number;
}


export const EnergyLines: React.FC<EnergyLinesProps> = ({flow, pvPoint, loadPoint, gridPoint, extraEnergyPoint, linesColor, showEnergyThreshold, alwaysShowAdditionalSource, measurementUnit, animationSpeedReference}) => {
  return (
    <>
      <EmptyLine start={{x: pvPoint.x + 2, y: loadPoint.y}} end={gridPoint}/>
      <EmptyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y - 2}}/>
      <EmptyLine start={{x: pvPoint.x - 2, y: loadPoint.y}} end={loadPoint}/>

      {((Math.abs(flow.additionalSource) > showEnergyThreshold) || alwaysShowAdditionalSource) && (
        <>
          <EmptyLine start={extraEnergyPoint} end={{x: pvPoint.x, y: loadPoint.y + 2}}/>
          { Math.abs(flow.additionalSource) > showEnergyThreshold && (
            <EnergyLine start={extraEnergyPoint} end={{x: pvPoint.x, y: loadPoint.y }} linesColor={linesColor} className={flow.additionalSource < 0 ? "animated-line" : "animated-line-reverse"} animationDuration={getAnimationDuration(flow.additionalSource, measurementUnit, animationSpeedReference)}/>
            )
          }
        </>)
      }

      {/*Grid line*/}
      { Math.abs(flow.grid) >= showEnergyThreshold && (
          <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={gridPoint} linesColor={linesColor} className={flow.grid < 0 ? "animated-line-reverse" : "animated-line"} animationDuration={getAnimationDuration(flow.grid, measurementUnit, animationSpeedReference)}/>
        )
      }

      {/*Solar line*/}
      { flow.pv >= showEnergyThreshold && (
          <EnergyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y}} linesColor={linesColor} className="animated-line-reverse" animationDuration={getAnimationDuration(flow.pv, measurementUnit, animationSpeedReference)}/>
        )
      }

      {/*Load line*/}
      { flow.load >= showEnergyThreshold && (
          <EnergyLine start={{x: pvPoint.x, y: loadPoint.y}} end={loadPoint} linesColor={linesColor} className="animated-line-reverse" animationDuration={getAnimationDuration(flow.load, measurementUnit, animationSpeedReference)}/>
        )
      }


    </>
  );
};


const EnergyLine: React.FC<EnergyLineProps> = ({start, end, className, linesColor = "rgb(104, 193, 255)", animationDuration = "1s"}) => {
  return (
  <line
    x1={start.x} y1={start.y}
    x2={end.x} y2={end.y}
    stroke={linesColor} strokeWidth="8"
    style={{
      filter: `drop-shadow(0px 0px 4px ${linesColor}) drop-shadow(0px 0px 8px ${linesColor})`,
      ['--animation-duration' as string]: animationDuration,
    } as React.CSSProperties}
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
