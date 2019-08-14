import {Component, Input, OnInit} from '@angular/core';
import {CommitModel} from '../model/commit.model';
import {PieChartDataModel} from '../model/pie-chart-data.model';
import randomColor from 'randomcolor';
import {PieChartDataSetModel} from '../model/pie-chart-data-set.model';


@Component({
  selector: 'app-count-of-users-commits',
  templateUrl: './users-commits.component.html',
  styleUrls: ['./users-commits.component.css']
})
export class UsersCommitsComponent implements OnInit {
  @Input() selectedRepoName: string;
  pieChartCommitsPerUser: PieChartDataModel;
  dOptions: any;
  barChartCommitsTimeline: any;
  bOptions: any;

  constructor() {
  }

  @Input()
  private set commitsData(commitModels: CommitModel[]) {
    if (commitModels) {
      this.composePieChartForCommitsPerUser(commitModels);
      this.composeBarChartForCommitsTimeLine(commitModels);
    } else {
      this.pieChartCommitsPerUser = null;
    }
  }

  ngOnInit() {
    // @ts-ignore
    Date.prototype.addDays = function(days) {
      const date = new Date(this.valueOf());
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() + days);
      return date;
    };

    // @ts-ignore
    Date.prototype.addMonths = function(months) {
      const date = new Date(this.valueOf());
      date.setUTCDate(1);
      date.setUTCMonth(date.getUTCMonth() + months);
      return date;
    };

    this.dOptions = {
      title: {
        display: true,
        text: 'Commits count per user',
        fontSize: 16
      },
      legend: {
        position: 'left'
      }
    };

    this.bOptions = {
      title: {
        display: true,
        text: 'Commits count per month',
        fontSize: 16
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            type: 'time',
            display: 'auto',
            min: 0
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: 'auto',
            min: 0
          }
        }]
      }
    };
  }


  private composePieChartForCommitsPerUser(commitModels: CommitModel[]) {
    const labels = [];
    const data = [];
    const backgroundColor = [];
    const hoverBackgroundColor = [];
    const map = this.transformCommitModelsToCommitsPerUserMap(commitModels);
    map.forEach(o => {
      labels.push(o.name);
      data.push(o.count);
      const color = randomColor({
        count: 2
      });
      backgroundColor.push(color[0]);
      hoverBackgroundColor.push(color[1]);
    });
    this.pieChartCommitsPerUser = new PieChartDataModel([], []);
    this.pieChartCommitsPerUser.labels = labels;
    this.pieChartCommitsPerUser.datasets.push(new PieChartDataSetModel(data, backgroundColor, hoverBackgroundColor));
  }

  private composeBarChartForCommitsTimeLine(commitModels: CommitModel[]) {
    if (commitModels.length !== 0) {
      const lastElemIdx = commitModels.length - 1;
      const fromDate = commitModels[lastElemIdx].date;
      const toDate = commitModels[0].date;
      const range = this.getDateRangeWithInterval(fromDate, toDate, 'month', 1);
      const retMap = this.transformCommitModelsToCommitsTimeline(commitModels, range);
      const color = randomColor({
        count: 2
      });
      this.barChartCommitsTimeline = {
        labels: Array.from(retMap.keys()),
        datasets: [
          {
            backgroundColor: color[0],
            borderColor: color[1],
            data: Array.from(retMap.values())
          }
        ]
      };
    } else {
      this.barChartCommitsTimeline = null;
    }
  }

  private getDateRangeWithInterval(startDate: Date, endDate: Date, intervalDuration: string, interval: number): Date[] {
    // @ts-ignore
    let addFn = Date.prototype.addDays;
    if (intervalDuration && 'month' === intervalDuration.toLowerCase()) {
      // @ts-ignore
      addFn = Date.prototype.addMonths;
    }

    interval = interval || 1;
    const retVal = [];
    let current = new Date(startDate);
    const toDate = new Date(endDate);

    while (current <= toDate) {
      retVal.push(current);
      current = addFn.call(current, interval);
    }
    return retVal;
  }

  private transformCommitModelsToCommitsPerUserMap(commitModels: CommitModel[]): Map<number, any> {
    const map = new Map<number, any>();
    commitModels.forEach((commitModel) => {
      const id = commitModel.committer.id;
      let o = map.get(id);
      if (o) {
        o.count++;
      } else {
        o = {count: 1, name: commitModel.committer.name};
        map.set(id, o);
      }
    });
    return map;
  }

  private transformCommitModelsToCommitsTimeline(commitModels: CommitModel[], range: Date[]): Map<string, number> {
    const map = new Map<string, number>();
    range.forEach(d => {
      map.set(this.convertDateToMonthYearString(d), 0);
    });
    commitModels.forEach((commitModel) => {
      const date = new Date(commitModel.date);
      const key = this.convertDateToMonthYearString(date);
      map.set(key, map.get(key) + 1);
    });

    return map;
  }

  private convertDateToMonthYearString(date: Date): string {
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear().toString().slice(2);
    return month.toString() + ' / ' + year;
  }

}
