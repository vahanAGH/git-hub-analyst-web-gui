import {CommitterModel} from './committer.model';

export class PieChartDataSetModel {
  constructor(public data: number[], public backgroundColor: string[], public hoverBackgroundColor: string[]) {
  }
}
