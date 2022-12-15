import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit , OnDestroy{
  form: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  sub$ = new Subject();
  errorMessage?:string;

  constructor(
    private authService: AuthService,
    private router: Router,
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
    this.authService.signUp(this.form.value)
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
