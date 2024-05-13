import { Component } from '@angular/core';
import { Task, TasksService } from './tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks: Task[] = [];
  constructor(public taskService: TasksService, public router: Router) {}
  ngOnInit() {
    this.getList();
  }
  getList(){
    this.taskService.getTaskList().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data: any) => {
      console.log(data);
      this.getList();
    });
  }
  navigateTask(id: number) {
    this.router.navigateByUrl('/task/' + id);
  }
  addTask() {
    this.router.navigateByUrl('/task/add');
  }
}
