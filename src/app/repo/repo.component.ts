import {Component, OnInit} from '@angular/core';
import {RepoService} from './repo.service';
import {RepoModel} from '../model/repo.model';
import {ErrorHandler} from '../error/error.handler';
import {RepoDataModel} from '../model/repo-data.model';
import {PaginationModel} from '../model/pagination.model';
import {CommitModel} from '../model/commit.model';
import {CommitterModel} from '../model/committer.model';
import {UsersCommitsService} from '../users-commits/users-commits.service';
import {environment} from '../../environments/environment';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  tabIndex: number;
  criteria: string;
  repoModelArray: RepoModel[];
  selectedRepoModel: RepoModel;
  repoPagination: PaginationModel;
  incompleteResults: boolean;
  cols: any[];
  totalCount: number;
  totalCountToView: any;
  commitModelArray: CommitModel[];
  committerModelArray: CommitterModel[];
  committerCols: any[];
  loadingCommitterTable: boolean;
  committerDataSource: CommitterModel[];
  committerFirstPage: number;
  committerPageSize: number;
  committerTotalRecords: number;
  chunkOfCommitForStat: number;


  constructor(private repoService: RepoService, private countOfUsersCommitsService: UsersCommitsService,
              private errorHandler: ErrorHandler) {
  }

  ngOnInit() {
    this.tabIndex = 0;
    this.loadingCommitterTable = false;
    this.committerFirstPage = 0;
    this.committerPageSize = environment.defaultPageSize;
    this.chunkOfCommitForStat = 100;
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'fullName', header: 'Name'},
      {field: 'description', header: 'Description'},
      {field: 'htmlUrl', header: 'Url'}
    ];
    this.committerCols = [
      {field: 'id', header: 'Id'},
      {field: 'name', header: 'Name'},
      {field: 'date', header: 'Last commit date'}
    ];
  }

  searchByCriteria(event: MouseEvent) {
    if (this.criteria) {
      this.repoService.searchByCriteria(this.criteria, this.committerPageSize.toString()).subscribe(
        data => {
          data = data as RepoDataModel;
          this.repoDataHandler(data);
          if (this.tabIndex !== 0) {
            this.tabIndex = 0;
          }
        },
        err => {
          this.errorHandler.addSingle(err.error);
        });
    } else {
      this.errorHandler.addSingleInfo();
    }
  }

  getRepos(marker: string) {
    if (this.repoPagination) {
      let url: string;
      switch (marker) {
        case 'first': {
          url = this.repoPagination.first;
          break;
        }
        case 'next': {
          url = this.repoPagination.next;
          break;
        }
        case 'prev': {
          url = this.repoPagination.prev;
          break;
        }
        case 'last': {
          url = this.repoPagination.last;
          break;
        }
        default: {
          console.error('Pagination should be one of first, next, prev, last');
        }
      }
      this.repoService.navigate(url).subscribe(
        data => {
          data = data as RepoDataModel;

          this.repoDataHandler(data);
        },
        err => {
          this.errorHandler.addSingle(err.error);
        }
      );
    } else {
      console.error('Pagination object is null');
    }
  }

  onRowSelect(event) {
    this.fillCommitterTable(0);
    this.getCommitStatisticData();
  }

  loadCommitterLazy(event: LazyLoadEvent) {
    this.fillCommitterTable(event.first);
  }

  private fillCommitterTable(firstRecIndex: number) {
    const sModel = this.selectedRepoModel;
    const p = (firstRecIndex / this.committerPageSize) + 1;
    if (sModel && sModel.id) {
      this.loadingCommitterTable = true;
      this.countOfUsersCommitsService
      .gatherCommitterList(sModel.id.toString(), this.committerPageSize.toString(), p.toString())
      .subscribe(data => {
          this.committerDataSource = data.committerList;
          this.committerTotalRecords = data.isShownAdditionalPageLink ? data.committerList.length + 1 : data.committerList.length;
          this.committerModelArray = this.committerDataSource.slice(firstRecIndex, (firstRecIndex + this.committerPageSize));
          this.loadingCommitterTable = false;
        },
        err => {
          this.errorHandler.addSingle(err.error);
          this.eraseCommitterModels();
          this.loadingCommitterTable = false;
        }
      );
    } else {
      this.eraseCommitterModels();
    }
  }

  private getCommitStatisticData() {
    const sModel = this.selectedRepoModel;
    if (sModel && sModel.id) {
      this.countOfUsersCommitsService
      .gatherCommits(sModel.id.toString(), this.chunkOfCommitForStat.toString(), '1')
      .subscribe(data => {
          this.commitModelArray = data.commitList;
        },
        err => {
          this.errorHandler.addSingle(err.error);
        }
      );
    } else {
      this.errorHandler
      .addSingle({
        timestamp: Date.now().toString(),
        status: 201,
        error: 'Corrupted data',
        message: 'Repo ID is missing',
        path: null
      });
    }
  }

  private repoDataHandler(data: RepoDataModel): void {
    data = data as RepoDataModel;
    if (data.totalCount === 0) {
      this.errorHandler.addSingleInfo();
      this.eraseRepoModels();
      this.eraseCommitterModels();
    } else {
      this.eraseCommitterModels();
      this.incompleteResults = data.incompleteResults;
      this.totalCount = data.totalCount;
      this.totalCountToView = this.incompleteResults ? 'costs to calculate is high' : this.totalCount;
      this.repoModelArray = data.githubRepoList;
      this.repoPagination = data.pagination;
    }
  }

  private eraseRepoModels(): void {
    this.totalCountToView = 0;
    this.repoModelArray = [];
    this.selectedRepoModel = null;
    this.repoPagination = null;
  }

  private eraseCommitterModels(): void {
    this.committerFirstPage = 0;
    this.committerTotalRecords = 0;
    this.committerDataSource = [];
    this.committerModelArray = [];
    this.selectedRepoModel = null;
  }
}
