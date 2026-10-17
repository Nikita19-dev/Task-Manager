import { Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';
import { TaskForm } from './pages/task-form/task-form';
import { taskResolver } from './resolvers/task-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  {path :'tasks/new',component:TaskForm},
  {path:'tasks/:id/edit' ,component:TaskForm ,resolve:{task:taskResolver}},
  
];