import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from 'src/app/services/alert.service';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/product';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  fileToUpload: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private productService: ProductService
  ) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {

    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.productService.saveProduct({
      name: this.f.name.value,
      price: this.f.price.value,
      description: this.f.description.value,
      productImage: this.fileToUpload
    })
      .subscribe(
        (data) => {
          this.alertService.success(data['message']);
        }, error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
