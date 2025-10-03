import { Component } from '@angular/core';
import { ITask, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent {
  task: ITask = { title: '', status: 'todo' };

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.task.title.trim()) return;

    this.taskService.addTask(this.task).subscribe(() => {
      this.task = { title: '', status: 'todo' };
      alert('✅ Task added');
    });
  }
}
