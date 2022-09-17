import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ProductModel } from 'src/app/shared/models/product-model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-mantainance',
  templateUrl: './product-mantainance.component.html',
  styleUrls: ['./product-mantainance.component.scss']
})
export class ProductMantainanceComponent implements OnInit {
  
  searchControl: UntypedFormControl = new UntypedFormControl();
  product: Array<ProductModel>;
  productFiltered: Array<ProductModel>;
  selectedproduct: ProductModel;
  editproductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateProduct();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateProduct(){
    this.productService.GetAllProduct().subscribe({
      next: (resp) => {
        this.product =  [...resp];
        this.productFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.productFiltered = [...this.product];
    }

    const columns = Object.keys(this.product[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.product.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.productFiltered = rows;
  }

  DeleteProducts(content, Productid: number){
    this.selectedproduct = this.product.find(s => s.idProduct == Productid);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.productService.DeleteProduct(Productid).subscribe({next: (resp) => {
            if(resp){
              this.updateProduct();
            }
          }})
        }
      });
  }

  EditProduct(content, Productid: number){
    this.selectedproduct = this.product.find(s => s.idProduct == Productid);
    this.editproductForm = this._formBuilder.group({
      idProduct: [this.selectedproduct.idProduct],
      idProvider: [this.selectedproduct.idProvider],
      idCategory: [this.selectedproduct.idCategory],
      name: [this.selectedproduct.name],
      description: [this.selectedproduct.description],
      currency: [this.selectedproduct.currency],
      price: [this.selectedproduct.price],
      shippingStatus: [this.selectedproduct.shippingStatus]
    });

    let productToUpdate = {... this.selectedproduct}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          productToUpdate.idProvider = this.editproductForm.value?.idProvider;
          productToUpdate.idCategory = this.editproductForm.value?.idCategory;
          productToUpdate.name = this.editproductForm.value?.name;
          productToUpdate.description = this.editproductForm.value?.description;
          productToUpdate.currency = this.editproductForm.value?.currency;
          productToUpdate.price = this.editproductForm.value?.price;
          productToUpdate.shippingStatus = this.editproductForm.value?.shippingStatus;

          this.productService.UpdateProduct(productToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateProduct();
            }
          }})
        }
      });  
  }  
}
