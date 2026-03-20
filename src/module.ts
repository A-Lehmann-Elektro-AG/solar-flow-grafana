import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    // ── Data Sources ──────────────────────────────────────
    .addFieldNamePicker({
      path: 'solarQuery',
      name: 'Solar Value',
      description: 'Select the field for the solar data',
      defaultValue: '',
      category: ['Data Sources'],
    })
    .addFieldNamePicker({
      path: 'gridQuery',
      name: 'Grid Value',
      description: 'Select the field for the grid data',
      defaultValue: '',
      category: ['Data Sources'],
    })
    .addFieldNamePicker({
      path: 'loadQuery',
      name: 'Load Value (optional)',
      description: 'Select the field for the actual load from the inverter. If set, overrides the calculated value (PV + Grid + Additional).',
      defaultValue: '',
      category: ['Data Sources'],
    })
    .addSelect({
      path: 'measurementUnit',
      name: 'Measurement Unit',
      description: 'auto: displays W below 1000, kW above',
      defaultValue: 'kW',
      settings: {
        options: [
          { value: 'auto', label: 'Auto (W / kW)' },
          { value: 'kW', label: 'kW' },
          { value: 'W', label: 'W' },
        ],
      },
      category: ['Data Sources'],
    })

    // ── Additional Source ─────────────────────────────────
    .addFieldNamePicker({
      path: "additionalSourceLoadQuery",
      name: 'Value',
      description: 'Select the field for the Additional source (Battery, EV Panel, etc.) - Deselect to remove',
      defaultValue: '',
      category: ['Additional Source'],
    })
    .addFieldNamePicker({
      path: "additionalSourceSOCQuery",
      name: 'SOC Value',
      description: 'Select the field for the Additional sources SOC (Battery, EV Panel, etc.) - Deselect to remove',
      defaultValue: '',
      category: ['Additional Source'],
    })
    .addTextInput({
      path: 'additionalSourceLabel',
      name: 'Label',
      description: 'Label for the Additional source',
      defaultValue: 'Battery',
      category: ['Additional Source'],
    })
    .addSelect({
      path: 'additionalSourceIcon',
      name: 'Icon',
      description: 'Icon for the Additional source',
      defaultValue: 'battery',
      settings: {
        options: [
          { value: 'battery', label: 'Battery' },
          { value: 'evPanel', label: 'EV Panel' },
          { value: 'solarPanel', label: 'Solar Panel' },
        ],
      },
      category: ['Additional Source'],
    })
    .addBooleanSwitch({
      path: 'additionalSourceAlwaysShow',
      name: 'Always Show',
      description: 'Always show the additional source, even if input is 0',
      defaultValue: false,
      category: ['Additional Source'],
    })

    // ── Animation ─────────────────────────────────────────
    .addNumberInput({
      path: 'showEnergyThreshold',
      name: 'Energy Line Threshold',
      description: 'Threshold for showing energy lines',
      defaultValue: 0,
      category: ['Animation'],
    })
    .addSliderInput({
      path: 'animationSpeedReference',
      name: 'Speed Reference (W)',
      description: 'Power level (in watts) at which the animation runs at 1 s per cycle. Lower = faster at low values; higher = slower until high values.',
      defaultValue: 400,
      settings: {
        min: 100,
        max: 5000,
        step: 100,
      },
      category: ['Animation'],
    })

    // ── Layout ────────────────────────────────────────────
    .addSliderInput({
      path: 'padding',
      name: 'Padding',
      description: 'Space between the flow diagram and the panel edges',
      defaultValue: 20,
      settings: {
        min: 0,
        max: 100,
        step: 5,
      },
      category: ['Layout'],
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show Legend',
      description: 'Label the energy points',
      defaultValue: false,
      category: ['Layout'],
    })

    // ── Colors ────────────────────────────────────────────
    .addColorPicker({
      path: 'solarColor',
      name: 'Solar',
      description: 'Solar circle color',
      defaultValue: 'rgb(244, 174, 1)',
      category: ['Colors'],
    })
    .addColorPicker({
      path: 'loadColor',
      name: 'Load',
      description: 'Load circle color',
      defaultValue: 'rgb(0, 141, 209)',
      category: ['Colors'],
    })
    .addColorPicker({
      path: 'gridColor',
      name: 'Grid',
      description: 'Grid circle color',
      defaultValue: 'rgb(232, 41, 26)',
      category: ['Colors'],
    })
    .addColorPicker({
      path: 'additionalSourceColor',
      name: 'Additional Source',
      description: 'Additional source circle color',
      defaultValue: 'rgb(81, 187, 67)',
      category: ['Colors'],
    })
    .addColorPicker({
      path: 'linesColor',
      name: 'Lines',
      description: 'Energy lines color',
      defaultValue: 'rgb(104, 193, 255)',
      category: ['Colors'],
    });
});
