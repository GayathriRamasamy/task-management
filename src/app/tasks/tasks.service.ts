import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [
    { id: 1, taskName: 'Analysis the requirement', taskStatus: 'done' },
    { id: 2, taskName: 'Coding the requirement', taskStatus: 'in progress' },
    { id: 3, taskName: 'Testing Application', taskStatus: 'todo' },
    { id: 4, taskName: 'Mege PR', taskStatus: 'todo' },
  ];
  deleteTask(id: number): Observable<any> {
    let index = this.tasks.findIndex((task) => task.id == id);
    if (index) {
      this.tasks.splice(index, 1);
    }
    return of('Deleted Successfully');
  }
  getTaskList(): Observable<any> {
    return of(this.tasks);
  }
  getTask(id: number) {
    let task: Task | undefined = this.tasks.find((task: Task) => task.id == id);
    return of(task);
  }
  updateTask(task: Task) {
    this.tasks.forEach((taskValue: Task) => {
      if (task.id == taskValue.id) {
        taskValue.taskStatus = task.taskStatus;
        taskValue.taskName = task.taskName;
      }
    });
    return of(this.tasks);
  }
  addTask(task: Task): Observable<any> {
    task.id = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push(task);
    return of(' Added Successfully');
  }
  constructor() {}
}
export interface Task {
  id: number;
  taskStatus: string;
  taskName: string;
}
