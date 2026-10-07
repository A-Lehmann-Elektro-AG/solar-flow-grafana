import React from "react";
import {useTheme2} from "@grafana/ui";
import { MeasurementUnit, formatEnergyValue } from '../../models/flow';
import { ringOut, ringOutDelayed, ringIn, ringInDelayed } from './styles';

interface PointProps {
  x: number;
  y: number;
  label: string;
  value: number;
  subValue?: number;
  pointStyle: { stroke: string; filter: string };
  icon: string;
  showLegend?: boolean;
  measurementUnit: MeasurementUnit;
  valuePlacement?: 'top' | 'bottom';
  energyDirection?: 'incoming' | 'outgoing' | 'none';
  animationDuration?: string;
  powerFontSize?: number;
  socFontSize?: number;
  labelFontSize?: number;
}

export const customPoint = (color: string) => ({
  stroke: color,
  filter: `drop-shadow(0px 0px 2px ${color})`,
});

const BASE_RADIUS = 60;
const OUTER_RADIUS = BASE_RADIUS + 15;

function getRingClasses(direction?: 'incoming' | 'outgoing' | 'none'): [string, string] | null {
  if (direction === 'outgoing') {
    return [ringOut, ringOutDelayed];
  }
  if (direction === 'incoming') {
    return [ringIn, ringInDelayed];
  }
  return null;
}

export function Point(props: Readonly<PointProps>) {
  const theme = useTheme2();
  const fontColor = theme.isDark ? '#ffffff' : '#000000';
  const iconColor = theme.isDark ? '#181B1F' : '#ffffff';

  const powerSize = props.powerFontSize ?? 18;
  const socSize = props.socFontSize ?? 12;
  const labelSize = props.labelFontSize ?? 16;

  const { displayValue, displayUnit } = formatEnergyValue(props.value, props.measurementUnit);
  const valueAtBottom = props.valuePlacement === 'bottom';
  const valueY = valueAtBottom ? OUTER_RADIUS + 7 + powerSize : -(OUTER_RADIUS + 7);
  const legendY = valueAtBottom ? valueY + 4 + labelSize : OUTER_RADIUS + 8 + labelSize;

  const ringClasses = getRingClasses(props.energyDirection);
  const ringStyle = props.animationDuration
    ? { ...props.pointStyle, ['--animation-duration' as string]: props.animationDuration } as React.CSSProperties
    : props.pointStyle;

  const hasSoc = props.subValue !== undefined && props.subValue !== 0;
  // Keep the icon prominent even when SoC is displayed
  const iconSize = hasSoc ? Math.round(Math.max(68, 76 - (socSize - 12) * 0.45)) : 80;
  const iconX = -iconSize / 2;

  // Vertically group the icon and SoC together with tight, cohesive spacing
  const gap = 3;
  const totalHeight = iconSize + gap + socSize;
  const stackTop = -Math.round(totalHeight / 2) + 1;

  const iconY = hasSoc ? stackTop : -40;
  // Position SoC text comfortably inside the circle with clean margin from the bottom curve
  const socY = stackTop + iconSize + gap + Math.round(socSize * 0.85);

  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      {/* Animated emission rings — emit from / collapse into the inner circle */}
      {ringClasses && (
        <>
          <circle className={ringClasses[0]} r={BASE_RADIUS} strokeWidth="1.5" fill="transparent" style={ringStyle} />
          <circle className={ringClasses[1]} r={BASE_RADIUS} strokeWidth="1.5" fill="transparent" style={ringStyle} />
        </>
      )}
      <circle r={BASE_RADIUS} style={props.pointStyle} strokeWidth="1.5" fill={props.pointStyle.stroke} />
      <text fontSize={powerSize} fill={fontColor} x="0" y={valueY} textAnchor="middle">
        {displayValue + ' ' + displayUnit}
      </text>
      {props.showLegend && (
        <text fontSize={labelSize} fill={fontColor} x="0" y={legendY} textAnchor="middle">{props.label}</text>
      )}
      <svg x={iconX} y={iconY} height={iconSize} width={iconSize} fill={iconColor} viewBox="0 -960 960 960">
        <path d={props.icon} />
      </svg>
      {hasSoc && (
        <text fontSize={socSize} fill={fontColor} x="0" y={socY} textAnchor="middle">{props.subValue + '%'}</text>
      )}
    </g>
  );
}
