import React from "react";
import {useTheme2} from "@grafana/ui";

interface PointProps {
  label: string;
  value: number;
  style: any;
  icon: string;
  showLegend?: any;
}

export const bluePoint = {
  stroke: 'rgb(0, 141, 209)',
  filter: 'drop-shadow(0px 0px 2px rgb(0, 141, 209))',
}

export const purplePoint = {
  stroke: 'rgb(232, 41, 26)',
  filter: 'drop-shadow(0px 0px 2px rgb(232, 41, 26))',
}

export const yellowPoint = {
  stroke: 'rgb(244, 174, 1)',
  filter: 'drop-shadow(0px 0px 2px rgb(244, 174, 1))',
}

export const customPoint = (color: string) => {
  return {
    stroke: color,
    filter: `drop-shadow(0px 0px 2px ${color})`,
  };
}

function legendComponent(fontColor: string, label: string) {
  return (
      <text fontSize={16} fill={fontColor} x="100" y="200"
            textAnchor="middle">{label}</text>
  );
}

  export function Point(props: PointProps) {
    const baseRadius = 60;
    const outerRadius = baseRadius + 15;

  let fontColor: string;
  let iconColor: string;
  const theme = useTheme2();
  if (theme.isDark) {
    fontColor = "#ffffff";
    iconColor = "#181B1F";
  } else {
    fontColor = "#000000";
    iconColor = "#ffffff";
  }

  let legend = null;
  if (props.showLegend) {
    legend = legendComponent(fontColor, props.label);
  }
  
  const fill = props.style.stroke;
  return (
    <div className="point">
      <svg height="250" width="250">
        <circle cx="100" cy="100" r={outerRadius} strokeWidth="0.5" fill="transparent" style={props.style}/>
        <circle className="z-5" cx="100" cy="100" r={baseRadius} style={props.style} strokeWidth="1.5"
                fill={...fill}/>
        <text fontSize={18} fill={fontColor} x="100" y="15"
              textAnchor="middle">{props.value + " kW"}</text>
        {legend}
        <svg xmlns="http://www.w3.org/2000/svg" x='60' y="60" height="80" fill={iconColor} viewBox="0 -960 960 960"
             width="80">
          <path
            d={props.icon}/>
        </svg>
        <br/>
      </svg>
      {/*<text className={"m"}>{props.label}</text>*/}
    </div>
  );
}
