import React from "react";

interface PointProps {
  label: string;
  value: number;
  style: any;
  icon: string;
}

export const bluePoint = {
  stroke: 'rgb(125,201,255)',
  filter: 'drop-shadow(0px 0px 5px rgba(86,160,211,0.8))',
}

export const purplePoint = {
  stroke: 'rgb(202,129,255)',
  filter: 'drop-shadow(0px 0px 5px rgba(178,121,217,0.8))',
}

export const yellowPoint = {
  stroke: 'rgb(255,241,86)',
  filter: 'drop-shadow(0px 0px 5px rgba(220,201,0,0.8))',
}

export function Point(props: PointProps) {
  const baseRadius = 60;
  const outerRadius = baseRadius + 15;

  const fill = props.style.stroke;
  return (
    <div className="point">
      <svg height="200" width="200">
        <circle cx="100" cy="100" r={outerRadius} strokeWidth="0.5" fill="transparent" style={props.style}/>
        <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLzF7Eq0wK5hkF1QYE1pjBQWhI5tR1SrZSOn1HIjuDA&s"}
          alt=""/>
        {/*<image xlinkHref={process.env.PUBLIC_URL + props.icon} height="65" x='68' y="50"/>*/}
        <circle className="z-5" cx="100" cy="100" r={baseRadius} style={props.style} strokeWidth="1.5"
                fill={...fill}/>
        <text fontSize={15} className="shadow-lg" x="100" y="130" textAnchor="middle">{props.value + "kw"}</text>
        <br/>
      </svg>
      {/*<text className={"m"}>{props.label}</text>*/}
    </div>
  );
}
