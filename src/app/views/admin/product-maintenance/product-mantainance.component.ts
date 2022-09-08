import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product-model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-mantainance',
  templateUrl: './product-mantainance.component.html',
  styleUrls: ['./product-mantainance.component.scss']
})
export class ProductMantainanceComponent implements OnInit {
  product: Array<Product>;
  productFiltered: Array<Product>;
  searchControl: UntypedFormControl = new UntypedFormControl();

  constructor(private productService: ProductService ) { }

  ngOnInit(): void {
    this.GetAllProducts();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
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

  GetAllProducts(){
    this.productService.getProducts()
      .subscribe({next: (resp) => {
        this.product = [...resp];
        this.productFiltered = resp;
      }});
  }
}
