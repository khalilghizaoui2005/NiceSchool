import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AddClasseComponent } from './components/add-classe/add-classe.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { CoursTableComponent } from './components/cours-table/cours-table.component';
import { DashbordTeacherComponent } from './components/dashbord-teacher/dashbord-teacher.component';
import { ClasseTableComponent } from './components/classe-table/classe-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DashbordStudentComponent } from './components/dashbord-student/dashbord-student.component';
import { LeaderbordComponent } from './components/leaderbord/leaderbord.component';
import { EditCoursComponent } from './components/edit-cours/edit-cours.component';
import { EditClasseComponent } from './components/edit-classe/edit-classe.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { AdminNotificationComponent } from './components/admin-notification/admin-notification.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signupStudent", component: SignupComponent },
  { path: "signupTeacher", component: SignupComponent },
  { path: "signupParent", component: SignupComponent },
  { path: "signupAdmin", component: SignupAdminComponent },
  { path: "login", component: LoginComponent },
  { path: "loginParent", component: LoginComponent },
  { path: "dashbordAdmin", component: DashbordAdminComponent },
  { path: "dashbordTeacher", component: DashbordTeacherComponent },
  { path: "dashbordStudent", component: DashbordStudentComponent },
  { path: "addCours", component: AddCoursComponent },
  { path: "addCoursClasse", component: AddCoursComponent },
  { path: "addClasse", component: AddClasseComponent },
  { path: "editUser/:id", component: EditUserComponent },
  { path: "editCours/:id", component: EditCoursComponent },
  { path: "editClasse/:id", component: EditClasseComponent },
  { path: "classeList/:id", component: ClasseListComponent },
  { path: "studentsList/:id", component: StudentsListComponent },
  { path: "studentsList/:id/:idC", component: StudentsTableComponent },
  { path: "coursesList/:id", component: CoursListComponent },
  { path: "coursesTeacher/:id", component: CoursTableComponent },
  { path: "classeTable/:id/:idC", component: ClasseTableComponent },
  { path: "addNote/:idC/:id", component: AddNoteComponent },
  { path: "leaderBord", component: LeaderbordComponent },
  { path: "adminNot", component: AdminNotificationComponent },
  { path: "userNot", component:UserNotificationComponent },
  { path: "addTask", component:AddTaskComponent },
  { path: "TaskTable", component:TasksTableComponent },
=======
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: "", component: TodoComponent },
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
