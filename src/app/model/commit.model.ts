import {CommitterModel} from './committer.model';

export class CommitModel {
  constructor(public sha: string, public nodeId: string, public url: string, public committer: CommitterModel, public date: Date) {
  }
}
