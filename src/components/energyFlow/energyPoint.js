import React from "react";
import { useTheme2 } from "@grafana/ui";
export const bluePoint = {
    stroke: 'rgb(0, 141, 209)',
    filter: 'drop-shadow(0px 0px 2px rgb(0, 141, 209))',
};
export const purplePoint = {
    stroke: 'rgb(232, 41, 26)',
    filter: 'drop-shadow(0px 0px 2px rgb(232, 41, 26))',
};
export const yellowPoint = {
    stroke: 'rgb(244, 174, 1)',
    filter: 'drop-shadow(0px 0px 2px rgb(244, 174, 1))',
};
export const customPoint = (color) => {
    return {
        stroke: color,
        filter: `drop-shadow(0px 0px 2px ${color})`,
    };
};
function legendComponent(fontColor, label) {
    return (React.createElement("text", { fontSize: 16, fill: fontColor, x: "100", y: "200", textAnchor: "middle" }, label));
}
export function Point(props) {
    const baseRadius = 60;
    const outerRadius = baseRadius + 15;
    let fontColor;
    let iconColor;
    const theme = useTheme2();
    if (theme.isDark) {
        fontColor = "#ffffff";
        iconColor = "#181B1F";
    }
    else {
        fontColor = "#000000";
        iconColor = "#ffffff";
    }
    let legend = null;
    if (props.showLegend) {
        legend = legendComponent(fontColor, props.label);
    }
    const fill = props.style.stroke;
    return (React.createElement("div", { className: "point" },
        React.createElement("svg", { height: "200", width: "200" },
            React.createElement("circle", { cx: "100", cy: "100", r: outerRadius, strokeWidth: "0.5", fill: "transparent", style: props.style }),
            React.createElement("circle", { className: "z-5", cx: "100", cy: "100", r: baseRadius, style: props.style, strokeWidth: "1.5", fill: fill }),
            React.createElement("text", { fontSize: 18, fill: fontColor, x: "100", y: "15", textAnchor: "middle" }, props.value + " kW"),
            legend,
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", x: '60', y: "60", height: "80", fill: iconColor, viewBox: "0 -960 960 960", width: "80" },
                React.createElement("path", { d: props.icon })),
            React.createElement("br", null))));
}
//# sourceMappingURL=energyPoint.js.map