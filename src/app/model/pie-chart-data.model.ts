import {PieChartDataSetModel} from './pie-chart-data-set.model';

export class PieChartDataModel {
  constructor(public labels: string[], public datasets: PieChartDataSetModel[]) {
  }
}
