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
import { ClassComponent } from './class/class.component';
import { CourseNotificationsComponent } from './course-notifications/course-notifications.component';
import { CourseLessonsComponent } from './course-lessons/course-lessons.component';
import { CourseColloquiumsComponent } from './course-colloquiums/course-colloquiums.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { CollegeDirectionService, ColloquiumResultService, ColloquiumService, CourseFileService,
        CourseLessonService, CourseService, ExamPeriodService, ExamTermService, GradeService, NotificationService,
        PaymentService, RankService, StudentAttendsCourseService, StudentDocumentService, StudentExamEntryService,
        StudentService, TeacherTeachesCourseService, TeacherService } from './_services/index';
import { ClassModalComponent } from './class-modal/class-modal.component';
import { TeacherModalComponent } from './teacher-modal/teacher-modal.component';
import { ExamPeriodModalComponent } from './exam-period-modal/exam-period-modal.component';
import { ExamTermModalComponent } from './exam-term-modal/exam-term-modal.component';
import { CourseModalComponent } from './course-modal/course-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { GradingModalComponent } from './grading-modal/grading-modal.component';
import { SetTeachersModalComponent } from './set-teachers-modal/set-teachers-modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { LessonModalComponent } from './lesson-modal/lesson-modal.component';

import { FileDropModule } from 'ngx-file-drop';
import { CourseNavbarComponent } from './course-navbar/course-navbar.component';
import { ToasterModule } from 'angular2-toaster';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { TeacherCoursesModalComponent } from './teacher-courses-modal/teacher-courses-modal.component';
import { ColloquiumModalComponent } from './colloquium-modal/colloquium-modal.component';
import { ColloquiumResultModalComponent } from './colloquium-result-modal/colloquium-result-modal.component';
import { EnterColloquiumModalComponent } from './enter-colloquium-modal/enter-colloquium-modal.component';

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
    ClassComponent,
    CourseNotificationsComponent,
    CourseLessonsComponent,
    CourseColloquiumsComponent,
    CourseLessonComponent,
    ClassModalComponent,
    TeacherModalComponent,
    ExamPeriodModalComponent,
    ExamTermModalComponent,
    CourseModalComponent,
    ConfirmModalComponent,
    GradingModalComponent,
    SetTeachersModalComponent,
    NotificationModalComponent,
    LessonModalComponent,
    CourseNavbarComponent,
    TeacherCoursesModalComponent,
    ColloquiumModalComponent,
    ColloquiumResultModalComponent,
    EnterColloquiumModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpModule,
    NgProgressModule,
    FormsModule,
    ReactiveFormsModule,
    FileDropModule,
    ToasterModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body})
  ],
  entryComponents: [
    ConfirmModalComponent,
    CourseModalComponent,
    TeacherModalComponent,
    ClassModalComponent,
    ExamPeriodModalComponent,
    ExamTermModalComponent,
    LessonModalComponent,
    NotificationModalComponent,
    TeacherCoursesModalComponent,
    SetTeachersModalComponent, 
    ColloquiumModalComponent,
    ColloquiumResultModalComponent,
    EnterColloquiumModalComponent
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
