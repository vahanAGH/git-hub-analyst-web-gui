import {PaginationModel} from './pagination.model';
import {CommitModel} from './commit.model';

export class CommitDataModel {
  constructor(public commitList: CommitModel[],
              public pagination: PaginationModel) {
  }
}
