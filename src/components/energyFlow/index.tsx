import React, {useEffect} from 'react';
import './index.css';
import {customPoint, Point} from "./energyPoint";
import {FlowData} from "../../models/flow";
import {EnergyFlowCore} from "../../services/energyFlowCore";
import {EnergyLines} from "./energyLine";
import {useTheme} from "@grafana/ui";

export interface PointPosition {
  x: number;
  y: number;
}

export interface EnergyFlowProps {
  data: any,
  options: any
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({data, options}) => {
  const theme = useTheme();

  let grid = 0;
  let pv = 0;
  let additionalSource = 0;
  let additionalSourceSOC = 0;

  // Look for matching data in the series
  for(let seriesIndex = 0; seriesIndex < data.series.length; seriesIndex++) {
    for(let fieldIndex = 0; fieldIndex < data.series[seriesIndex].fields.length; fieldIndex++) {
      if (data.series[seriesIndex].fields[fieldIndex].name === options.solarQuery) {
        pv = data.series[seriesIndex].fields[fieldIndex].values[0];
      }
    }
    for(let fieldIndex = 0; fieldIndex < data.series[seriesIndex].fields.length; fieldIndex++) {
      if (data.series[seriesIndex].fields[fieldIndex].name === options.gridQuery) {
        grid = data.series[seriesIndex].fields[fieldIndex].values[0];
      }
    }
    for(let fieldIndex = 0; fieldIndex < data.series[seriesIndex].fields.length; fieldIndex++) {
      if (data.series[seriesIndex].fields[fieldIndex].name === options.additionalSourceLoadQuery) {
        additionalSource = data.series[seriesIndex].fields[fieldIndex].values[0];
      }
    }
    for(let fieldIndex = 0; fieldIndex < data.series[seriesIndex].fields.length; fieldIndex++) {
      if (data.series[seriesIndex].fields[fieldIndex].name === options.additionalSourceSOCQuery) {
        additionalSourceSOC = data.series[seriesIndex].fields[fieldIndex].values[0];
      }
    }
  }

  const [flowData, setFlowData] = React.useState<FlowData>({
    pv: 0,
    load: 0,
    grid: 0,
    additionalSource: 0,
    additionalSourceSOC: 0,
  });

  useEffect(() => {
    (async () => {
      setFlowData(await EnergyFlowCore.calculateNewFlowData(pv, grid, additionalSource, additionalSourceSOC, options.measurementUnit));
    })();
  }, [grid, pv, additionalSource, additionalSourceSOC, options.measurementUnit]);

  const pvPoint: PointPosition = {x: 275, y: 250};
  const loadPoint: PointPosition = {x: 100, y: 460};
  const gridPoint: PointPosition = {x: 450, y: 460};
  const additionalPoint: PointPosition = {x: 275, y: 650};

  const icons: { [key: string]: string } = {
    grid: `M360-480q17 0 28.5-11.5T400-520v-120q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640v120q0 17 11.5 28.5T360-480Zm40 240h160v-80q0-33-23.5-56.5T480-400q-33 0-56.5 23.5T400-320v80Zm200-240q17 0 28.5-11.5T640-520v-120q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640v120q0 17 11.5 28.5T600-480ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z`,
    solarPanel: `M133.847-800v-59.999h114.231V-800H133.847Zm-29.614 699.229h345.768v-149.23H133.925l-29.692 149.23Zm138.459-488.152-42.768-41.768 80.769-80.769 42.768 41.768-80.769 80.769Zm-96.614 278.924h303.923v-150.384H176.155l-30.077 150.384ZM480-679.615q-75.307 0-128.037-52.731-52.731-52.73-52.731-128.037h361.536q0 75.307-52.731 128.037-52.73 52.731-128.037 52.731Zm-29.999 163.461v-114.23h59.998v114.23h-59.998Zm59.998 415.383h345.384l-29.692-149.23H509.999v149.23Zm0-209.228h303.538L783.46-460.383H509.999v150.384Zm208.078-278.54-80.538-81.153 41.768-41.768 81.538 80.153-42.768 42.768ZM711.922-800v-59.999h114.231V-800H711.922Z`,
    load: `M720-360v-80h80q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360h-80Zm0 160v-80h80q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200h-80Zm-160 40q-33 0-56.5-23.5T480-240h-80v-160h80q0-33 23.5-56.5T560-480h120v320H560ZM280-280q-66 0-113-47t-47-113q0-66 47-113t113-47h60q25 0 42.5-17.5T400-660q0-25-17.5-42.5T340-720H200q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h140q58 0 99 41t41 99q0 58-41 99t-99 41h-60q-33 0-56.5 23.5T200-440q0 33 23.5 56.5T280-360h80v80h-80Z`,
    battery: `M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Z`,
    evPanel: `m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z`
  };

  if(data.series.length < 1) {
    return (
      <div style={{backgroundColor: "red", padding: "5%", borderRadius: "5px", width: "200px", textAlign: "center"}}>
        <h3>Invalid/Missing data in one of the queries</h3>
      </div>
    );
  }

  // @ts-ignore
  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${(-165 + options.xOffset)}px - 50%)`,
        top: `calc(${(0 - options.yOffset)}px - 50%)`,
        transform: `scale(${options.zoom})`,
        transformOrigin: "270px 0px",
        pointerEvents: "none",
      }}
    >
      <div>
        {/*<h3 style={{position: 'absolute', top: '-450px', left: '170px', width: "200px"}}>Energy Flow</h3>*/}
        <div className="line-holder" style={{ position: 'absolute', bottom: '500px', left: '0px' }}>
          <svg width="500" height="1000" style={{ position: 'absolute', top: '-200px', left: '0' }}
               viewBox='0 0 500 500'>
            <EnergyLines flow={flowData} pvPoint={pvPoint}
                         linesColor={(theme.visualization.getColorByName(options.linesColor))} loadPoint={loadPoint}
                         gridPoint={gridPoint} extraEnergyPoint={additionalPoint} showEnergyThreshold={options.showEnergyThreshold}/>
          </svg>
        </div>

        <div className="line-holder" style={{ position: 'absolute', bottom: '0px', left: '25px' }}>
          <div className="point-holder" style={{ position: 'absolute', top: '-300px', left: '150px' }}>
            <Point label="PV" measurementUnit={options.measurementUnit} showLegend={false} value={flowData.pv}
                   style={customPoint(theme.visualization.getColorByName(options.solarColor))} icon={icons["solarPanel"]} />
          </div>
          {Math.abs(flowData.additionalSource) > options.showEnergyThreshold && (
            <div className="point-holder" style={{ position: 'absolute', top: '100px', left: '150px' }}>
              <Point label={options.additionalSourceLabel} measurementUnit={options.measurementUnit} showLegend={options.showLegend} value={flowData.additionalSource}
                     subValue={flowData.additionalSourceSOC}
                     style={customPoint(theme.visualization.getColorByName(options.additionalSourceColor))} icon={icons[options.additionalSourceIcon]} />
            </div>
          )}
          <div className="point-holder" style={{ position: 'absolute', top: -110, left: '25px' }}>
            <Point showLegend={options.showLegend} measurementUnit={options.measurementUnit} label="Load" value={flowData.load}
                   style={customPoint(theme.visualization.getColorByName(options.loadColor))} icon={icons['load']} />
            <Point showLegend={options.showLegend} measurementUnit={options.measurementUnit} label="Grid" value={flowData.grid}
                   style={customPoint(theme.visualization.getColorByName(options.gridColor))} icon={icons['grid']} />
          </div>
        </div>
      </div>
    </div>
  );
};
