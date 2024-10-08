import React from 'react';
import {PanelProps} from '@grafana/data';
import {SimpleOptions} from 'types';
import {css, cx} from '@emotion/css';
import {useStyles2} from '@grafana/ui';
import {EnergyFlow} from "./energyFlow";

interface Props extends PanelProps<SimpleOptions> {
}

const getStyles = () => {
  return {
    wrapper: css`
        position: relative;
    `,
    svg: css`
        position: absolute;
        top: 0;
        left: 0;
    `,
    textBox: css`
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({options, data, width, height}) => {
  const styles = useStyles2(getStyles);
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
            width: ${width}px;
            height: ${height}px;
        `
      )}
    >
      <div className={styles.textBox} style={{
        marginLeft: width / 2 - 100,
        marginBottom: height / 2 - 100
      }}>
        <EnergyFlow data={data} options={options}/>
        {/*<Point label="Load" value={12} style={bluePoint} icon="icons/electrical_services.svg"/>*/}
      </div>
    </div>
  );
};
