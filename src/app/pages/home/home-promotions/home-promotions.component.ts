import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit {

  bannerDefault: Array<any> = [];
  categories: Array<any> = [];
  url: Array<any> = [];
  preload = false;

  constructor( private productSrv: ProductsService ) { }

  ngOnInit(): void {

    this.getData();
  }

  getData() {

    this.preload = true;

    let index = 0;

    this.productSrv.getData()
      .subscribe( (resProduct: any) => {
        let i;
        let size = 0;

        for ( i in resProduct ) {
          size++;
        }

        if ( size > 2 ) {
          index = Math.floor(Math.random() * (size - 5));
        }

        this.productSrv.getLimitData(Object.keys(resProduct)[index], 2)
          .subscribe( (res: any) => {
            let i;

            for ( i in res ) {
              this.bannerDefault.push(res[i].default_banner);
              this.categories.push(res[i].category);
              this.url.push(res[i].url);

              this.preload = false;
            }
          });

      } );

  }

}
