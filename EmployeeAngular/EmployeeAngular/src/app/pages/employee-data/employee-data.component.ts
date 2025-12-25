import { Employee } from './../../model/Employee';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee-data',
  imports: [],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent implements OnInit{

  @ViewChild('empModal') empModal: ElementRef | undefined;
  employeeList: any[]=[];

  http = inject(HttpClient);

  ngOnInit(): void {
      this.getAllEmployee();
  }
  openModal(){
    if(this.empModal){
      this.empModal.nativeElement.style.display = 'block';
    }
  }
  closeModal(){
    if(this.empModal){
      this.empModal.nativeElement.style.display = 'none';
    }
  }
  getAllEmployee(){
    this.http.get("https://localhost:7243/api/EmployeeMaster").subscribe((res:any)=>{
      this.employeeList = res;
    })
  }
}
