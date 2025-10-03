import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD

export interface ITask {
  _id?: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt?: Date;
}

=======
import { Task } from '../modele/task.model';   // ✅ المسار الصحيح
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c

@Injectable({
  providedIn: 'root'
})
export class TaskService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  updateTaskStatus(id: string, status: string): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, { status });
  }

=======
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

addTask(task: Partial<Task>): Observable<Task> {
  return this.http.post<Task>(this.apiUrl, task);
}


  updateTask(id: string, completed: boolean): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, { completed });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
}
