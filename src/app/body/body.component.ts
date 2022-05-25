import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products } from '../products.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  @Input() products: Products[] = [];
  @Output() onRemove = new EventEmitter();
  @Output() onUpdateQuantity = new EventEmitter();
  numberItems: number = 0;

  constructor() {}
  ngOnInit(): void {}

  public removeProduct(productId: number): void {
    this.onRemove.emit(productId);
  }

  public updateQuantity(element: any, Id: number): any {
    const i = this.products.findIndex((data) => data.id === Id);
    this.products[i].quantity = element.value;
    this.onUpdateQuantity.emit();
  }
}
