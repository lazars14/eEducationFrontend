import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminGuard } from './_core/index';
import { TeacherGuard } from './_core/index';
import { StudentGuard } from './_core/index';

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
import { CourseFilesComponent } from './course-files/course-files.component';
import { CourseColloquiumsComponent } from './course-colloquiums/course-colloquiums.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminGuard],
        children: [
            {
                path: '',
                canActivateChild: [AdminGuard],
                children: [
                    {
                        path: 'classes',
                        component: ClassesComponent
                    },
                    {
                        path: 'classes/:id',
                        component: ClassComponent
                    },
                    {
                        path: 'teachers',
                        component: TeachersComponent,
                    },
                    {
                        path: 'examPeriods',
                        component: ExamPeriodsComponent
                    },
                    {
                        path: 'courses',
                        component: CoursesAdminComponent
                    },
                    {
                        path: 'changeEmail',
                        component: ChangeEmailComponent,
                    },
                    {
                        path: 'changePassword',
                        component: ChangePasswordComponent,
                    }
                ]

            }
        ]
    },
    {
        path: 'teacher/dashboard', component: DashboardComponent, canActivate: [TeacherGuard],
        children: [
            {
                path: '',
                canActivateChild: [TeacherGuard],
                children: [
                    {
                        path: 'courses',
                        component: CoursesComponent
                    },
                    {
                        path: 'courses/:id/notifications',
                        component: CourseNotificationsComponent
                    },
                    {
                        path: 'courses/:id/lessons',
                        component: CourseLessonsComponent
                    },
                    {
                        path: 'courses/:id/lessons/:lessonId',
                        component: CourseLessonComponent
                    },
                    {
                        path: 'courses/:id/files',
                        component: CourseFilesComponent
                    },
                    {
                        path: 'courses/:id/colloquiums',
                        component: CourseColloquiumsComponent
                    },
                    {
                        path: 'grading',
                        component: ExamEntriesComponent
                    },
                    {
                        path: 'changeEmail',
                        component: ChangeEmailComponent,
                    },
                    {
                        path: 'changePassword',
                        component: ChangePasswordComponent,
                    }
                ]

            }
        ]
    },
    {
        path: 'student/dashboard', component: DashboardComponent, canActivate: [StudentGuard],
        children: [
            {
                path: '',
                canActivateChild: [StudentGuard],
                children: [
                    {
                        path: 'courses',
                        component: CoursesComponent
                    },
                    {
                        path: 'courses/:id/notifications',
                        component: CourseNotificationsComponent
                    },
                    {
                        path: 'courses/:id/lessons',
                        component: CourseLessonsComponent
                    },
                    {
                        path: 'courses/:id/lessons/:lessonId',
                        component: CourseLessonComponent
                    },
                    {
                        path: 'courses/:id/files',
                        component: CourseFilesComponent
                    },
                    {
                        path: 'courses/:id/colloquiums',
                        component: CourseColloquiumsComponent
                    },
                    {
                        path: 'grades',
                        component: GradesComponent
                    },
                    {
                        path: 'payments',
                        component: PaymentsComponent
                    },
                    {
                        path: 'examEntries',
                        component: ExamEntriesComponent
                    },
                    {
                        path: 'changeEmail',
                        component: ChangeEmailComponent,
                    },
                    {
                        path: 'changePassword',
                        component: ChangePasswordComponent,
                    },
                    {
                        path: 'notifications',
                        component: NotificationsComponent
                    },
                    {
                        path: 'notifications/:id',
                        component: NotificationComponent
                    }
                ]

            }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
