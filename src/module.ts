import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addFieldNamePicker({
      path: 'solarQuery',
      name: 'Solar Value',
      description: 'Select the field for the solar data',
      defaultValue: '',
    })
    .addFieldNamePicker({
      path: 'gridQuery',
      name: 'Grid Value',
      description: 'Select the field for the load data',
      defaultValue: '',
    })
    .addFieldNamePicker({
      path: "additionalSourceLoadQuery",
      name: 'Additional Source Value',
      description: 'Select the field for the Additional source (Battery, EV Panel, etc.) - Deselect to remove',
      defaultValue: '',
    })
    .addFieldNamePicker({
      path: "additionalSourceSOCQuery",
      name: 'Additional Source SOC Value',
      description: 'Select the field for the Additional sources SOC (Battery, EV Panel, etc.) - Deselect to remove',
      defaultValue: '',
    })
    .addTextInput({
      path: 'additionalSourceLabel',
      name: 'Additional Source Label',
      description: 'Label for the Additional source',
      defaultValue: 'Battery',
    })
    .addBooleanSwitch({
      path: 'additionalSourceAlwaysShow',
      name: 'Always show additional source',
      description: 'Always show the additional source, even if input is 0',
      defaultValue: false,
    })
    .addSelect({
      path: 'measurementUnit',
      name: 'Select Measurement Unit',
      description: 'auto: displays W below 1000, kW above',
      defaultValue: 'kW',
      settings: {
        options: [
          { value: 'auto', label: 'Auto (W / kW)' },
          { value: 'kW', label: 'kW' },
          { value: 'W', label: 'W' },
        ],
      }
    })
    .addSelect({
      path: 'additionalSourceIcon',
      name: 'Additional Source Icon',
      description: 'Icon for the Additional source',
      defaultValue: 'battery',
      settings: {
        options: [
          { value: 'battery', label: 'Battery' },
          { value: 'evPanel', label: 'EV Panel' },
          { value: 'solarPanel', label: 'Solar Panel' },
        ],
      }
    })
    .addNumberInput({
        path: 'showEnergyThreshold',
        name: 'Energy line threshold',
        description: 'Threshold for showing energy lines',
        defaultValue: 0,
      }
    )
    .addSliderInput({
      path: 'animationSpeedReference',
      name: 'Animation speed reference (W)',
      description: 'Power level (in watts) at which the animation runs at 1 s per cycle. Lower = faster at low values; higher = slower until high values.',
      defaultValue: 400,
      settings: {
        min: 100,
        max: 5000,
        step: 100,
      },
    })
    .addSliderInput(
      {
        path: 'zoom',
        name: 'Zoom',
        defaultValue: 1,
        settings: {
          min: 0.1,
          max: 3,
          step: 0.05,
        },
      }
    )
    .addSliderInput({
      path: 'xOffset',
      name: 'Offset',
      description: 'X-Offset',
      defaultValue:   0,
      settings: {
        min: -500,
        max: 500,
        step: 1,
      },
    })
    .addSliderInput(
      {
        path: 'yOffset',
        name: '',
        description: 'Y-Offset',
        defaultValue: 0,
        settings: {
          min: -500,
          max: 500,
          step: 1,
        },
      }
    )
    .addColorPicker({
      path: 'solarColor',
      name: 'Color palette',
      description: 'Solar Color',
      defaultValue: 'rgb(244, 174, 1)',
    })
    .addColorPicker({
      path: 'loadColor',
      name: '',
      description: 'Load Color',
      defaultValue: 'rgb(0, 141, 209)',
    })
    .addColorPicker({
      path: 'gridColor',
      name: '',
      description: 'Grid Color',
      defaultValue: 'rgb(232, 41, 26)',
    })
    .addColorPicker({
      path: 'additionalSourceColor',
      name: '',
      description: 'Additional Source Color',
      defaultValue: 'rgb(81, 187, 67)',
    })
    .addColorPicker({
      path: 'linesColor',
      name: '',
      description: 'Lines Color',
      defaultValue: 'rgb(104, 193, 255)',
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show legend',
      description: 'Label the energy points',
      defaultValue: false,
    });
});
