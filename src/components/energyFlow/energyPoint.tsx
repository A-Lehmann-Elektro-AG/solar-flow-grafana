import React from "react";

interface PointProps {
 label: string;
 value: number;
 style: any;
 icon: string;
}

export const bluePoint = {
 stroke: 'rgba(86,160,211,0.62)',
 filter: 'drop-shadow(0px 0px 5px rgba(86,160,211,0.62))',
}

export const purplePoint = {
 stroke: 'rgba(178,121,217,0.62)',
 filter: 'drop-shadow(0px 0px 5px rgba(178,121,217,0.62))',
}

export const yellowPoint = {
 stroke: 'rgba(220,201,0,0.62)',
 filter: 'drop-shadow(0px 0px 5px rgba(220,201,0,0.42))',
}

export function Point(props: PointProps) {
 const baseRadius = 60;
 const outerRadius = baseRadius + 15;

 return (
  <div className="point">
   <svg height="200" width="200">
    <circle cx="100" cy="100" r={outerRadius} style={props.style} strokeWidth="0.5" fill="transparent"/>
    <circle className="z-5" cx="100" cy="100" r={baseRadius} style={props.style} strokeWidth="1.5" fill="white"/>
    <img src={process.env.PUBLIC_URL + props.icon} alt=""/>
    <image xlinkHref={process.env.PUBLIC_URL + props.icon} height="65" x='68' y="50"/>
    <text fontSize={15} className="shadow-lg" x="100" y="130" textAnchor="middle">{props.value + "kw"}</text>
    <br/>
   </svg>
   {/*<text className={"m"}>{props.label}</text>*/}
  </div>
 );
}
