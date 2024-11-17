import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthServiceService } from "../../service/auth-service.service";
import { LoginService } from "../../service/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService,
              private loginService: LoginService,
              private router: Router ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.login(response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert("Usuário e senha inválidos");
      }
    });
  }
}
