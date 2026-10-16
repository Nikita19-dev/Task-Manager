import { Component ,inject} from '@angular/core';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { Router } from '@angular/router';
import { Task } from '../../models/task';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [ReactiveFormsModule ,MatFormFieldModule , MatCardModule,
    MatInputModule,
    MatButtonModule],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService=inject(TaskService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
title:['' ,Validators.required],
description:[''],
})

save (){
  if(this.form.invalid) return ;
  //getRawValue gets all values of form
  const task:Task ={
      title : this.form.value.title ?? '' ,
      description :this.form.value.description ?? '',
      completed:false
    }
    this.taskService.add(task)
 // this.taskService.add({...this.form.value ,completed:false});
  this.router.navigate(['/tasks']);
}

cancel() {
    this.router.navigate(['/tasks']);
  }
}
