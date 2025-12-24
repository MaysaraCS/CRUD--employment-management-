import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Remove stored auth data
    localStorage.clear(); 
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
