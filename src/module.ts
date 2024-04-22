import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
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
