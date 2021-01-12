import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { environment } from 'src/environments/environment';

declare const $: any;
declare const jQuery: any;

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path: string = environment.pathUrl;
  categories: any = null;
  render = true;
  categoryList: Array<any> = [];

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
          this.categoryList.push(JSON.parse(resCategories[i].title_list));
        }
      });

      $(document).on('click', '.sub-toggle', function() {
        $(this).parent().children('ul').toggle();
      });

  }

  // Función que nos avisa cuando finaliza el renderizando de Angular
  callback() {

    if ( this.render ) {
      this.render = false;
      let arraySubCategories: any[] = [];

       // Separar las categorías
      this.categoryList.forEach( category => {

        // Tomamos la colección de las sub-categorias filtrando los nombres de categoría
       this.subcategorieSrv.getFilterData('category', category)
        .subscribe((resSubcategories: any) => {
          
          // Se hace un recorrido por la colección general de subcategorias y clasificamos de acuerdo a la categoría que correspondan
          let i;

          for (i in resSubcategories ) {
            arraySubCategories.push({
              'category': resSubcategories[i].category,
              'subcategory': resSubcategories[i].name,
              'url': resSubcategories[i].url
            });
          }

          // Recorremos el array de objetos nuevos para buscar coincidencias con los nombres de categorias
          for (i in arraySubCategories ) {
            
            if ( category == arraySubCategories[i].category ) {
             
              $(`[category='${ category }']`).append(

              `<li class="current-menu-item">
                  <a href="products/${ arraySubCategories[i].url }">${ arraySubCategories[i].subcategory }</a>
               </li>`);

            }

          }

        });
        
      });
    }

  }

}
