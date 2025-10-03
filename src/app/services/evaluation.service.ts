import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  evalURL: string = "http://localhost:3000/eval";

  constructor(private httpClient: HttpClient) {
  }
  addEval(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.evalURL + "/addEval", obj);
  }
  getEval(id: string) {
    return this.httpClient.get<{ obj: any }>(this.evalURL + "/getEval/" + id);

  }
  compareEvalCours(id: string, idS: string) {
    return this.httpClient.get<{ result: boolean }>(this.evalURL + "/compare/" + id + "/" + idS);

  }
  calculMoy(studentId: string) {
    return this.httpClient.get<{ moyenne: Number }>(this.evalURL + "/moyenne/" + studentId);
  }
}
