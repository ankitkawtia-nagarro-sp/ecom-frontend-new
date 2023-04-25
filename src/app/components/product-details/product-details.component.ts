import { Component, OnInit } from '@angular/core';
import { SearchSharedService } from 'src/app/services/search-shared-service';
import { ProductSearchResponseDto } from 'src/app/models/response/product-search-response-dto';
import { Product,ProductFacet } from 'src/app/models/product';
import { FacetDto } from 'src/app/models/response/product-search-response-dto';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  searchResponse:ProductSearchResponseDto;
  products:Array<Product>;
  facetDtos:Array<FacetDto>;
  product: Product;
  tags: Array<String>;
  variants: any[];
  variantNames: Array<any>;
  colorNames: Array<any>;
  colorVariants: any[];
  colors: any[];
  productCode: string;
  color: string;

  constructor(private searchSharedService: SearchSharedService,private route: ActivatedRoute,
    private router:Router,private location:Location) 
  { 
    this.variantNames = [];
    this.colorNames = [];
    this.colorVariants = [[]];
  }

  ngOnInit() {
    this.searchSharedService.currentMessage.subscribe(searchResponse => this.searchResponse = searchResponse);
    //console.log("searchresponse:" + JSON.stringify(this.searchResponse));
    let isEmpty = JSON.stringify(this.searchResponse) === "{}";
    if(!isEmpty) {
      
      this.products = this.searchResponse.products;
      this.facetDtos = this.searchResponse.facetDtos;
      console.log(this.products.length);
      console.log("products:"+JSON.stringify(this.products));
      //console.log("facets:" + JSON.stringify(this.facetDtos));
    }else {
      this.router.navigateByUrl('/');
    }

    const productId = this.route.snapshot.paramMap.get('id');
    //console.log("product id:"+ productId);
    this.product = this.getProduct(productId);
    //console.log("color 0 :"+JSON.stringify(this.product.variants[0].colors[0]));
    //console.log(Object.keys(this.product.variants[0].colors[0])[0]);
    this.tags = this.getTags(this.product.product_facets);
    this.initVariants(this.product.variants);
    //console.log("Product:" + JSON.stringify(this.product));
  }

  getProduct(id: string){
    return this.products.find(product => product.product_id === id)
    
  }

  getTags(facets: Array<ProductFacet>): Array<String>{
    const facet = facets.find( facet => facet.facet_name === 'tags');
    return facet.facet_value;
  }

  initVariants(variants: any[]){
    variants.forEach((v,i) => {
      this.variantNames.push(Object.keys(v)[0]);
      //console.log(JSON.stringify(v));
      this.colors = v.colors;
      //console.log("Colors:" + JSON.stringify(this.colors));
      
      v.colors.forEach((color,i) => {
        //console.log(JSON.stringify(color));
        this.colorNames.push(Object.keys(color)[0]);
        /*color.forEach((c,i) => {
          console.log(JSON.stringify(c));
          this.colorVariants.push(c);
        });*/
      });
      this.colorVariants = this.getColorVariants(this.colorNames[0]);
    });
    
    //this.variantNames = Object.keys(variants);
    //this.colorVariants = Object.keys(this.variantNames);
    //console.log(JSON.stringify(Object.keys(variants)));
    //console.log(JSON.stringify(this.variantNames));
    //console.log(JSON.stringify(this.colorNames));
    //console.log(JSON.stringify(this.colorVariants))


  }

  getColorVariants(color: any): any[]{
   // console.log("getColorVariants:"+ color);
    let colorVariants = [];
    this.color = color;
    this.product.variants[0].colors.forEach(
      (c,i) => {
        let key = Object.keys(c)[0];
        //console.log("Key color"+key);
        if(key === color){
          //console.log("In if cond");
          this.productCode = c[key][0].skuid;
           return colorVariants = c[key];
        }
      }
    );
    //console.log(JSON.stringify(colorVariants));
    return colorVariants;
  }

  sizeChangeHandler (event: any) {
    this.productCode = event.target.value;
  }

  colorChangeHandler(event: any){
    this.colorVariants = this.getColorVariants(event.target.value);
  }

  gotoProducts() {
    //this.router.navigate(['/search']);
    this.location.back();
  }

}
