import { ChildDepartment, Employee, ParentDepartment } from './../../model/Employee';
import { ApiResponse } from '../../model/Employee';
import { MasterService } from './../../services/master.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { error } from 'console';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  parentDeptList: ParentDepartment[] = [];
  childDeptList: ChildDepartment[] = [];
  deptId: number = 0;

  employeeObj : Employee = new Employee();
  employeeList: Employee[] = [];

  masterService = inject(MasterService);
  employeeSerive = inject(EmployeeService);

  isSidePanelOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmployees();
  }

  addNew(){
    this.isSidePanelOpen.set(true);
  }
  close(){
    this.isSidePanelOpen.set(false);
  }
  onEdit(obj:Employee){
    this.employeeObj = obj;
  }

  getEmployees(){
    this.employeeSerive.getEmployes().subscribe((res:Employee[])=>{
      this.employeeList = res;
    });
  }
  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:ApiResponse)=>{
      this.parentDeptList = res.data;
    });
  }
  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res:ApiResponse)=>{
      this.childDeptList = res.data;
    });
  }

  onSaveEmployee(){
    debugger;
    this.employeeSerive.createNewEmployee(this.employeeObj).subscribe((res:Employee)=>{
      debugger;
        alert("Employee created successfully");
    },error=>{
      alert("Error while creating employee");
    });
  }


  onUpdateEmployee(){
    debugger;
    this.employeeSerive.UpdateEmployee(this.employeeObj).subscribe((res:Employee)=>{
      debugger;
        alert("Employee updated successfully");
        this.getEmployees();
    },error=>{
      alert("Error while updating employee");
    });
  }
  
  onDelete(id:number){
    const result = confirm("Are you sure to delete this employee?");
    if(result){
        this.employeeSerive.deletEmployeeById(id).subscribe((res:Employee)=>{
          debugger;
            alert("Employee deleted successfully");
            this.getEmployees();
        },error=>{
          alert("Error while creating employee");
        });
      }
    }
}
