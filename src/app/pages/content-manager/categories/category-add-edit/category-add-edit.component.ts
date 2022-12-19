import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {CategoriesService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent implements OnInit, OnDestroy {
  form:FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required)
  })
  sub$ = new Subject();

  constructor(

    private categoryServices: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.sub$)).subscribe(params =>{
      if(params['id']){
        this.categoryServices.getById(params['id']).subscribe(cat =>{
          this.form.patchValue(cat)
        })
      }
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    if(this.form.value.id){
      this.categoryServices.update(this.form.value.id, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(()=>{
          this.router.navigate(['/content-manager/categories'])
        })

    } else{
      this.categoryServices.create(this.form.value)
        .subscribe(()=>{
          this.router.navigate(['/content-manager/categories'])
        })
    }

  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
