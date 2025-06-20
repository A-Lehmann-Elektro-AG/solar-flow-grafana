type SeriesSize = 'sm' | 'md' | 'lg';


export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  valueFirst: boolean;
  showLegend: boolean;
  solarColor: string;
  extraSourceColor: string;
  loadColor: string;
  gridColor: string;
  showEnergyThreshold: number;
  zoom: number;
  xOffset: number;
  yOffset: number;
  solarQuery: any;
  gridQuery: any;
  additionalSourceLoadQuery: any;
  additionalSourceSOCQuery: any;
  additionalSourceLabel: string;
  additionalSourceIcon: string;
  additionalSourceColor: string;
  additionalSourceAlwaysShow: boolean;
  measurementUnit: 'W' | 'kW' | 'MW';
}
