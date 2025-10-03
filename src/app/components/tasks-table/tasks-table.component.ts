import { Component, OnInit } from '@angular/core';
import { ITask, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html'
})
export class TasksTableComponent implements OnInit {
  tasks: ITask[] = [];
  filter: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: ITask[]) => {
      this.tasks = data;
    });
  }

  markAsDone(task: ITask) {
    if (!task._id) return;
    this.taskService.updateTaskStatus(task._id, 'done').subscribe(() => {
      this.loadTasks();
    });
  }

  get filteredTasks() {
    if (this.filter === 'all') return this.tasks;
    return this.tasks.filter(t => t.status === this.filter);
  }
}
