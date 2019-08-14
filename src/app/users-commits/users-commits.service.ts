import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommitterDataModel} from '../model/committer-data.model';
import {CommitDataModel} from '../model/commit-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsersCommitsService {

  private fetchCommitsEndPoint = environment.apiUrl.concat(environment.apiVersion, '/commits');
  private navigateCommitsEndPoint = this.fetchCommitsEndPoint.concat('/url');
  private fetchCommitsAuthorEndPoint = this.fetchCommitsEndPoint.concat('/author');

  constructor(private http: HttpClient) {
  }

  gatherCommits(repoId: string, perPage: string, page: string): Observable<CommitDataModel> {
    const prms = new HttpParams().set('repo_id', repoId).set('per_page', perPage).set('page', page);
    const options = {params: prms, withCredentials: false};

    return this.http.get<CommitDataModel>(this.fetchCommitsEndPoint, options);
  }

  navigate(url: string): Observable<CommitDataModel> {
    const prms = new HttpParams().set('url', url);
    const options = {params: prms, withCredentials: false};

    return this.http.get<CommitDataModel>(this.navigateCommitsEndPoint, options);
  }

  gatherCommitterList(repoId: string, perPage: string, page: string): Observable<CommitterDataModel> {
    const prms = new HttpParams().set('repo_id', repoId).set('per_page', perPage).set('page', page);
    const options = {params: prms, withCredentials: false};

    return this.http.get<CommitterDataModel>(this.fetchCommitsAuthorEndPoint, options);
  }
}
