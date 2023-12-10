import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formStatus: string = 'Add'
  formCategory: string | undefined
  categoryArray: Array<any> | undefined
  id: string | undefined
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;

    });
  }



  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }
    if (this.formStatus == 'Add') {
      this.categoryService.saveDta(categoryData)
      formData.reset()
    } else {
      this.categoryService.updateData(this.id, categoryData)
      formData.reset()
      this.formStatus = 'Add'
    }

  }

  onUpdate(item: any) {
    this.formCategory = item.data.category
    this.id = item.id
    this.formStatus = 'Edit'
  }

  onDelete(id: string | undefined) {
    this.categoryService.deleteData(id)
  }

}