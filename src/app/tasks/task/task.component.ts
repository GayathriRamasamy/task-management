import { Component } from '@angular/core';
import { Task, TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  task: Task | undefined | null;
  taskForm: FormGroup<any>;
  id: number | null | undefined = null;
  constructor(
    public taskService: TasksService,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.taskForm = this.formBuilder.group({
      id: this.formBuilder.control(null),
      taskName: this.formBuilder.control(null),
      taskStatus: this.formBuilder.control(null),
    });
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    if (id) {
      this.id = parseInt(id, 10);
      this.taskService.getTask(this.id).subscribe((data: Task | undefined) => {
        this.task = data;
        if (this.task) {
          this.taskForm = this.formBuilder.group({
            id: this.formBuilder.control(this.task.id),
            taskName: this.formBuilder.control(this.task.taskName),
            taskStatus: this.formBuilder.control(this.task.taskStatus),
          });
        }
      });
    } else {
      this.task = null;
    }
  }
  onSubmit() {
    if (this.id) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }
  addTask() {
    let task: Task = this.taskForm?.value;
    this.taskService.addTask(task).subscribe((data: any) => {
      console.log(data);
      // this.task = data;
    });
  }
  updateTask() {
    let task: Task = this.taskForm?.value;
    this.taskService.updateTask(task).subscribe((data: any) => {
      console.log(data);
      // this.task = data;
    });
  }
  navigateBack() {
    this.router.navigateByUrl('/tasks');
  }
}
