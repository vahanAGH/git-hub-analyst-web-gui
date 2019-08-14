import {CommitterModel} from './committer.model';

export class CommitterDataModel {

  constructor(public committerList: CommitterModel[], public isShownAdditionalPageLink: boolean) {
  }
}
