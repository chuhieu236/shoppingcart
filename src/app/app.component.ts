import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Products, Promocode } from './products.model';
import { HttpService } from './Services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private getData: HttpService) {}

  title = 'Shopping Cart';
  numberItems: number = 0;
  subTotal: number = 0;
  tax: number = 0;
  total: number = 0;
  codeinput: string = '';
  products: Products[] = [];
  promocodes: Promocode[] = [];
  codecheck: boolean = false;
  discountpercent: number = 0;

  public getProducts() {
    this.getData.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.getData.getPromoCodes().subscribe((data) => {
      this.promocodes = data;
    });
  }

  public removeProduct(productId: any) {
    const index = this.products.findIndex((data: any) => data.id === productId);
    this.products.splice(index, 1);
    this.update();
  }

  public updateQuantity() {
    this.update();
  }

  public inputPromoCode(code: any) {
    this.codeinput = code.value;
  }
  public onSubmitCode() {
    const promocode = this.promocodes.find(
      (data) => data.code === this.codeinput
    );

    if (promocode) {
      this.codecheck = true;

      this.discountpercent = promocode.discountpercent;
      this.tax = (this.subTotal * promocode.discountpercent) / 100;
      alert(
        'Áp dụng mã khuyến mãi thành công! Bạn được giảm ' +
          this.discountpercent +
          '% giá trị đơn hàng'
      );
    } else {
      this.codecheck = false;
      this.tax = 0;
      alert('Mã khuyến mãi không hợp lệ!');
    }
    this.update();
  }

  public update() {
    let numberItems: number = 0;
    let subTotal: number = 0;
    for (const product of this.products) {
      numberItems = numberItems + +product.quantity;
      subTotal += product.price * product.quantity;
    }
    if (this.codecheck) {
      this.tax = (subTotal * this.discountpercent) / 100;
    }
    this.numberItems = numberItems;
    this.subTotal = subTotal;
    this.total = this.subTotal - this.tax;
  }

  ngOnInit(): void {
    this.update();
    this.getProducts();
  }

  // products: Products[] = [
  //   {
  //     id: 1,
  //     name: 'Iphone 6',
  //     src: 'https://cdn.tgdd.vn/Products/Images/42/92962/iphone-6-32gb-gold-hh-600x600-600x600-600x600.jpg',
  //     description: 'Sản xuất năm 2014',
  //     price: 1500000,
  //     quantity: 0,
  //   },
  //   {
  //     id: 2,
  //     name: 'Iphone 7',
  //     src: 'https://cdn.tgdd.vn/Products/Images/42/78124/iphone-7-plus-32gb-gold-600x600-600x600.jpg',
  //     description: 'Sản xuất năm 2015',
  //     price: 2000000,
  //     quantity: 0,
  //   },
  //   {
  //     id: 3,
  //     name: 'iphone 8',
  //     src: 'https://cdn.tgdd.vn/Products/Images/42/114113/iphone-8-64gb-hh-600x600.jpg',
  //     description: 'Sản xuất năm 2016',
  //     price: 3000000,
  //     quantity: 0,
  //   },
  // ];
  // promocodes: Promocode[] = [
  //   {
  //     id: 1,
  //     code: 'hieudeptrai',
  //     discountpercent: 50,
  //   },
  // ];
}
