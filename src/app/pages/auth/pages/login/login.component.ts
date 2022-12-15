import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  sub$ = new Subject();
  errorMessage?:string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  // passwordMatch(){
  //   return this.form.get('password')?.value === this.form.get('confirmPassword')?.value
  // }

  submit() {
    console.log(this.form.value)
    this.form.markAllAsTouched()
    if(this.form.invalid) return
    this.authService.signIn(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe({
        next:res => {
          if (res) {
            this.router.navigate(['/'])
          }
        },
        error:({error})=>{
          this.errorMessage = error.error.message()
        }
    })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
