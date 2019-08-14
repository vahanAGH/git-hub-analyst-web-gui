import {PaginationModel} from './pagination.model';
import {RepoModel} from './repo.model';

export class RepoDataModel {
  constructor(public totalCount: number, public incompleteResults: boolean,
              public pagination: PaginationModel, public githubRepoList: RepoModel[]) {
  }
}
