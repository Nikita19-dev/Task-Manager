import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private nextId = 3;

  tasks = signal<Task[]>([
    { id: 1, title: 'Learn Angular', description: 'Practice signals', completed: false },
    { id: 2, title: 'Learn Node.js', description: 'Build Express API', completed: false },
  ]);

  add(task: Task) {
    this.tasks.update(list => [...list, { ...task, id: this.nextId++ }]);
    console.log(this.tasks());
  }

  update(id: number, changes: Partial<Task>) {
    this.tasks.update(list => list.map(t => (t.id === id ? { ...t, ...changes } : t)));
  }

  delete(id: number) {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }

  getById(id: number) {
    return this.tasks().find(t => t.id === id);
  }
}