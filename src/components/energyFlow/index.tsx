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
  width: number;
  height: number;
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

// Layout constants — all coordinates in a virtual SVG space.
// Circle centers (where the Point <g> gets translated to)
const PV_CENTER: PointPosition = { x: 275, y: 100 };
const LOAD_CENTER: PointPosition = { x: 75, y: 310 };
const GRID_CENTER: PointPosition = { x: 475, y: 310 };
const ADDITIONAL_CENTER: PointPosition = { x: 275, y: 520 };

// Line endpoints — EnergyLines derives the junction as (pvLineEnd.x, loadLineEnd.y)
const PV_LINE_END: PointPosition = { x: 275, y: 175 };       // bottom edge of PV circle
const LOAD_LINE_END: PointPosition = { x: 75, y: 310 };      // center of load (horizontal line)
const GRID_LINE_END: PointPosition = { x: 475, y: 310 };     // center of grid (horizontal line)
const ADDITIONAL_LINE_END: PointPosition = { x: 275, y: 520 }; // center of additional (vertical line)

// Bounding box without additional source
const BASE_BOUNDS = { minX: -30, minY: -15, maxX: 580, maxY: 420 };
// Extended bottom when additional source is visible
const EXTENDED_MAX_Y = 640;

export const EnergyFlow: React.FC<EnergyFlowProps> = ({ data, options, width, height }) => {
  const theme = useTheme2();

  const pv = extractFieldValue(data.series, options.solarQuery);
  const grid = extractFieldValue(data.series, options.gridQuery);
  const measuredLoad = options.loadQuery ? extractFieldValue(data.series, options.loadQuery) : undefined;
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
    setFlowData(EnergyFlowCore.calculateFlowData(pv, grid, additionalSource, additionalSourceSOC, options.measurementUnit, measuredLoad));
  }, [pv, grid, measuredLoad, additionalSource, additionalSourceSOC, options.measurementUnit]);

  if (data.series.length < 1) {
    return (
      <div style={{ backgroundColor: 'red', padding: '5%', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
        <h3>Invalid/Missing data in one of the queries</h3>
      </div>
    );
  }

  const color = (key: keyof SimpleOptions) => theme.visualization.getColorByName(options[key] as string);
  const showAdditionalSource = Math.abs(flowData.additionalSource) > options.showEnergyThreshold || options.additionalSourceAlwaysShow;

  const pad = options.padding ?? 20;
  const maxY = showAdditionalSource ? EXTENDED_MAX_Y : BASE_BOUNDS.maxY;
  const vbX = BASE_BOUNDS.minX - pad;
  const vbY = BASE_BOUNDS.minY - pad;
  const vbW = BASE_BOUNDS.maxX - BASE_BOUNDS.minX + pad * 2;
  const vbH = maxY - BASE_BOUNDS.minY + pad * 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ pointerEvents: 'none' }}
    >
      <EnergyLines
        flow={flowData}
        pvPoint={PV_LINE_END}
        loadPoint={LOAD_LINE_END}
        gridPoint={GRID_LINE_END}
        extraEnergyPoint={ADDITIONAL_LINE_END}
        linesColor={color('linesColor')}
        showEnergyThreshold={options.showEnergyThreshold}
        alwaysShowAdditionalSource={options.additionalSourceAlwaysShow}
        measurementUnit={options.measurementUnit}
        animationSpeedReference={options.animationSpeedReference ?? 400}
      />

      {/* PV / Solar — top center */}
      <Point
        x={PV_CENTER.x} y={PV_CENTER.y}
        label="PV"
        measurementUnit={options.measurementUnit}
        showLegend={false}
        value={flowData.pv}
        pointStyle={customPoint(color('solarColor'))}
        icon={ICON_PATHS.solarPanel}
      />

      {/* Load — middle left */}
      <Point
        x={LOAD_CENTER.x} y={LOAD_CENTER.y}
        label="Load"
        measurementUnit={options.measurementUnit}
        showLegend={options.showLegend}
        value={flowData.load}
        pointStyle={customPoint(color('loadColor'))}
        icon={ICON_PATHS.load}
      />

      {/* Grid — middle right */}
      <Point
        x={GRID_CENTER.x} y={GRID_CENTER.y}
        label="Grid"
        measurementUnit={options.measurementUnit}
        showLegend={options.showLegend}
        value={flowData.grid}
        pointStyle={customPoint(color('gridColor'))}
        icon={ICON_PATHS.grid}
      />

      {/* Additional source — bottom center */}
      {showAdditionalSource && (
        <Point
          x={ADDITIONAL_CENTER.x} y={ADDITIONAL_CENTER.y}
          label={options.additionalSourceLabel}
          measurementUnit={options.measurementUnit}
          showLegend={options.showLegend}
          value={flowData.additionalSource}
          subValue={flowData.additionalSourceSOC}
          pointStyle={customPoint(color('additionalSourceColor'))}
          icon={ICON_PATHS[options.additionalSourceIcon]}
          valuePlacement="bottom"
        />
      )}
    </svg>
  );
};

