import { Component ,inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  imports: [MatCardModule, MatListModule, MatButtonModule, MatIconModule ,RouterLink],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  taskService = inject(TaskService) ;


}
