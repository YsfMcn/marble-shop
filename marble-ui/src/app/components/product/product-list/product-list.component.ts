import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMarble } from 'src/app/models/marble';
import { MarbleService } from 'src/app/services/marble.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Product List';
  showImage: boolean = false;
  private _listFilter: string = '';
  imageWidth: number = 50;
  imageMargine: number = 2;
  filteredProducts: IMarble[] = [];
  products: IMarble[] = [];
  errorMessage: String = ''; 
  sub!: Subscription; // without assignment, we can declare the type; Subscription | undefined; or add '!' meaning we will assign a value later on.

  constructor(private marbleService: MarbleService) { 
  }

  ngOnInit(): void {
    this.sub = this.marbleService.getAllMarbles().subscribe({
      next: data => {
        this.products = data;
         this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    }); // service fetches the data from BE, and may take a while thats why we use it here instead in constructor
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IMarble[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IMarble) => product.name.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  get listFilter(): string { // can accessed with listFilter(name of the method) from DOM
    return this._listFilter;
  }

  set listFilter(listFilter: string) {
    this._listFilter = listFilter;
    this.filteredProducts = this.performFilter(listFilter);
  }
}
