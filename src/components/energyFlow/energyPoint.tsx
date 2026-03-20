import React from "react";
import {useTheme2} from "@grafana/ui";

interface PointProps {
  label: string;
  value: number;
  subValue?: number;
  style: any;
  icon: string;
  showLegend?: any;
  measurementUnit: 'W' | 'kW' | 'MW';
}

export const customPoint = (color: string) => ({
  stroke: color,
  filter: `drop-shadow(0px 0px 2px ${color})`,
});

export function Point(props: PointProps) {
  const baseRadius = 60;
  const outerRadius = baseRadius + 15;

  const theme = useTheme2();
  const fontColor = theme.isDark ? '#ffffff' : '#000000';
  const iconColor = theme.isDark ? '#181B1F' : '#ffffff';

  const fill = props.style.stroke;
  return (
    <div className="point">
      <svg height="250" width="250">
        <circle cx="100" cy="100" r={outerRadius} strokeWidth="0.5" fill="transparent" style={props.style}/>
        <circle className="z-5" cx="100" cy="100" r={baseRadius} style={props.style} strokeWidth="1.5" fill={...fill}/>
        <text fontSize={18} fill={fontColor} x="100" y="15" textAnchor="middle">
          {props.value + ' ' + props.measurementUnit}
        </text>
        {props.showLegend && (
          <text fontSize={16} fill={fontColor} x="100" y="200" textAnchor="middle">{props.label}</text>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" x="60" y="60" height="80" fill={iconColor} viewBox="0 -960 960 960" width="80">
          <path d={props.icon}/>
        </svg>
        {props.subValue && (
          <text fontSize={12} fill={fontColor} x="100" y="148" textAnchor="middle">{props.subValue + '%'}</text>
        )}
      </svg>
    </div>
  );
}
