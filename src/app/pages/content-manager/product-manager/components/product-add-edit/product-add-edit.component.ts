import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../../../core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit, OnDestroy {
  form:FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  })
  sub$ = new Subject();

  constructor(

    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.sub$)).subscribe(params =>{
      if(params['id']){
        this.productService.getById(params['id']).subscribe(prod =>{
          this.form.patchValue(prod)
        })
      }
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    if(this.form.value.id){
      this.productService.update(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(()=>{
          this.router.navigate(['/content-manager/product-manager'])
        })

    } else{
      this.productService.create(this.form.value)
        .subscribe(()=>{
          this.router.navigate(['/content-manager/product-manager'])
        })
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
