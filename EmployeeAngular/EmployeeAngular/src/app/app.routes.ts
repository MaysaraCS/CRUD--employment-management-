import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmployeesComponent } from './pages/project-employees/project-employees.component';
import { EmployeeDataComponent } from './pages/employee-data/employee-data.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'employees',
                component: EmployeeComponent,
            },
            {
                path: 'projects',
                component: ProjectComponent,
            },
            {
                path: 'project-employee/:eventid',
                component: ProjectEmployeesComponent,
            },
            {
                path: 'employee-data',
                component: EmployeeDataComponent,
            },
        ]
    }
];
