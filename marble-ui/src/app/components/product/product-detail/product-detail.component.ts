import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMarble } from 'src/app/models/marble';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  // we could use a '!' definite asisgnment assertion that tells the compiler we plan to initialize this property later, 
  // but we will get the date using http, there will be some delay to receiving the response 
  // to be more explicit we marked it as undefined as well, the property will be undefined untill the data is retrieved
  product: IMarble | undefined; 

  constructor(private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
