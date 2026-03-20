import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { EnergyFlow } from './energyFlow';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => (
  <div style={{ width, height, overflow: 'hidden' }}>
    <EnergyFlow data={data} options={options} width={width} height={height} />
  </div>
);
