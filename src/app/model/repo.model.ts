export class RepoModel {
  constructor(public id: number, public nodeId: string, public name: string, public fullName: string,
              public ownerId: number, public ownerLogin: string, public ownerNodeId: string,
              public ownerType: string, public htmlUrl: string, public description: string,
              public commitsUrl: string, public issuesUrl: string) {
  }

}
