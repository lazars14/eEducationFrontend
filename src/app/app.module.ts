import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { HttpModule, RequestOptions, XHRBackend, BrowserXhr } from '@angular/http';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { routing } from './app.routing';

import { SessionService, HttpService, AdminGuard, TeacherGuard, StudentGuard, ErrorHandlerService } from './_core/index';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesComponent } from './classes/classes.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GradesComponent } from './grades/grades.component';
import { PaymentsComponent } from './payments/payments.component';
import { ExamEntriesComponent } from './exam-entries/exam-entries.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ExamPeriodsComponent } from './exam-periods/exam-periods.component';
import { CoursesAdminComponent } from './courses-admin/courses-admin.component';
import { NotificationComponent } from './notification/notification.component';
import { CourseComponent } from './course/course.component';
import { ClassComponent } from './class/class.component';
import { CourseNotificationsComponent } from './course-notifications/course-notifications.component';
import { CourseLessonsComponent } from './course-lessons/course-lessons.component';
import { CourseFilesComponent } from './course-files/course-files.component';
import { CourseColloquiumsComponent } from './course-colloquiums/course-colloquiums.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { CollegeDirectionService, ColloquiumResultService, ColloquiumService, CourseFileService,
        CourseLessonService, CourseService, ExamPeriodService, ExamTermService, GradeService, NotificationService,
        PaymentService, RankService, StudentAttendsCourseService, StudentDocumentService, StudentExamEntryService,
        StudentService, TeacherTeachesCourseService, TeacherService } from './_services/index';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, sessionService: SessionService) {
  return new HttpService(backend, options, sessionService);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClassesComponent,
    TeachersComponent,
    CoursesComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    GradesComponent,
    PaymentsComponent,
    ExamEntriesComponent,
    NotificationsComponent,
    ExamPeriodsComponent,
    CoursesAdminComponent,
    NotificationComponent,
    CourseComponent,
    ClassComponent,
    CourseNotificationsComponent,
    CourseLessonsComponent,
    CourseFilesComponent,
    CourseColloquiumsComponent,
    CourseLessonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpModule,
    NgProgressModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SessionService, HttpService, AdminGuard, StudentGuard,
    CollegeDirectionService, ColloquiumResultService, ColloquiumService, CourseFileService,
        CourseLessonService, CourseService, ExamPeriodService, ExamTermService, GradeService, NotificationService,
        PaymentService, RankService, StudentAttendsCourseService, StudentDocumentService, StudentExamEntryService,
        StudentService, TeacherTeachesCourseService, TeacherService, 
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SessionService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
