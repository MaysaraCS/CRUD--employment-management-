import { Employee } from './../../model/Employee';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  imports: [FormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent implements OnInit{

  @ViewChild('empModal') empModal: ElementRef | undefined;
  employeeList: any[]=[];
  employeeObj: any = {
    "employeeId": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "contactNo": "",
    "city": "",
    "address": ""
  }

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
  onSave(){
    this.http.post("https://localhost:7243/api/EmployeeMaster", this.employeeObj).subscribe((res:any)=>{
      this.getAllEmployee(); 
      this.closeModal();
    })
  }
  onUpdate(){
    this.http.put("https://localhost:7243/api/EmployeeMaster/"+this.employeeObj.employeeId, this.employeeObj).subscribe((res:any)=>{
      this.getAllEmployee(); 
      this.closeModal();
    })
  }
  deleteEmployee(data : any){
    const isDelete = confirm("Are you sure you want to delete");
    if(isDelete){
      this.http.delete("https://localhost:7243/api/EmployeeMaster/"+data.employeeId).subscribe((res:any)=>{
        this.getAllEmployee(); 
      })
    }
  }
  editEmployee(data : any){
    this.openModal();
    this.employeeObj = data;
  }
}
