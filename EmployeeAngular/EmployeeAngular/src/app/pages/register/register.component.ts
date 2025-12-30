import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerObj: any = {
    "username": "",
    "email": "",
    "password": ""
  };
  
  http = inject(HttpClient);
  router = inject(Router);

  onRegister() {
    this.http.post("http://localhost:8080/api/auth/register", this.registerObj).subscribe((res: any) => {
      if(res.result){
        alert(res.message);
        localStorage.setItem('employeeApp', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      } else {
        alert(res.message);
      }
    }, error => {
      alert("Registration failed. Please try again.");
    });
  }
}