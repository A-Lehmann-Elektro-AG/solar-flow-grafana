import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  const iconOptions = [
    { value: 'battery', label: 'Battery' },
    { value: 'evPanel', label: 'EV Panel' },
    { value: 'solarPanel', label: 'Solar Panel' },
  ];

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

    // ── Additional Sources ────────────────────────────────
    .addSelect({
      path: 'additionalSourceCount',
      name: 'Number of Additional Sources',
      description: 'How many additional energy sources to show (battery, wallbox, etc.)',
      defaultValue: 0,
      settings: {
        options: [
          { value: 0, label: '0 — None' },
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
        ],
      },
      category: ['Additional Sources'],
    })

    // ── Source 1 ──────────────────────────────────────────
    .addFieldNamePicker({
      path: 'additionalSourceLoadQuery',
      name: 'Value',
      description: 'Energy value field',
      defaultValue: '',
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })
    .addFieldNamePicker({
      path: 'additionalSourceSOCQuery',
      name: 'SOC Value',
      description: 'State of Charge field (optional)',
      defaultValue: '',
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })
    .addTextInput({
      path: 'additionalSourceLabel',
      name: 'Label',
      description: 'Label for this source',
      defaultValue: 'Battery',
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })
    .addSelect({
      path: 'additionalSourceIcon',
      name: 'Icon',
      defaultValue: 'battery',
      settings: { options: iconOptions },
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })
    .addColorPicker({
      path: 'additionalSourceColor',
      name: 'Color',
      defaultValue: 'rgb(81, 187, 67)',
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })
    .addBooleanSwitch({
      path: 'additionalSourceAlwaysShow',
      name: 'Always Show',
      description: 'Show even when value is 0',
      defaultValue: false,
      category: ['Additional Sources', 'Source 1'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 1,
    })

    // ── Source 2 ──────────────────────────────────────────
    .addFieldNamePicker({
      path: 'additionalSource2LoadQuery',
      name: 'Value',
      description: 'Energy value field',
      defaultValue: '',
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })
    .addFieldNamePicker({
      path: 'additionalSource2SOCQuery',
      name: 'SOC Value',
      description: 'State of Charge field (optional)',
      defaultValue: '',
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })
    .addTextInput({
      path: 'additionalSource2Label',
      name: 'Label',
      description: 'Label for this source',
      defaultValue: 'Wallbox',
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })
    .addSelect({
      path: 'additionalSource2Icon',
      name: 'Icon',
      defaultValue: 'evPanel',
      settings: { options: iconOptions },
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })
    .addColorPicker({
      path: 'additionalSource2Color',
      name: 'Color',
      defaultValue: 'rgb(156, 39, 176)',
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })
    .addBooleanSwitch({
      path: 'additionalSource2AlwaysShow',
      name: 'Always Show',
      description: 'Show even when value is 0',
      defaultValue: false,
      category: ['Additional Sources', 'Source 2'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 2,
    })

    // ── Source 3 ──────────────────────────────────────────
    .addFieldNamePicker({
      path: 'additionalSource3LoadQuery',
      name: 'Value',
      description: 'Energy value field',
      defaultValue: '',
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
    })
    .addFieldNamePicker({
      path: 'additionalSource3SOCQuery',
      name: 'SOC Value',
      description: 'State of Charge field (optional)',
      defaultValue: '',
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
    })
    .addTextInput({
      path: 'additionalSource3Label',
      name: 'Label',
      description: 'Label for this source',
      defaultValue: 'Wallbox 2',
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
    })
    .addSelect({
      path: 'additionalSource3Icon',
      name: 'Icon',
      defaultValue: 'evPanel',
      settings: { options: iconOptions },
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
    })
    .addColorPicker({
      path: 'additionalSource3Color',
      name: 'Color',
      defaultValue: 'rgb(255, 152, 0)',
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
    })
    .addBooleanSwitch({
      path: 'additionalSource3AlwaysShow',
      name: 'Always Show',
      description: 'Show even when value is 0',
      defaultValue: false,
      category: ['Additional Sources', 'Source 3'],
      showIf: (opts) => (opts.additionalSourceCount ?? 0) >= 3,
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
      path: 'linesColor',
      name: 'Lines',
      description: 'Energy lines color',
      defaultValue: 'rgb(104, 193, 255)',
      category: ['Colors'],
    });
});
