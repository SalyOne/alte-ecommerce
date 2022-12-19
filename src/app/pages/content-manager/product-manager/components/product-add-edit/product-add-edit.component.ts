import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../../../core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {ICategory} from "../../../../../core/interfaces/category.interface";
import {CategoriesService} from "../../../../../core/services";

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    // category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  sub$ = new Subject();
  categories$: Observable<ICategory[]> = this.categoryService.getData();
  categoryId?: string;
  constructor(

    private productService: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.sub$))
      .subscribe(params => {
        if (params['id']) {
          this.productService.getById(params['id']).subscribe(product => {
            this.categoryId = product.categories?.id
            this.form.patchValue(product)
          })
        }
      })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    console.log(this.form.value.id)
    if(this.form.value.id){
      console.log("clicked")
      this.productService.update(this.form.value.id, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(()=>{
          this.router.navigate(['/content-manager/products'])
        })

    } else{
      console.log("clicked add")
      this.productService.create(this.form.value)
        .subscribe(()=>{
          this.router.navigate(['/content-manager/products'])
        })
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }

  categoryChanged($event: any) {
    this.categories$
      .pipe(
        takeUntil(this.sub$),
        map(categories => categories.find(cate => cate.id === $event))
      ).subscribe((cate) =>{
        if(cate){
          this.form.patchValue({cate})
        }
    })
  }
}
