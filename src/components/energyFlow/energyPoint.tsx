import React from "react";
import {useTheme2} from "@grafana/ui";
import { MeasurementUnit, formatEnergyValue } from '../../models/flow';

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
}

export const customPoint = (color: string) => ({
  stroke: color,
  filter: `drop-shadow(0px 0px 2px ${color})`,
});

const BASE_RADIUS = 60;
const OUTER_RADIUS = BASE_RADIUS + 15;

function getRingClasses(direction?: 'incoming' | 'outgoing' | 'none'): [string, string] | null {
  if (direction === 'outgoing') {
    return ['ring-out', 'ring-out-delayed'];
  }
  if (direction === 'incoming') {
    return ['ring-in', 'ring-in-delayed'];
  }
  return null;
}

export function Point(props: Readonly<PointProps>) {
  const theme = useTheme2();
  const fontColor = theme.isDark ? '#ffffff' : '#000000';
  const iconColor = theme.isDark ? '#181B1F' : '#ffffff';

  const { displayValue, displayUnit } = formatEnergyValue(props.value, props.measurementUnit);
  const valueAtBottom = props.valuePlacement === 'bottom';
  const valueY = valueAtBottom ? OUTER_RADIUS + 25 : -(OUTER_RADIUS + 10);
  const legendY = valueAtBottom ? OUTER_RADIUS + 45 : OUTER_RADIUS + 25;

  const ringClasses = getRingClasses(props.energyDirection);
  const ringStyle = props.animationDuration
    ? { ...props.pointStyle, ['--animation-duration' as string]: props.animationDuration } as React.CSSProperties
    : props.pointStyle;

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
      <text fontSize={18} fill={fontColor} x="0" y={valueY} textAnchor="middle">
        {displayValue + ' ' + displayUnit}
      </text>
      {props.showLegend && (
        <text fontSize={16} fill={fontColor} x="0" y={legendY} textAnchor="middle">{props.label}</text>
      )}
      <svg x="-40" y="-40" height="80" width="80" fill={iconColor} viewBox="0 -960 960 960">
        <path d={props.icon} />
      </svg>
      {props.subValue !== undefined && props.subValue !== 0 && (
        <text fontSize={12} fill={fontColor} x="0" y={BASE_RADIUS - 12} textAnchor="middle">{props.subValue + '%'}</text>
      )}
    </g>
  );
}
