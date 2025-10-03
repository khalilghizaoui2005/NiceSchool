import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITask {
  _id?: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // رابط الـ API الصحيح لمشروعك

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  updateTaskStatus(id: string, status: 'todo' | 'in-progress' | 'done'): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, { status });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
