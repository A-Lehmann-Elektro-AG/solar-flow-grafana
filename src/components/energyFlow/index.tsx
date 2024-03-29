import React, {useEffect} from 'react';
import './index.css';
import {bluePoint, Point, purplePoint, yellowPoint} from "./energyPoint";
import {FlowData, FlowType} from "../../models/flow";
import {EnergyFlowCore} from "../../services/energyFlowCore";
import {EnergyLines} from "./energyLine";

export interface PointPosition {
  x: number;
  y: number;
}

export interface EnergyFlowProps {
  data: any,
  showLegend: boolean
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({data, showLegend}) => {
  console.log(data.series[1].fields[0].values[0])
  console.log(data.series[0].fields[1].values[0])
  const grid = data.series[0].fields[1].values[0]
  const pv = data.series[1].fields[0].values[0]
  const [flowData, setFlowData] = React.useState<FlowData>({
    flowType: FlowType.overConsumption,
    pv: 0,
    load: 0,
    grid: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      setFlowData(await EnergyFlowCore.getNewFlowData(pv, grid));
    }, 180000);
    return () => clearInterval(interval);
  }, [grid, pv]);

  useEffect(() => {
    (async () => {
      setFlowData(await EnergyFlowCore.getNewFlowData(pv, grid));
    })();
  }, [grid, pv]);


  const pvPoint: PointPosition = {x: 275, y: 200};
  const loadPoint: PointPosition = {x: 100, y: 460};
  const gridPoint: PointPosition = {x: 450, y: 460};

  const gridSVG = `M360-480q17 0 28.5-11.5T400-520v-120q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640v120q0 17 11.5 28.5T360-480Zm40 240h160v-80q0-33-23.5-56.5T480-400q-33 0-56.5 23.5T400-320v80Zm200-240q17 0 28.5-11.5T640-520v-120q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640v120q0 17 11.5 28.5T600-480ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z`
  const pvSVG = `M133.847-800v-59.999h114.231V-800H133.847Zm-29.614 699.229h345.768v-149.23H133.925l-29.692 149.23Zm138.459-488.152-42.768-41.768 80.769-80.769 42.768 41.768-80.769 80.769Zm-96.614 278.924h303.923v-150.384H176.155l-30.077 150.384ZM480-679.615q-75.307 0-128.037-52.731-52.731-52.73-52.731-128.037h361.536q0 75.307-52.731 128.037-52.73 52.731-128.037 52.731Zm-29.999 163.461v-114.23h59.998v114.23h-59.998Zm59.998 415.383h345.384l-29.692-149.23H509.999v149.23Zm0-209.228h303.538L783.46-460.383H509.999v150.384Zm208.078-278.54-80.538-81.153 41.768-41.768 81.538 80.153-42.768 42.768ZM711.922-800v-59.999h114.231V-800H711.922Z`
  const loadSVG = `M720-360v-80h80q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360h-80Zm0 160v-80h80q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200h-80Zm-160 40q-33 0-56.5-23.5T480-240h-80v-160h80q0-33 23.5-56.5T560-480h120v320H560ZM280-280q-66 0-113-47t-47-113q0-66 47-113t113-47h60q25 0 42.5-17.5T400-660q0-25-17.5-42.5T340-720H200q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h140q58 0 99 41t41 99q0 58-41 99t-99 41h-60q-33 0-56.5 23.5T200-440q0 33 23.5 56.5T280-360h80v80h-80Z`

  return (
    <div style={{position: "absolute", left: "-175px", top: "-8px"}}>
      <div>
        {/*<h3 style={{position: 'absolute', top: '-450px', left: '170px', width: "200px"}}>Energy Flow</h3>*/}
        <div className="line-holder" style={{position: 'absolute', bottom: '500px', left: '0px'}}>
          <svg width="500" height="500" style={{position: 'absolute', top: '50px', left: '0'}} viewBox='0 0 500 500'>
            <EnergyLines flow={flowData.flowType} pvPoint={pvPoint} loadPoint={loadPoint} gridPoint={gridPoint}/>
          </svg>
        </div>

        <div className="line-holder" style={{position: 'absolute', bottom: '0px', left: '25px'}}>
          <div className="point-holder" style={{position: 'absolute', top: '-300px', left: '150px'}}>
            <Point label="PV" value={flowData.pv} style={yellowPoint} icon={pvSVG}/>
          </div>
          <div className="point-holder" style={{position: 'absolute', top: -110, left: '50px'}}>
            <Point showLegend={showLegend} label="Load" value={flowData.load} style={bluePoint} icon={loadSVG}/>
            <Point showLegend={showLegend} label="Grid" value={flowData.grid} style={purplePoint} icon={gridSVG}/></div>
        </div>
      </div>
    </div>
  );
};
