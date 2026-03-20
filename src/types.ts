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
  additionalSourceLoadQuery: any;
  additionalSourceSOCQuery: any;
  showEnergyThreshold: number;
  measurementUnit: 'W' | 'kW' | 'MW';
  animationSpeedReference: number;
  zoom: number;
  xOffset: number;
  yOffset: number;
}
