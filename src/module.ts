import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addColorPicker({
      path: 'solarColor',
      name: 'Solar Color',
      description: 'Color of the solar energy point',
      defaultValue: 'yellow',
    })
    .addColorPicker({
      path: 'loadColor',
      name: 'Load Color',
      description: 'Color of the load energy point',
      defaultValue: 'blue',
    })
    .addColorPicker({
      path: 'gridColor',
      name: 'Grid Color',
      description: 'Color of the grid energy point',
      defaultValue: 'red',
    })
    .addColorPicker({
      path: 'linesColor',
      name: 'Lines Color',
      description: 'Color of the lines',
      defaultValue: 'black',
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
