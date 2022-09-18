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
  createCategoryForm: FormGroup;

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

  CreateCategory(content){

    this.createCategoryForm = this._formBuilder.group({
      description: null,
      creationDate: null,
      idUserCreation: null,
      idStatus: null,
      image: null
    });
    let categoryToCreate = {...this.selectedCategory}
    this.modalService.open(content, 
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          categoryToCreate.description = this.createCategoryForm.value?.description;
          categoryToCreate.creationDate = this.createCategoryForm.value?.creationDate;
          categoryToCreate.idUserCreation = this.createCategoryForm.value?.idUserCreation;
          categoryToCreate.idStatus = this.createCategoryForm.value?.idStatus;
          categoryToCreate.image = this.createCategoryForm.value?.image;
          this.categoriesService.CreateCategory(categoryToCreate).subscribe({next: (resp) => {
            if(resp){
              this.updateCategory();
            }
          }})
        }
      })
  }

  EditCategory(content, categoryId: number){
    this.selectedCategory = this.categories.find(s => s.idCategory == categoryId);
    this.editCategoryForm = this._formBuilder.group({
      description: [this.selectedCategory.description],
      creationDate: [this.selectedCategory.creationDate],
      idUserCreation: [this.selectedCategory.idUserCreation],
      idStatus: [this.selectedCategory.idStatus],
      image: [this.selectedCategory.image]
    });

    let categoryToUpdate = {... this.selectedCategory}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          categoryToUpdate.description = this.editCategoryForm.value?.description;
          categoryToUpdate.creationDate = this.editCategoryForm.value?.creationDate;
          categoryToUpdate.idUserCreation = this.editCategoryForm.value?.idUserCreation;
          categoryToUpdate.idStatus = this.editCategoryForm.value?.idStatus;
          categoryToUpdate.image = this.editCategoryForm.value?.image;
          this.categoriesService.UpdateCategory(categoryToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateCategory();
            }
          }})
        }
      });
  }
}
