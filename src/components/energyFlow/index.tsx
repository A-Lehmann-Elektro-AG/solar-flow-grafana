import React, { useEffect } from 'react';
import './index.css';
import { customPoint, Point } from './energyPoint';
import { FlowData } from '../../models/flow';
import { EnergyFlowCore } from '../../services/energyFlowCore';
import { EnergyLines } from './energyLine';
import { useTheme2 } from '@grafana/ui';
import { SimpleOptions } from '../../types';
import { ICON_PATHS } from '../../constants/icons';

export interface PointPosition {
  x: number;
  y: number;
}

export interface EnergyFlowProps {
  data: any;
  options: SimpleOptions;
}

const extractFieldValue = (series: any[], fieldName: string): number => {
  for (const s of series) {
    const field = s.fields.find((f: any) => f.name === fieldName);
    if (field) {
      return field.values[0];
    }
  }
  return 0;
};

export const EnergyFlow: React.FC<EnergyFlowProps> = ({ data, options }) => {
  const theme = useTheme2();

  const pv = extractFieldValue(data.series, options.solarQuery);
  const grid = extractFieldValue(data.series, options.gridQuery);
  const additionalSource = extractFieldValue(data.series, options.additionalSourceLoadQuery);
  const additionalSourceSOC = extractFieldValue(data.series, options.additionalSourceSOCQuery);

  const [flowData, setFlowData] = React.useState<FlowData>({
    pv: 0,
    load: 0,
    grid: 0,
    additionalSource: 0,
    additionalSourceSOC: 0,
  });

  useEffect(() => {
    setFlowData(EnergyFlowCore.calculateFlowData(pv, grid, additionalSource, additionalSourceSOC, options.measurementUnit));
  }, [pv, grid, additionalSource, additionalSourceSOC, options.measurementUnit]);

  const pvPoint: PointPosition = { x: 275, y: 250 };
  const loadPoint: PointPosition = { x: 100, y: 460 };
  const gridPoint: PointPosition = { x: 450, y: 460 };
  const additionalPoint: PointPosition = { x: 275, y: 650 };

  if (data.series.length < 1) {
    return (
      <div style={{ backgroundColor: 'red', padding: '5%', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
        <h3>Invalid/Missing data in one of the queries</h3>
      </div>
    );
  }

  const color = (key: keyof SimpleOptions) => theme.visualization.getColorByName(options[key] as string);
  const showAdditionalSource = Math.abs(flowData.additionalSource) > options.showEnergyThreshold || options.additionalSourceAlwaysShow;

  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(${-165 + options.xOffset}px - 50%)`,
        top: `calc(${-options.yOffset}px - 50%)`,
        transform: `scale(${options.zoom})`,
        transformOrigin: '270px 0px',
        pointerEvents: 'none',
      }}
    >
      <div>
        <div className="line-holder" style={{ position: 'absolute', bottom: '500px', left: '0px' }}>
          <svg width="500" height="1000" style={{ position: 'absolute', top: '-200px', left: '0' }} viewBox="0 0 500 500">
            <EnergyLines
              flow={flowData}
              pvPoint={pvPoint}
              loadPoint={loadPoint}
              gridPoint={gridPoint}
              extraEnergyPoint={additionalPoint}
              linesColor={color('linesColor')}
              showEnergyThreshold={options.showEnergyThreshold}
              alwaysShowAdditionalSource={options.additionalSourceAlwaysShow}
              measurementUnit={options.measurementUnit}
              animationSpeedReference={options.animationSpeedReference ?? 400}
            />
          </svg>
        </div>

        <div className="line-holder" style={{ position: 'absolute', bottom: '0px', left: '25px' }}>
          <div className="point-holder" style={{ position: 'absolute', top: '-300px', left: '150px' }}>
            <Point
              label="PV"
              measurementUnit={options.measurementUnit}
              showLegend={false}
              value={flowData.pv}
              style={customPoint(color('solarColor'))}
              icon={ICON_PATHS.solarPanel}
            />
          </div>

          {showAdditionalSource && (
            <div className="point-holder" style={{ position: 'absolute', top: '100px', left: '150px' }}>
              <Point
                label={options.additionalSourceLabel}
                measurementUnit={options.measurementUnit}
                showLegend={options.showLegend}
                value={flowData.additionalSource}
                subValue={flowData.additionalSourceSOC}
                style={customPoint(color('additionalSourceColor'))}
                icon={ICON_PATHS[options.additionalSourceIcon]}
                valuePlacement="bottom"
              />
            </div>
          )}

          <div className="point-holder" style={{ position: 'absolute', top: -110, left: '25px' }}>
            <Point
              label="Load"
              measurementUnit={options.measurementUnit}
              showLegend={options.showLegend}
              value={flowData.load}
              style={customPoint(color('loadColor'))}
              icon={ICON_PATHS.load}
            />
            <Point
              label="Grid"
              measurementUnit={options.measurementUnit}
              showLegend={options.showLegend}
              value={flowData.grid}
              style={customPoint(color('gridColor'))}
              icon={ICON_PATHS.grid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

