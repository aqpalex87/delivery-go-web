import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from '../../../shared/interface/user';
import { ResponseData } from 'src/app/shared/interface/response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authSvc: AuthenticationService,
    private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ingresar() {
    let user: User = this.form.value;
    this.authSvc.login(user).subscribe((response: ResponseData) => {
      if (response.success) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data));
        this.router.navigate(['home/index']);
      }
      this.showMessage(response.message);
    });
  }

  recoveryPassword() {
    //recuperacion de contraseña
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
