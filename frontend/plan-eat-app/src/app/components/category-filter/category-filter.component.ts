import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  categories: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  selectedCategory: string = '';

  @Output() categoryChanged = new EventEmitter<string>();

  onCategoryChange() {
    this.categoryChanged.emit(this.selectedCategory);
  }
}
