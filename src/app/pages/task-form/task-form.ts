import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    const task = this.route.snapshot.data['task'];
    if (task) {
    this.form.patchValue(task);
  }  
}

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  save() {
    console.log('id is', this.id);
    if (this.form.invalid) return;
    const changes = {
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
    };

   if (this.id) {
    this.taskService.update(this.id, changes);
  } else {
    this.taskService.add({ ...changes, completed: false });
  }
    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
