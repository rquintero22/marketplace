import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare const $: any;
declare const jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path: string = environment.pathUrl;
  categories: any = null;
  arrayTitleList: Array<any> = [];
  render = true;

  constructor( private categorieSrv: CategoriesService,
               private subcategorieSrv: SubCategoriesService ) { }

  ngOnInit(): void {

    this.getCategories();
  }

  getCategories() {
    this.categorieSrv.getData()
      .subscribe((resCategories: any) => {

        this.categories = resCategories;

        // Recorremos la colección de categorías para tomar la lista de títulos

        let i;
        for( i in resCategories ) {
           // Recorremos la colección de títulos en indices de un array
          this.arrayTitleList.push(JSON.parse(resCategories[i].title_list));

        }
      });
  }

  // Función que nos avisa cuando finaliza el renderizando de Angular
  callback() {

    if ( this.render ) {
      this.render = false;
      let arraySubCategories: any[] = [];

      // Se hace un recorrido por la lista de títulos
      this.arrayTitleList.forEach( titleList => {

        // Separar individualmente los titulos
        
        for (let i = 0; i < titleList.length; i++ ) {

          this.subcategorieSrv.getFilterData( 'title_list', titleList[i] )
            .subscribe(resSubcategorie => {
             
              arraySubCategories.push(resSubcategorie);

              // Se hace el recorrido por la colección general de sub categorías
              let f;
              let g;
              let arrayTitleName = [];

              for ( f in arraySubCategories ) {

                // Hacemos un recorrido por la colección particular de subcategorías
                for ( g in arraySubCategories[f] ) {
                  // Se crea un nuevo array objecto clasificando cada subcategoria con la respectiva lista de titulo a la que pertenece
                  arrayTitleName.push({
                    title_list: arraySubCategories[f][g].title_list,
                    subcategory: arraySubCategories[f][g].name,
                    url: arraySubCategories[f][g].url
                  });
                }

              }

              // Recorremos el array de objetos nuevo para buscar coincidenias con la lista de titulo
              for( f in arrayTitleName ) {

                if ( titleList[i] == arrayTitleName[f].title_list ) {
            
                  // Imprimir en nombre de subcategoría debajo de el listado correspondiente
                  $(`[titleList='${titleList[i]}']`).append(
                    `<li>
                      <a [routerLink]="['products', ${arrayTitleName[f].url}]">${arrayTitleName[f].subcategory}</a>
                    </li>`);
                }
              }
             
            });
        }
      });
    }

  }

}
