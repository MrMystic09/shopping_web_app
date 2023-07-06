import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  id: number;
  productForm: FormGroup;
  editMode = false

  constructor(
    private _storeService: StoreService,
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this._storeService.updateProduct(this.id, this.productForm.value);
      this._dataService.storeProducts();
    } else {
      this._storeService.addProduct(this.productForm.value);
      this._dataService.storeProducts();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['admin']);
  }

  private initForm() {
    let productPicture = '';
    let productName = '';
    let productShortDescription = '';
    let productDescription = '';
    let productPrice: number;

    if (this.editMode) {
      const product = this._storeService.getProduct(this.id);
      productName = product.name;
      productDescription = product.description;
      productShortDescription = product.shortDescription;
      productPrice = product.price;
      productPicture = product.picture;

    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      shortDescription: new FormControl(productShortDescription, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      picture: new FormControl(productPicture, Validators.required)
    });
  }

}
