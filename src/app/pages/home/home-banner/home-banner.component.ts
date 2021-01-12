import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../../services/products.service';
import { OwlCarouselConfig, BackgroundImage } from '../../../functions';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  path: string = environment.pathUrl;

  bannerHome: Array<any> = [];
  category: Array<any> = [];
  url: Array<any> = [];
  render = true;
  preload = false;

  constructor( private productSrv: ProductsService ) { }

  ngOnInit(): void {

    this.preload = true;

    this.getProducts();

  }

  getProducts() {

    let index = 0;

    this.productSrv.getData()
      .subscribe( (resProduct: any) => {
        
        // Tomar la longitud del objeto
        let i;
        let size = 0;
        for ( i in resProduct ) {
          size++;
        }

        // Genera un número aleatorio
        if ( size > 5 ) {

          index = Math.floor(Math.random() * ( size - 5));

        }

        // Seleccionar data de productos con límites
        this.productSrv.getLimitData(Object.keys(resProduct)[index], 5)
          .subscribe( ( respProd: any ) => {

            let i;

            for ( i in respProd ) {

              this.bannerHome.push( JSON.parse(respProd[i].horizontal_slider ));
              this.category.push( respProd[i].category );
              this.url.push( respProd[i].url );

              this.preload = false;

            }
            
            
          });

      });
  }

  callback() {

    if ( this.render ) {

      this.render = false;

      OwlCarouselConfig.fnc();

      BackgroundImage.fnc();

    }

  }

}
