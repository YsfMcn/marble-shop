import { NgModule } from '@angular/core';
import { ConvertToSpacesPipe } from 'src/app/shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from 'src/app/guards/product-detail.guard';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { 
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
         component: ProductDetailComponent 
        }
    ]),
    SharedModule
  ]
})
export class ProductModule { }
