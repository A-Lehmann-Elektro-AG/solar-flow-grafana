export interface SimpleOptions {
  showLegend: boolean;
  solarColor: string;
  loadColor: string;
  gridColor: string;
  linesColor: string;
  solarQuery: any;
  gridQuery: any;
  loadQuery: any;
  showEnergyThreshold: number;
  measurementUnit: 'W' | 'kW' | 'MW' | 'auto';
  animationSpeedReference: number;
  padding: number;

  // Additional sources (up to 3)
  additionalSourceCount: number;

  // Source 1 — keeps original field names for backward compatibility
  additionalSourceLoadQuery: any;
  additionalSourceSOCQuery: any;
  additionalSourceLabel: string;
  additionalSourceIcon: string;
  additionalSourceColor: string;
  additionalSourceAlwaysShow: boolean;

  // Source 2
  additionalSource2LoadQuery: any;
  additionalSource2SOCQuery: any;
  additionalSource2Label: string;
  additionalSource2Icon: string;
  additionalSource2Color: string;
  additionalSource2AlwaysShow: boolean;

  // Source 3
  additionalSource3LoadQuery: any;
  additionalSource3SOCQuery: any;
  additionalSource3Label: string;
  additionalSource3Icon: string;
  additionalSource3Color: string;
  additionalSource3AlwaysShow: boolean;
}
