import React, {useEffect} from 'react';
import './index.css';
import {bluePoint, Point, purplePoint, yellowPoint} from "./energyPoint";
import {FlowData, FlowType} from "../../models/flow";
import {EnergyLines} from "./energyLine";
import {EnergyFlowCore} from "../../services/energyFlowCore";

export interface PointPosition {
  x: number;
  y: number;
}

export interface EnergyFlowProps {
  data: any
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({data}) => {
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
  }, []);

  useEffect(() => {
    (async () => {
      setFlowData(await EnergyFlowCore.getNewFlowData(pv, grid));
    })();
  }, []);

  const pvPoint: PointPosition = {x: 275, y: 200};
  const loadPoint: PointPosition = {x: 100, y: 450};
  const gridPoint: PointPosition = {x: 450, y: 450};

  return (
    <div className="node position-relative"
         style={{height: '250px', top: '0px', left: '-35px'}}>
      <div style={{position: 'absolute', top: '100px', left: '0px'}}>
        {/*<h3 style={{position: 'absolute', top: '-450px', left: '170px', width: "200px"}}>Energy Flow</h3>*/}
        <div className="line-holder" style={{position: 'absolute', bottom: '500px', left: '0px'}}>
          <svg width="500" height="500" style={{position: 'absolute', top: '50px', left: '0'}} viewBox='0 0 500 500'>
            <EnergyLines flow={flowData.flowType} pvPoint={pvPoint} loadPoint={loadPoint} gridPoint={gridPoint}/>
          </svg>
        </div>

        <div className="line-holder" style={{position: 'absolute', bottom: '0px', left: '25px'}}>
          <div className="point-holder" style={{position: 'absolute', top: '-300px', left: '150px'}}>
            <Point label="PV" value={flowData.pv} style={yellowPoint} icon="icons/solar-panel-solid.svg"/>
          </div>
          <div className="point-holder" style={{position: 'absolute', top: '-110px', left: '50px'}}>
            <Point label="Load" value={flowData.load} style={bluePoint} icon="icons/electrical_services.svg"/>
            <Point label="Grid" value={flowData.grid} style={purplePoint} icon='icons/electric_meter.svg'/></div>
        </div>
      </div>
    </div>
  );
};
