import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepoComponent} from './repo/repo.component';
import { ErrorHandler } from './error/error.handler';

export const routes: Routes = [
  { path: 'home', component: RepoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorHandler }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);






