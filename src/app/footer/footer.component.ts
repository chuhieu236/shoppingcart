import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Promocode } from '../products.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() subTotal: any;
  @Input() tax: any;
  @Input() total: any;
  @Input() promocodes: Promocode[] = [];
  @Output() onPromoCode = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  constructor() {}
  public inputPromoCode(code: any) {
    this.onPromoCode.emit(code);
  }
  public onSubmitCode() {
    this.onSubmit.emit();
  }
  ngOnInit(): void {}
}
