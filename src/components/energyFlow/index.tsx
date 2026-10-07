import React, { useEffect } from 'react';
import { customPoint, Point } from './energyPoint';
import { FlowData, MeasurementUnit, UNIT_TO_WATTS } from '../../models/flow';
import { EnergyFlowCore, RawAdditionalSource } from '../../services/energyFlowCore';
import { EnergyLines, AdditionalSourceLineData } from './energyLine';
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

// ── Layout constants ──────────────────────────────────────
const PV_CENTER: PointPosition = { x: 275, y: 90 };
const LOAD_CENTER: PointPosition = { x: 75, y: 310 };
const GRID_CENTER: PointPosition = { x: 475, y: 310 };

const PV_LINE_END: PointPosition = { x: 275, y: 145 };
const LOAD_LINE_END: PointPosition = { x: 75, y: 310 };
const GRID_LINE_END: PointPosition = { x: 475, y: 310 };

const MAIN_HUB: PointPosition = { x: 275, y: 310 };

// Additional source vertical positions
const ADDITIONAL_Y = 520;
const SUB_JUNCTION_Y = 425;

// Bounding box without additional sources
const BASE_BOUNDS = { minX: -30, minY: -15, maxX: 580, maxY: 420 };
const EXTENDED_MAX_Y = 640;

/** Compute center positions for additional source circles based on count. */
function getAdditionalCenters(count: number, additionalY: number = ADDITIONAL_Y): PointPosition[] {
  switch (count) {
    case 1: return [{ x: 275, y: additionalY }];
    case 2: return [{ x: 175, y: additionalY }, { x: 375, y: additionalY }];
    case 3: return [{ x: 75, y: additionalY }, { x: 275, y: additionalY }, { x: 475, y: additionalY }];
    default: return [];
  }
}

function getEnergyDirection(value: number): 'incoming' | 'outgoing' | 'none' {
  if (value > 0) { return 'outgoing'; }
  if (value < 0) { return 'incoming'; }
  return 'none';
}

function getAnimDuration(energy: number, unit: MeasurementUnit, speedRef: number): string {
  const energyInW = Math.abs(energy) * UNIT_TO_WATTS[unit];
  const duration = Math.max(0.3, Math.min(2.5, speedRef / Math.max(energyInW, 0.001)));
  return `${duration.toFixed(2)}s`;
}

// Per-source config extracted from flat options
interface SourceConfig {
  query: any;
  socQuery: any;
  label: string;
  icon: string;
  colorKey: keyof SimpleOptions;
  alwaysShow: boolean;
}

function getSourceConfigs(options: SimpleOptions): SourceConfig[] {
  const count = options.additionalSourceCount ?? 0;
  const configs: SourceConfig[] = [];
  if (count >= 1) {
    configs.push({
      query: options.additionalSourceLoadQuery,
      socQuery: options.additionalSourceSOCQuery,
      label: options.additionalSourceLabel ?? 'Battery',
      icon: options.additionalSourceIcon ?? 'battery',
      colorKey: 'additionalSourceColor',
      alwaysShow: options.additionalSourceAlwaysShow ?? false,
    });
  }
  if (count >= 2) {
    configs.push({
      query: options.additionalSource2LoadQuery,
      socQuery: options.additionalSource2SOCQuery,
      label: options.additionalSource2Label ?? 'Wallbox',
      icon: options.additionalSource2Icon ?? 'evPanel',
      colorKey: 'additionalSource2Color',
      alwaysShow: options.additionalSource2AlwaysShow ?? false,
    });
  }
  if (count >= 3) {
    configs.push({
      query: options.additionalSource3LoadQuery,
      socQuery: options.additionalSource3SOCQuery,
      label: options.additionalSource3Label ?? 'Wallbox 2',
      icon: options.additionalSource3Icon ?? 'evPanel',
      colorKey: 'additionalSource3Color',
      alwaysShow: options.additionalSource3AlwaysShow ?? false,
    });
  }
  return configs;
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({ data, options, width, height }) => {
  const theme = useTheme2();

  const pv = extractFieldValue(data.series, options.solarQuery);
  const grid = extractFieldValue(data.series, options.gridQuery);
  const measuredLoad = options.loadQuery ? extractFieldValue(data.series, options.loadQuery) : undefined;

  const sourceConfigs = getSourceConfigs(options);
  const rawSources: RawAdditionalSource[] = sourceConfigs.map(cfg => ({
    value: cfg.query ? extractFieldValue(data.series, cfg.query) : 0,
    soc: cfg.socQuery ? extractFieldValue(data.series, cfg.socQuery) : 0,
  }));

  const [flowData, setFlowData] = React.useState<FlowData>({
    pv: 0, load: 0, grid: 0, additionalSources: [],
  });

  useEffect(() => {
    setFlowData(EnergyFlowCore.calculateFlowData(pv, grid, rawSources, options.measurementUnit, measuredLoad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv, grid, measuredLoad, JSON.stringify(rawSources), options.measurementUnit]);

  if (data.series.length < 1) {
    return (
      <div style={{ backgroundColor: 'red', padding: '5%', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
        <h3>Invalid/Missing data in one of the queries</h3>
      </div>
    );
  }

  const color = (key: keyof SimpleOptions) => theme.visualization.getColorByName(options[key] as string);

  const labelFontSize = options.labelFontSize ?? 16;
  // Extra vertical clearance below Row 2 (Load / Grid) so large labels never collide with Row 3 connecting lines
  const labelExtraY = options.showLegend ? Math.max(0, Math.round((labelFontSize - 16) * 1.8)) : 0;
  const subJunctionY = SUB_JUNCTION_Y + labelExtraY;
  const additionalY = ADDITIONAL_Y + labelExtraY;

  const sourceCount = sourceConfigs.length;
  const centers = getAdditionalCenters(sourceCount, additionalY);

  // Determine which sources are visible (for viewBox calculation)
  const anySourceVisible = flowData.additionalSources.some((s, i) =>
    Math.abs(s.value) > options.showEnergyThreshold || sourceConfigs[i]?.alwaysShow
  );

  const speedRef = options.animationSpeedReference ?? 400;

  // Build line data for EnergyLines
  const additionalSourceLines: AdditionalSourceLineData[] = centers.map((pos, i) => ({
    point: pos,
    flow: flowData.additionalSources[i] ?? { value: 0, soc: 0 },
    alwaysShow: sourceConfigs[i]?.alwaysShow ?? false,
  }));

  const subJunction: PointPosition | null = sourceCount >= 2 ? { x: MAIN_HUB.x, y: subJunctionY } : null;

  const pad = options.padding ?? 20;
  const powerFontSize = options.powerFontSize ?? 18;
  const extraBottom = Math.max(0, (powerFontSize - 18) * 1.5 + (options.showLegend ? (labelFontSize - 16) * 1.5 : 0) + 10);
  const extraTop = Math.max(0, powerFontSize - 18);
  const maxY = (anySourceVisible ? (EXTENDED_MAX_Y + labelExtraY) : BASE_BOUNDS.maxY) + extraBottom;
  const minY = BASE_BOUNDS.minY - extraTop;
  const vbX = BASE_BOUNDS.minX - pad;
  const vbY = minY - pad;
  const vbW = BASE_BOUNDS.maxX - BASE_BOUNDS.minX + pad * 2;
  const vbH = maxY - minY + pad * 2;

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
        additionalSources={additionalSourceLines}
        subJunction={subJunction}
        linesColor={color('linesColor')}
        showEnergyThreshold={options.showEnergyThreshold}
        measurementUnit={options.measurementUnit}
        animationSpeedReference={speedRef}
      />

      {/* Main energy hub */}
      <circle
        cx={MAIN_HUB.x}
        cy={MAIN_HUB.y}
        r={8}
        fill={color('linesColor')}
        style={{
          filter: `drop-shadow(0px 0px 4px ${color('linesColor')}) drop-shadow(0px 0px 8px ${color('linesColor')})`,
        }}
      />

      {/* Sub-junction hub (only when 2-3 additional sources) */}
      {subJunction && anySourceVisible && (
        <circle
          cx={subJunction.x}
          cy={subJunction.y}
          r={6}
          fill={color('linesColor')}
          style={{
            filter: `drop-shadow(0px 0px 3px ${color('linesColor')}) drop-shadow(0px 0px 6px ${color('linesColor')})`,
          }}
        />
      )}

      {/* PV / Solar — top center */}
      <Point
        x={PV_CENTER.x} y={PV_CENTER.y}
        label="PV"
        measurementUnit={options.measurementUnit}
        showLegend={false}
        value={flowData.pv}
        powerFontSize={options.powerFontSize}
        socFontSize={options.socFontSize}
        labelFontSize={options.labelFontSize}
        pointStyle={customPoint(color('solarColor'))}
        icon={ICON_PATHS.solarPanel}
        energyDirection={flowData.pv > 0 ? 'outgoing' : 'none'}
        animationDuration={getAnimDuration(flowData.pv, options.measurementUnit, speedRef)}
      />

      {/* Load — middle left */}
      <Point
        x={LOAD_CENTER.x} y={LOAD_CENTER.y}
        label="Load"
        measurementUnit={options.measurementUnit}
        showLegend={options.showLegend}
        value={flowData.load}
        powerFontSize={options.powerFontSize}
        socFontSize={options.socFontSize}
        labelFontSize={options.labelFontSize}
        pointStyle={customPoint(color('loadColor'))}
        icon={ICON_PATHS.load}
        energyDirection={flowData.load > 0 ? 'incoming' : 'none'}
        animationDuration={getAnimDuration(flowData.load, options.measurementUnit, speedRef)}
      />

      {/* Grid — middle right */}
      <Point
        x={GRID_CENTER.x} y={GRID_CENTER.y}
        label="Grid"
        measurementUnit={options.measurementUnit}
        showLegend={options.showLegend}
        value={flowData.grid}
        powerFontSize={options.powerFontSize}
        socFontSize={options.socFontSize}
        labelFontSize={options.labelFontSize}
        pointStyle={customPoint(color('gridColor'))}
        icon={ICON_PATHS.grid}
        energyDirection={getEnergyDirection(flowData.grid)}
        animationDuration={getAnimDuration(flowData.grid, options.measurementUnit, speedRef)}
      />

      {/* Additional source circles */}
      {centers.map((pos, i) => {
        const srcFlow = flowData.additionalSources[i];
        const cfg = sourceConfigs[i];
        if (!srcFlow || !cfg) { return null; }
        const visible = Math.abs(srcFlow.value) > options.showEnergyThreshold || cfg.alwaysShow;
        if (!visible) { return null; }
        return (
          <Point
            key={`src-${cfg.colorKey}`}
            x={pos.x} y={pos.y}
            label={cfg.label}
            measurementUnit={options.measurementUnit}
            showLegend={options.showLegend}
            value={srcFlow.value}
            subValue={srcFlow.soc}
            powerFontSize={options.powerFontSize}
            socFontSize={options.socFontSize}
            labelFontSize={options.labelFontSize}
            pointStyle={customPoint(color(cfg.colorKey))}
            icon={ICON_PATHS[cfg.icon]}
            valuePlacement="bottom"
            energyDirection={getEnergyDirection(srcFlow.value)}
            animationDuration={getAnimDuration(srcFlow.value, options.measurementUnit, speedRef)}
          />
        );
      })}
    </svg>
  );
};

