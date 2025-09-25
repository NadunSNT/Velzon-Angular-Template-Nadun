import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test';

export const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'test', component: TestComponent }
];
