import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  userURL: string = "http://localhost:3000/classe";
  constructor(private httpClient: HttpClient) { }
  addClasse(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.userURL + "/addClasse", obj);
  }
  getAllClasse() {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getAllClasse");
  }
  getClasseById(id: string) {
    return this.httpClient.get<{ doc: any }>(this.userURL + "/getClasseId/" + id);
  }
  getClasse(id: any) {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/getClasse/" + id);
  }
  delteClasse(id: any) {
    return this.httpClient.get<{ msg: boolean, error: string }>(this.userURL + "/deleteClasse/" + id);
  }
  editClasse(classe: any) {
  return this.httpClient.put<{msg:boolean,error:string}>(this.userURL+`/editClasse`, classe);
}
}
