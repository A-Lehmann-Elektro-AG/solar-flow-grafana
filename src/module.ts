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
    .addSelect({
      path: 'measurementUnit',
      name: 'Select Measurement Unit',
      description: '',
      defaultValue: 'kW',
      settings: {
        options: [
          { value: 'kW', label: 'kW' },
          { value: 'W', label: 'W' },
          // { value: 'MW', label: 'MW' },
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
