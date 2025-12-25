import { Project, ProjectEmployee } from './../../model/Employee';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule,NgFor,AsyncPipe,DatePipe,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  @ViewChild("myModal") employeModal : ElementRef | undefined;

  currentView: string = "List";
  projectForm: FormGroup = new FormGroup({});
  projectEmployee:ProjectEmployee = new ProjectEmployee();

  employeeService = inject(EmployeeService);
  projectList: Project[]=[];
  projectEmployeeList: ProjectEmployee[]=[];
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employeeData$ = this.employeeService.getEmployes();
  }
  ngOnInit(): void {
      this.getAllProject();
  }
  onAddEmployees(id:number){
    this.getAllProjectEmployee(id);
    this.projectEmployee.projectId = id;
    if(this.employeModal){
      this.employeModal.nativeElement.style.display = 'block';
    }
  }
  closeModal(){
    if(this.employeModal){
      this.employeModal.nativeElement.style.display = 'none';
    }
  }

  onEdit(projectData: Project){
    this.initializeForm(projectData)
  }

  initializeForm(project?: Project){
    this.projectForm = new FormGroup({
      projectId: new FormControl(project? project.projectId:0),
      projectName: new FormControl(project? project.projectName:""),
      clientName: new FormControl(project? project.clientName:""),
      startDate: new FormControl(project? project.startDate:""),
      leadByEmpId: new FormControl(project? project.leadByEmpId:""),
      contactPerson: new FormControl(project? project.contactPerson:""),
      contactNo: new FormControl(project? project.contactNo:""),
      emailId: new FormControl(project? project.emailId:""),
    });
    this.currentView = "Create"
  }

  onAddEmp(){
    this.employeeService.addNewProjectEmployee(this.projectEmployee).subscribe((res:ProjectEmployee)=>{
      debugger;
      alert("employee added to project");
      this.getAllProjectEmployee(this.projectEmployee.projectId);
    },error=>{

    })
  }

  onSaveProject(){
    const formValue = this.projectForm.value;
    if(formValue.projectId == 0){
      this.employeeService.createNewProject(formValue).subscribe((res:Project)=>{
      debugger;
      alert("Project Created Success");
      this.getAllProject();
    },error=>{

    })
    }else{
      this.employeeService.updateProject(formValue).subscribe((res:Project)=>{
      debugger;
      alert("Project Updated Success");
      this.getAllProject();
    },error=>{

    })
    }
    debugger ;
    
  }
  getAllProjectEmployee(id:number){
    this.employeeService.GetAllProjectEmployee().subscribe((res:ProjectEmployee[])=>{
      debugger;
      debugger;
      const record = res.filter(m=>m.projectId == id);
      this.projectEmployeeList = record;
    },error=>{

    })
  }
  getAllProject(){
    this.employeeService.getProjects().subscribe((res:Project[])=>{
      debugger;
      this.projectList = res;
    },error=>{

    })
  }
}
