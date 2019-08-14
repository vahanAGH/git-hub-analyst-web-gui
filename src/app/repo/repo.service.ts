import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {RepoDataModel} from '../model/repo-data.model';
import {CommitModel} from '../model/commit.model';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private searchPublicReposEndPoint = environment.apiUrl.concat(environment.apiVersion, '/repos');
  private navigatePublicReposEndPoint = this.searchPublicReposEndPoint.concat('/url');

  constructor(private http: HttpClient) {
  }

  searchByCriteria(criteria: string, perPage: string): Observable<RepoDataModel> {
    const prms = new HttpParams().set('criteria', criteria)
                                 .set('per_page', perPage);
    const options = prms ? {params: prms, withCredentials: false} : {withCredentials: false};

    return this.http.get<RepoDataModel>(this.searchPublicReposEndPoint, options);
  }

  navigate(url: string): Observable<RepoDataModel> {
    const prms = new HttpParams().set('url', url);
    const options = {params: prms, withCredentials: false};

    return this.http.get<RepoDataModel>(this.navigatePublicReposEndPoint, options);
  }
}
