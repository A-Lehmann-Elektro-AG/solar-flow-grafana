import React from 'react';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { EnergyFlow } from "./energyFlow";
const getStyles = () => {
    return {
        wrapper: css `
        position: relative;
    `,
        svg: css `
        position: absolute;
        top: 0;
        left: 0;
    `,
        textBox: css `
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10px;
    `,
    };
};
export const SimplePanel = ({ options, data, width, height }) => {
    const styles = useStyles2(getStyles);
    return (React.createElement("div", { className: cx(styles.wrapper, css `
            width: ${width}px;
            height: ${height}px;
        `) },
        React.createElement("div", { className: styles.textBox, style: {
                marginLeft: width / 2 - 100,
                marginBottom: height / 2 - 100
            } },
            React.createElement(EnergyFlow, { data: data, options: options }))));
};
//# sourceMappingURL=SimplePanel.js.map