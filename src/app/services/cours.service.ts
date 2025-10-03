import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  userURL: string = "http://localhost:3000/cours";
  constructor(
    private httpClient: HttpClient) { }
  addCours(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.userURL + "/addCours", obj);
  }
  getAllCours() {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getAllCours");
  }
  getCoursById(id:string) {
    return this.httpClient.get<{ doc: any }>(this.userURL + "/getCoursId/"+id);
  }
  getCoursClasse(id: string) {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getCoursClasse/" + id);
  }
  getCoursStudent(id: string) {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getCoursByClasse/" + id);
  }
  getCoursTeacher(id: string) {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getCoursTeacher/" + id);
  }
  getCoursName(id: string) {
    return this.httpClient.get<{ name: string }>(this.userURL + "/getCoursName/" + id);
  }
  deleteCours(id: string) {
    return this.httpClient.delete<{ msg: boolean,error:string }>(this.userURL + "/deleteCours/" + id);
  }
  editCours(cours: any) {
  return this.httpClient.put<{msg:boolean,error:string}>(this.userURL+`/editCours`, cours);
}

}
