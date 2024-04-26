import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addSliderInput(
      {
        path: 'zoom',
        name: 'Zoom',
        description: 'Zoom level of the energy flow',
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
      name: 'X-Offset',
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
        name: 'Y-Offset',
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
      name: 'Solar Color',
      description: 'Color of the solar energy point',
      defaultValue: 'rgb(244, 174, 1)',
    })
    .addColorPicker({
      path: 'loadColor',
      name: 'Load Color',
      description: 'Color of the load energy point',
      defaultValue: 'rgb(0, 141, 209)',
    })
    .addColorPicker({
      path: 'gridColor',
      name: 'Grid Color',
      description: 'Color of the grid energy point',
      defaultValue: 'rgb(232, 41, 26)',
    })
    .addColorPicker({
      path: 'linesColor',
      name: 'Lines Color',
      description: 'Color of the lines',
      defaultValue: 'rgb(104, 193, 255)',
    })
    .addBooleanSwitch({
      path: "valueFirst",
      name: 'Value First',
      description: 'The query value result is the only/first data entry, if not - uncheck',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show legend',
      description: 'Label the energy points',
      defaultValue: false,
    });
});
