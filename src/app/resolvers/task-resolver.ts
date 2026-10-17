import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task-service';
import { Router } from '@angular/router';


export const taskResolver : ResolveFn<Task|undefined> = (route)=>{
    const router = inject(Router)
    const taskService = inject(TaskService);
    const id = Number(route.paramMap.get('id'));
    const task = taskService.getById(id)
    if(!task){
          router.navigate(['/tasks']);
          return undefined;
    }
    return task;
     
}