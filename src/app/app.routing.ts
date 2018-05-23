import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './_core/index';
import { TeacherGuard } from './_core/index';
import { StudentGuard } from './_core/index';

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
                    }
                ]

            }
        ]
    }
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
