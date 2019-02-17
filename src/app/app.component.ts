import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil, tap, take} from 'rxjs/operators';
import {RestService} from './rest.service';
import {ProductType} from '../../types/product.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  subscription$ = new Subject();
  consumption: number;
  ListOfProducts: ProductType[] = [];

  constructor(private service: RestService) {}

  getProducts(consumption: number) {
    if (consumption && !consumption.toString().includes('-')) {
      this.service.getProducts(consumption).pipe(takeUntil(this.subscription$)).subscribe((res: any) => {
        if (res.success === true) {
          this.ListOfProducts = res.product;
        } else {
          alert(res.message);
        }
        this.ListOfProducts = res.product;
        console.log(this.ListOfProducts);
        this.consumption = null;
      }, (error: any) => {
        alert(error);
      });
    } else {
      alert('Please enter value to compare');
    }
  }

}

