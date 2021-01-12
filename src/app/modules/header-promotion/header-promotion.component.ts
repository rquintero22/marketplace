import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path = environment.pathUrl;
  topBanner: Object = {};
  category: any = null;
  url: any = null;
  preload = false;

  constructor( public productsSrv: ProductsService ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.preload = true;
    this.productsSrv.getData()
      .subscribe((res: any) => {
        // console.log('resp', res[Object.keys(res)[1]]);

        // Obtener la longitud del objeto
        let i;
        let size = 0;

        for ( i in res ) {
          size++;
        }

        // Generar de un número aleatorio
        let index = Math.floor(Math.random() * size);

        // Devolver a la vista un banner aleatorio
        this.topBanner = JSON.parse(res[Object.keys(res)[index]].top_banner);
        this.category = res[Object.keys(res)[index]].category;
        this.url = res[Object.keys(res)[index]].url;

        this.preload = false;

      });
  }

}
