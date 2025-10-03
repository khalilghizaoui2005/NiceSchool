import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Task } from '../../modele/task.model';   // ✅ المسار الصحيح
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px) scale(0.9)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.8)' }))
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  addTask() {
    if (!this.newTask.trim()) return;

    const newTaskObj: Partial<Task> = {
      title: this.newTask,
      completed: false,
      createdAt: new Date()
    };

    this.taskService.addTask(newTaskObj).subscribe((task: Task) => {
      (task as any).isNew = true;
      this.tasks.push(task as Task & { isNew: boolean });
      this.newTask = '';

      setTimeout(() => {
        (task as any).isNew = false;
      }, 1000);
    });
  }




  toggleTask(task: Task) {
    this.taskService.updateTask(task._id!, !task.completed)
      .subscribe((updated: Task) => task.completed = updated.completed);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id!)
      .subscribe(() => this.tasks = this.tasks.filter(t => t._id !== task._id));
  }
}
