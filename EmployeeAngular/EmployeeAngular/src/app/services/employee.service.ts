import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Employee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createNewEmployee(obj:Employee){
    return this.http.post<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee", obj);
  }
  UpdateEmployee(obj:Employee){
    return this.http.put<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/" +obj.employeeId, obj);
  }
  getEmployes(){
    return this.http.get<Employee[]>("https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees");
  }
  deletEmployeeById(id:number){
    return this.http.delete<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/" +id);
  }
}
