import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

import { OwlCarouselConfig, CarouselNavigation,
         SlickConfig, ProductLightbox } from '../../../functions';

declare const $: any;
declare const jQuery: any;

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

  indexes: Array<any> = [];
  productsOffers: any[] = [];
  products: any[] = [];
  render = true;
  preload = false;

  constructor( private productSrv: ProductsService ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.preload = true;
    const getProducts: any[] = [];
    const hoy = new Date();
    let fechaOferta;
    // Obteniendo los datos de los productos
    this.productSrv.getData()
      .subscribe( (resProducts: any) => {
        
        // Se recorre cada producto para separar las ofertas y el stock
        let i;

        for ( i in resProducts ) {

          getProducts.push({
            'offer': JSON.parse(resProducts[i].offer),
            'stock': resProducts[i].stock
          });

          this.products.push(resProducts[i]);

        }

        // Se recorre cada oferta y stock para clasificar las ofertas actuales y los productos que si tengan stock
        for ( i in getProducts) {

          fechaOferta = new Date( parseInt(getProducts[i]['offer'][2].split('-')[0]),
                                  parseInt(getProducts[i]['offer'][2].split('-')[1]) -1,
                                  parseInt(getProducts[i]['offer'][2].split('-')[2]) );

          if ( hoy < fechaOferta && getProducts[i]['stock'] > 0 ) {

            this.indexes.push(i);
            this.productsOffers.push(getProducts[i]);

            this.preload = false;

          }
         
        }

      });
  }

  callback() {

    if ( this.render ) {
      
      this.render = false;

      // Seleccionar del DOM los elementos de la galería mixta
      const galleryMix_1 = $('.galleryMix_1');
      const galleryMix_2 = $('.galleryMix_2');
      const galleryMix_3 = $('.galleryMix_3');

      // Recorrer todos los indices de productos
      for (let i = 0; i < galleryMix_1.length; i++ ) {

        // Recorrer todos las fotografías de la galería de cada producto
        for ( let f = 0; f < JSON.parse($(galleryMix_1[i]).attr('gallery')).length; f++ ) {

          // Agregar imágenes grandes
          $(galleryMix_2[i]).append(
              `<div class="item">
                  <a href="assets/img/products/${ $(galleryMix_1[i]).attr('category') }/gallery/${ JSON.parse($(galleryMix_1[i]).attr('gallery'))[f] }">
                      <img src="assets/img/products/${ $(galleryMix_1[i]).attr('category') }/gallery/${ JSON.parse($(galleryMix_1[i]).attr('gallery'))[f] }" alt="">
                  </a>
              </div>`
            );

          $(galleryMix_3[i]).append(
            `<div class="item">
                <img src="assets/img/products/${ $(galleryMix_1[i]).attr('category') }/gallery/${ JSON.parse($(galleryMix_1[i]).attr('gallery'))[f] }" alt="">
            </div>`
          );

        }

      }

      // Ejecturar funcoines globales con respecto a la galería mixta
      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc();

      // Seleccionar del DOM los elementos de la oferta

      const offer_1 = $('.offer_1');
      const offer_2 = $('.offer_2');
      const offer_3 = $('.offer_3');

      // Recorrer todos los indices de productos
      for ( let i = 0; i < offer_1.length; i++ ) {
        // Capturamos el array de ofertas de ada producto
        let offer = JSON.parse($(offer_1[i]).attr('offer'));

        // Capturamos el precio de cada producto
        let price = JSON.parse($(offer_1[i]).attr('price'));
        console.log(offer[0]);
        // Preguntamos si es descuento
        if ( offer[0] == 'Disccount') {
          $(offer_1[i]).html(
            `<span>Save <br> $${ (( price * offer[1] / 100)).toFixed(2) }</span>`
            );

            $(offer_2[i]).html(
              `$${ (price - ( price * offer[1] / 100)).toFixed(2) }`
              );
        }

        if ( offer[0] == 'Fixed') {
          $(offer_1[i]).html(
            `<span>Save <br> $${ ( price - offer[1] ).toFixed(2) }</span>`
            );

            $(offer_2[i]).html(
              `$${ offer[1] }`
              );
        }

      }

    }

  }

}
