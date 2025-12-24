export class Employee{
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    depId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: Date;

    constructor(){
        this.employeeId = 0;
        this.employeeName = '';
        this.contactNo = '';
        this.emailId = '';
        this.depId = 0;
        this.password = '';
        this.gender = '';
        this.role = 'Employee';
        this.createdDate = new Date();
    }
}

export interface ParentDepartment{
    departmentId: number;
    departmentName: string;
    departmentLogo: string;
}
export interface ChildDepartment{
    childDeptId: number;
    parentDeptId: number;
    departmentName: string;
}

export interface ApiResponse{
    message: string;
    result: boolean;
    data: any;
}