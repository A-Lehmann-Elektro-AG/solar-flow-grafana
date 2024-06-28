import React from "react";
import { FlowType } from "../../models/flow";
export const EnergyLines = ({ flow, pvPoint, loadPoint, gridPoint, linesColor }) => {
    switch (flow) {
        case FlowType.overConsumption:
            return (React.createElement(React.Fragment, null,
                EmptyLines(pvPoint, loadPoint, gridPoint),
                React.createElement(EnergyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: gridPoint, linesColor: linesColor, className: "animated-line" }),
                React.createElement(EnergyLine, { start: pvPoint, end: { x: pvPoint.x, y: loadPoint.y }, linesColor: linesColor, className: "animated-line-reverse" }),
                React.createElement(EnergyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: loadPoint, linesColor: linesColor, className: "animated-line-reverse" })));
        case FlowType.overProduction:
            return (React.createElement(React.Fragment, null,
                EmptyLines(pvPoint, loadPoint, gridPoint),
                React.createElement(EnergyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: gridPoint, linesColor: linesColor, className: "animated-line-reverse" }),
                React.createElement(EnergyLine, { start: pvPoint, end: { x: pvPoint.x, y: loadPoint.y }, linesColor: linesColor, className: "animated-line-reverse" }),
                React.createElement(EnergyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: loadPoint, linesColor: linesColor, className: "animated-line-reverse" })));
        case FlowType.noProduction:
            return (React.createElement(React.Fragment, null,
                EmptyLines(pvPoint, loadPoint, gridPoint),
                React.createElement(EnergyLine, { start: loadPoint, end: gridPoint, className: "animated-line" })));
        default:
            return null;
    }
};
const EnergyLine = ({ start, end, className, linesColor = "rgb(104, 193, 255)" }) => {
    return (React.createElement("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y, stroke: linesColor, strokeWidth: "8", style: {
            filter: "drop-shadow(0px 0px 2px " + linesColor + ")",
        }, className: className || "" }));
};
const EmptyLine = ({ start, end, className, linesColor = "rgb(104, 193, 255)" }) => {
    const color = "rgba(52,52,52, 0.7)";
    return (React.createElement("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y, stroke: color, strokeWidth: "4", style: {
            filter: "drop-shadow(0px 0px 0.8px " + linesColor + ")",
        }, className: className || "" }));
};
const EmptyLines = (pvPoint, loadPoint, gridPoint) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(EmptyLine, { start: pvPoint, end: { x: pvPoint.x, y: loadPoint.y } }),
        React.createElement(EmptyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: loadPoint }),
        React.createElement(EmptyLine, { start: { x: pvPoint.x, y: loadPoint.y }, end: gridPoint })));
};
//# sourceMappingURL=energyLine.js.map