import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ChartModule} from 'primeng/chart';

import {AppComponent} from './app.component';
import {RepoComponent} from './repo/repo.component';
import {AppRoutes} from './app.routes';
import {AppGuard} from './app.guard';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {UsersCommitsComponent} from './users-commits/users-commits.component';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    RepoComponent,
    UsersCommitsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    AppRoutes,
    FormsModule,
    ToastModule,
    TabViewModule,
    ChartModule
  ],
  providers: [AppGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
