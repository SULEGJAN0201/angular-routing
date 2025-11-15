import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  products: Product[] = [
    { id: 101, name: 'Laptop Pro', price: 1299, category: 'Electronics' },
    { id: 102, name: 'Wireless Mouse', price: 29, category: 'Accessories' },
    { id: 103, name: 'Mechanical Keyboard', price: 89, category: 'Accessories' },
    { id: 104, name: 'Monitor 4K', price: 499, category: 'Electronics' },
    { id: 105, name: 'USB-C Hub', price: 45, category: 'Accessories' },
  ];
}
