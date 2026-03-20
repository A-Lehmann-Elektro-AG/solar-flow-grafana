export interface SimpleOptions {
  showLegend: boolean;
  solarColor: string;
  loadColor: string;
  gridColor: string;
  linesColor: string;
  additionalSourceColor: string;
  additionalSourceLabel: string;
  additionalSourceIcon: string;
  additionalSourceAlwaysShow: boolean;
  solarQuery: any;
  gridQuery: any;
  loadQuery: any;
  additionalSourceLoadQuery: any;
  additionalSourceSOCQuery: any;
  showEnergyThreshold: number;
  measurementUnit: 'W' | 'kW' | 'MW' | 'auto';
  animationSpeedReference: number;
  zoom: number;
  xOffset: number;
  yOffset: number;
}
