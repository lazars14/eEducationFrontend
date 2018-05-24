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
import { GradingComponent } from './grading/grading.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GradesComponent } from './grades/grades.component';
import { PaymentsComponent } from './payments/payments.component';
import { ExamEntriesComponent } from './exam-entries/exam-entries.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsTeacherComponent } from './notifications-teacher/notifications-teacher.component';
import { ExamPeriodsComponent } from './exam-periods/exam-periods.component';

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
                        path: 'teachers',
                        component: TeachersComponent,
                    },
                    {
                        path: 'examPeriods',
                        component: ExamPeriodsComponent
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
                    // {
                    //     path: 'courses/:id',
                    //     component: CourseComponent
                    // },
                    {
                        path: 'grading',
                        component: GradingComponent
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
                        component: NotificationsTeacherComponent
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
                    // {
                    //     path: 'courses/:id',
                    //     component: CourseComponent
                    // },
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
                    }
                ]

            }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
