import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }

  getAllUser() {
    return this.httpClient.get<{ tab: any }>(this.userURL);
  }
  getAllTeacher() {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/teacher");
  }
  getAllStudent() {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/student");
  }
  getStudentsClasse(id: string) {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/studentsClasse/" + id);
  }
  getUserById(id: string) {
    return this.httpClient.get<{ userObj: any }>(this.userURL + "/" + id);
  }
  getStudentById(id: string) {
    return this.httpClient.get<{ userObj: any }>(this.userURL + "/student/" + id);
  }
  getStudentEvalByTel(tel: string) {
    return this.httpClient.get<{ evaluations: any[] }>(
      this.userURL + "/studentEval/" + tel
    );
  }


  deleteUser(id: string) {
    return this.httpClient.delete<{ msg: string, info: string, error: string }>(this.userURL + "/deleteUser/" + id);
  }
  deleteAlluser() {
    return this.httpClient.delete(this.userURL);
  }
  addUser(obj: any, photo: File) {
    const fData = new FormData();
    fData.append("photo", photo);
    fData.append("firstName", obj.firstName);
    fData.append("lastName", obj.lastName);
    fData.append("email", obj.email);
    fData.append("tel", obj.tel);
    fData.append("adr", obj.address);
    fData.append("pass", obj.password);
    fData.append("role", obj.role);

    return this.httpClient.post<{ msg: string }>(this.userURL + "/signup", fData);
  }
  addAdmin(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.userURL + "/signupAdmin", obj);
  }
  addUserTeacher(obj: any, cv: File) {
    const fData = new FormData();
    fData.append("cv", cv);
    fData.append("firstName", obj.firstName);
    fData.append("lastName", obj.lastName);
    fData.append("email", obj.email);
    fData.append("tel", obj.tel);
    fData.append("adr", obj.address);
    fData.append("pass", obj.password);
    fData.append("spec", obj.speciality);
    fData.append("role", obj.role);

    return this.httpClient.post<{ msg: string }>(this.userURL + "/signupTeacher", fData);
  }

  editUser(newUserObj: any) {
    return this.httpClient.put<{ msg: boolean }>(this.userURL + "/editUser", newUserObj);
  }
  checkTelParent(tel: number) {
    return this.httpClient.get<{ isTel: boolean }>(this.userURL + "/checkTel/" + tel);
  }
  login(object: any) {
    return this.httpClient.post<{ msg: string, user: any }>(this.userURL + "/login", object);
  }
  loginParent(object: any) {
    return this.httpClient.post<{ msg: string, user: any }>(this.userURL + "/loginParent", object);
  }
  adduserParent(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.userURL + "/signupParent", obj);
  }
  valideTeacher(id: string) {
    return this.httpClient.get<{ msg: string }>(this.userURL + "/valideTeacher/" + id);
  }
}

