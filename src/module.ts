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
