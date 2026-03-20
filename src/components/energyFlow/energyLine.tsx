import React from 'react';
import {PointPosition} from './index';
import {FlowData, AdditionalSourceFlow, MeasurementUnit, UNIT_TO_WATTS} from '../../models/flow';
import { animatedLine, animatedLineReverse } from './styles';

interface CustomXarrowProps {
  start: PointPosition;
  end: PointPosition;
  linesColor?: string;
}

interface EnergyLineProps extends CustomXarrowProps {
  className?: string;
  animationDuration?: string;
}

export interface AdditionalSourceLineData {
  point: PointPosition;
  flow: AdditionalSourceFlow;
  alwaysShow: boolean;
}

interface EnergyLinesProps {
  flow: FlowData;
  pvPoint: PointPosition;
  loadPoint: PointPosition;
  gridPoint: PointPosition;
  additionalSources: AdditionalSourceLineData[];
  subJunction: PointPosition | null;  // non-null when 2-3 sources
  linesColor: string;
  showEnergyThreshold: number;
  measurementUnit: MeasurementUnit;
  animationSpeedReference: number;
}

// At `speedReference` watts the animation runs at exactly 1 s per cycle.
const getAnimationDuration = (energy: number, unit: MeasurementUnit, speedReference: number): string => {
  const energyInW = Math.abs(energy) * UNIT_TO_WATTS[unit];
  const duration = Math.max(0.3, Math.min(2.5, speedReference / Math.max(energyInW, 0.001)));
  return `${duration.toFixed(2)}s`;
};


export const EnergyLines: React.FC<EnergyLinesProps> = ({flow, pvPoint, loadPoint, gridPoint, additionalSources, subJunction, linesColor, showEnergyThreshold, measurementUnit, animationSpeedReference}) => {
  const mainHub: PointPosition = { x: pvPoint.x, y: loadPoint.y };
  const sourceCount = additionalSources.length;

  // Aggregated additional energy flowing into main hub (for the sub-junction → hub line)
  const totalAdditionalEnergy = flow.additionalSources.reduce((sum, s) => sum + s.value, 0);

  return (
    <>
      {/* Core lines: PV→hub, hub→Grid, hub→Load (empty backgrounds) */}
      <EmptyLine start={{x: pvPoint.x + 2, y: loadPoint.y}} end={gridPoint} />
      <EmptyLine start={pvPoint} end={{x: pvPoint.x, y: loadPoint.y - 2}} />
      <EmptyLine start={{x: pvPoint.x - 2, y: loadPoint.y}} end={loadPoint} />

      {/* ── Additional sources lines ───────────────────── */}
      {sourceCount === 1 && (() => {
        const src = additionalSources[0];
        const srcFlow = flow.additionalSources[0];
        if (!srcFlow) { return null; }
        const visible = Math.abs(srcFlow.value) > showEnergyThreshold || src.alwaysShow;
        return visible ? (
          <>
            <EmptyLine start={src.point} end={{x: mainHub.x, y: mainHub.y + 2}} />
            {Math.abs(srcFlow.value) > showEnergyThreshold && (
              <EnergyLine start={src.point} end={mainHub} linesColor={linesColor} className={srcFlow.value < 0 ? animatedLine : animatedLineReverse} animationDuration={getAnimationDuration(srcFlow.value, measurementUnit, animationSpeedReference)} />
            )}
          </>
        ) : null;
      })()}

      {sourceCount >= 2 && subJunction && (() => {
        if (flow.additionalSources.length === 0) { return null; }
        const anyVisible = flow.additionalSources.some((s, i) =>
          Math.abs(s.value) > showEnergyThreshold || additionalSources[i].alwaysShow
        );
        if (!anyVisible) { return null; }

        const xs = additionalSources.map(s => s.point.x).sort((a, b) => a - b);
        const sjY = subJunction.y;

        return (
          <>
            {/* Horizontal bar at sub-junction height connecting all sources */}
            <EmptyLine start={{ x: xs[0], y: sjY }} end={{ x: xs[xs.length - 1], y: sjY }} />

            {/* Each source: vertical empty line from source to sub-junction height */}
            {additionalSources.map((src, i) => {
              const srcFlow = flow.additionalSources[i];
              const visible = Math.abs(srcFlow?.value ?? 0) > showEnergyThreshold || src.alwaysShow;
              if (!visible) { return null; }
              return (
                <EmptyLine key={`el-${src.point.x}`} start={src.point} end={{ x: src.point.x, y: sjY }} />
              );
            })}

            {/* Vertical empty line from sub-junction up to main hub */}
            <EmptyLine start={{ x: mainHub.x, y: mainHub.y + 2 }} end={subJunction} />

            {/* Each source: vertical animated line from source center to sub-junction height */}
            {additionalSources.map((src, i) => {
              const srcFlow = flow.additionalSources[i];
              if (!srcFlow || Math.abs(srcFlow.value) <= showEnergyThreshold) { return null; }
              return (
                <React.Fragment key={`as-${src.point.x}`}>
                  {/* Vertical: source → sub-junction Y at source's X */}
                  <EnergyLine
                    start={src.point}
                    end={{ x: src.point.x, y: sjY }}
                    linesColor={linesColor}
                    className={srcFlow.value < 0 ? animatedLine : animatedLineReverse}
                    animationDuration={getAnimationDuration(srcFlow.value, measurementUnit, animationSpeedReference)}
                  />
                  {/* Horizontal: source's X at sub-junction Y → sub-junction center */}
                  {src.point.x !== subJunction.x && (
                    <EnergyLine
                      start={{ x: src.point.x, y: sjY }}
                      end={subJunction}
                      linesColor={linesColor}
                      className={srcFlow.value < 0 ? animatedLine : animatedLineReverse}
                      animationDuration={getAnimationDuration(srcFlow.value, measurementUnit, animationSpeedReference)}
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* Aggregated animated line from sub-junction to main hub */}
            {Math.abs(totalAdditionalEnergy) > showEnergyThreshold && (
              <EnergyLine start={subJunction} end={mainHub} linesColor={linesColor} className={totalAdditionalEnergy < 0 ? animatedLine : animatedLineReverse} animationDuration={getAnimationDuration(totalAdditionalEnergy, measurementUnit, animationSpeedReference)} />
            )}
          </>
        );
      })()}

      {/* Grid line */}
      {Math.abs(flow.grid) > showEnergyThreshold && (
        <EnergyLine start={mainHub} end={gridPoint} linesColor={linesColor} className={flow.grid < 0 ? animatedLineReverse : animatedLine} animationDuration={getAnimationDuration(flow.grid, measurementUnit, animationSpeedReference)} />
      )}

      {/* Solar line */}
      {flow.pv > showEnergyThreshold && (
        <EnergyLine start={pvPoint} end={mainHub} linesColor={linesColor} className={animatedLineReverse} animationDuration={getAnimationDuration(flow.pv, measurementUnit, animationSpeedReference)} />
      )}

      {/* Load line */}
      {flow.load > showEnergyThreshold && (
        <EnergyLine start={mainHub} end={loadPoint} linesColor={linesColor} className={animatedLineReverse} animationDuration={getAnimationDuration(flow.load, measurementUnit, animationSpeedReference)} />
      )}
    </>
  );
};


const EnergyLine: React.FC<EnergyLineProps> = ({start, end, className, linesColor = 'rgb(104, 193, 255)', animationDuration = '1s'}) => (
  <line
    x1={start.x} y1={start.y}
    x2={end.x} y2={end.y}
    stroke={linesColor}
    strokeWidth="8"
    style={{
      filter: `drop-shadow(0px 0px 4px ${linesColor}) drop-shadow(0px 0px 8px ${linesColor})`,
      ['--animation-duration' as string]: animationDuration,
    } as React.CSSProperties}
    className={className || ''}
  />
);

const EmptyLine: React.FC<CustomXarrowProps> = ({start, end, linesColor = 'rgb(104, 193, 255)'}) => (
  <line
    x1={start.x} y1={start.y}
    x2={end.x} y2={end.y}
    stroke="rgba(52,52,52, 0.7)"
    strokeWidth="4"
    style={{filter: `drop-shadow(0px 0px 0.8px ${linesColor})`}}
  />
);
