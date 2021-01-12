import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { environment } from 'src/environments/environment';

declare const $: any;
declare const jQuery: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  path: string = environment.pathUrl;

  categories: any = null;
  render = true;
  categoryList: Array<any> = [];

  constructor( private categorieSrv: CategoriesService,
               private subcategorieSrv: SubCategoriesService ) { }

  ngOnInit(): void {

    this.getData();

  }

  getData() {
    this.categorieSrv.getData()
      .subscribe( (resCategories: any) => {
        this.categories = resCategories;

        let i;

        for ( i in resCategories ) {

          this.categoryList.push(resCategories[i].name);

        }

      } );
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
          arraySubCategories = [];
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
             
              $(`[category-footer='${ category }']`).after(

              `<a href="products/${ arraySubCategories[i].url }">${ arraySubCategories[i].subcategory }</a>`);

            }

          }

        });
        
      });
    }

  }

}
