
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AddClasseComponent } from './components/add-classe/add-classe.component';
import { FilterStudentsPipe } from './pipes/filter-students.pipe';
import { CoursTableComponent } from './components/cours-table/cours-table.component';
import { ClasseTableComponent } from './components/classe-table/classe-table.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { DashbordTeacherComponent } from './components/dashbord-teacher/dashbord-teacher.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DashbordStudentComponent } from './components/dashbord-student/dashbord-student.component';
import { CoursStudentComponent } from './components/cours-student/cours-student.component';
import { LeaderbordComponent } from './components/leaderbord/leaderbord.component';
import { BannerComponent } from './components/banner/banner.component';
import { EditCoursComponent } from './components/edit-cours/edit-cours.component';
import { EditClasseComponent } from './components/edit-classe/edit-classe.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { CoursTableStudentComponent } from './components/cours-table-student/cours-table-student.component';
import { AdminNotificationComponent } from './components/admin-notification/admin-notification.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashbordAdminComponent,
    UsersTableComponent,
    AddCoursComponent,
    AddClasseComponent,
    FilterStudentsPipe,
    CoursTableComponent,
    ClasseTableComponent,
    EditUserComponent,
    ClasseListComponent,
    StudentsListComponent,
    CoursListComponent,
    TeacherListComponent,
    DashbordTeacherComponent,
    StudentsTableComponent,
    AddNoteComponent,
    DashbordStudentComponent,
    CoursStudentComponent,
    LeaderbordComponent,
    BannerComponent,
    EditCoursComponent,
    EditClasseComponent,
    SignupAdminComponent,
    CoursTableStudentComponent,
    AdminNotificationComponent,
    UserNotificationComponent,
    AddTaskComponent,
    TasksTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
