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
  const loadPoint: PointPosition = {x: 100, y: 460};
  const gridPoint: PointPosition = {x: 450, y: 460};

  const gridSVG = `M370.001-107.386v-92.308q-101.385-34.307-165.692-121.999Q140.001-409.385 140.001-522q0-70.769 26.77-132.615 26.769-61.846 72.768-107.846 46-45.999 107.846-72.768 61.846-26.77 131.615-26.77 70.154 0 132.307 26.77 62.154 26.769 108.461 72.768 46.308 46 73.269 107.846Q819.999-592.769 819.999-522q0 112.23-64.616 199.307-64.615 87.077-165.384 121.999v93.308h-59.998v-78.539q-12.693 2.77-25.193 3.347-12.5.577-25.808.577-12.693 0-24.693-.885-12-.885-24.308-3.039v78.539h-59.998Zm-40-502.615h299.998v-59.998H330.001v59.998ZM450-294.232l103.845-103.845-50-50L555.768-500 510-545.768 406.155-441.923l50 50L404.232-340 450-294.232Zs`
  const pvSVG = `M133.847-800v-59.999h114.231V-800H133.847Zm-29.614 699.229h345.768v-149.23H133.925l-29.692 149.23Zm138.459-488.152-42.768-41.768 80.769-80.769 42.768 41.768-80.769 80.769Zm-96.614 278.924h303.923v-150.384H176.155l-30.077 150.384ZM480-679.615q-75.307 0-128.037-52.731-52.731-52.73-52.731-128.037h361.536q0 75.307-52.731 128.037-52.73 52.731-128.037 52.731Zm-29.999 163.461v-114.23h59.998v114.23h-59.998Zm59.998 415.383h345.384l-29.692-149.23H509.999v149.23Zm0-209.228h303.538L783.46-460.383H509.999v150.384Zm208.078-278.54-80.538-81.153 41.768-41.768 81.538 80.153-42.768 42.768ZM711.922-800v-59.999h114.231V-800H711.922Z`
  const loadSVG = `M709.999-370.001v-59.998h120v59.998h-120Zm0 160v-59.998h120v59.998h-120Zm-219.998 40v-80h-80v-139.998h80v-80h179.998v299.998H490.001Zm-360-120v-299.998h280v-140.002h-240v-59.998h299.998v259.998h-280v180.002h180.002v59.998h-240Z`

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
            <Point label="Load" value={flowData.load} style={bluePoint} icon={loadSVG}/>
            <Point label="Grid" value={flowData.grid} style={purplePoint} icon={gridSVG}/></div>
        </div>
      </div>
    </div>
  );
};
