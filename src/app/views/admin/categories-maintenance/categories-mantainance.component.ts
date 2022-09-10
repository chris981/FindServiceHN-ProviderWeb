import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from 'src/app/shared/models/categories-model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-categories-mantainance',
  templateUrl: './categories-mantainance.component.html',
  styleUrls: ['./categories-mantainance.component.scss']
})
export class CategoriesMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  categories: Array<CategoriesModel>;
  categoryFiltered: Array<CategoriesModel>;
  selectedCategory: CategoriesModel;
  editCategoryForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateCategory();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateCategory(){
    this.categoriesService.GetAllCategories().subscribe({
      next: (resp) => {
        this.categories =  [...resp];
        this.categoryFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.categoryFiltered = [...this.categories];
    }

    const columns = Object.keys(this.categories[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.categories.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.categoryFiltered = rows;
  }

  DeleteCategory(content, categoryId: number){
    this.selectedCategory = this.categories.find(s => s.idCategory == categoryId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.categoriesService.DeleteCategory(categoryId).subscribe({next: (resp) => {
            if(resp){
              this.updateCategory();
            }
          }})
        }
      });
  }

  EditCategory(content, categoryId: number){
    this.selectedCategory = this.categories.find(s => s.idCategory == categoryId);
    this.editCategoryForm = this._formBuilder.group({
      Description: [this.selectedCategory.description],
      Creationdate: [this.selectedCategory.creationdate],
      IdUserCreation: [this.selectedCategory.idUserCreation],
      IdStatus: [this.selectedCategory.idStatus],
      Image: [this.selectedCategory.image]
    });

    let categoryToUpdate = {... this.selectedCategory}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          categoryToUpdate.description = this.editCategoryForm.value?.Description;
          categoryToUpdate.creationdate = this.editCategoryForm.value?.Creationdate;
          categoryToUpdate.idUserCreation = this.editCategoryForm.value?.IdUserCreation;
          categoryToUpdate.idStatus = this.editCategoryForm.value?.IdStatus;
          categoryToUpdate.image = this.editCategoryForm.value?.Image;
          this.categoriesService.UpdateCategory(categoryToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateCategory();
            }
          }})
        }
      });
  }
}
