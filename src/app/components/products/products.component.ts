import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/models/product';
import { FacetDto, FacetValueDto, ProductSearchResponseDto } from 'src/app/models/response/product-search-response-dto';
import { SearchSharedService } from 'src/app/services/search-shared-service';
import { Filter,SearchQueryDto} from 'src/app/models/search-query-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchResponse:ProductSearchResponseDto;
  products:Array<Product>;
  facetDtos:Array<FacetDto>;
  checkedValues: Array<String>;
  filter: Filter;
  filters: Array<Filter>;
  searchQueryDto: SearchQueryDto;
  searchTerm : string;
  isChecked=false;

  constructor(private searchSharedService: SearchSharedService,private productService: ProductService,
    private route: ActivatedRoute,private router:Router) { 
    console.log("product component constructor");
  }

  ngOnInit() {
    this.checkedValues = [];
    this.filters = [];
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    console.log("product oninit"+ this.searchTerm);
    this.searchSharedService.currentMessage.subscribe(searchResponse => this.searchResponse = searchResponse);
    let isEmpty = JSON.stringify(this.searchResponse) === "{}";
    //console.log("searchresponse:" + JSON.stringify(this.searchResponse));

    if(!isEmpty) {
      
      this.products = this.searchResponse.products;
      this.facetDtos = this.searchResponse.facetDtos;
      //console.log(this.products.length);
      //console.log("products:"+JSON.stringify(this.products));
      console.log("facets:" + JSON.stringify(this.facetDtos));
    } else {
      this.router.navigateByUrl('/');
    }
  }

  check(facetName: String, facetNameValue: String, event: any) {
    /*this.filter = {
      "key": facetName,
      "value": facetNameValue
    };*/
    this.isChecked=event.currentTarget.checked;
    console.log("isChecked:"+event.currentTarget.checked);
    console.log("filter:"+ JSON.stringify(this.filter));
    var selectedFacetValues = [];
    if(this.isChecked)
      this.checkedValues.push(facetNameValue);
    else{
    this.checkedValues.forEach((checkedValue,index)=>{
      if(checkedValue === facetNameValue)
        this.checkedValues.splice(index,1);
    });
    }
    console.log("checkedValues:" + this.checkedValues);
    //this.getProducts();
    //this.checkedValues.push(facetNameValue);
    //document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  isCheckedFunc(facetValueName: String): Boolean {
    return this.checkedValues.indexOf(facetValueName) >= 0;
  }

  private getProducts() {
    this.searchQueryDto = {
      textQuery: this.searchTerm,
      filters: this.filters
    };    
    console.log("SearchQueryDTo:"+ JSON.stringify(this.searchQueryDto));
    this.productService.searchWithFilters(this.searchQueryDto).subscribe((res) => {
      console.log(res);
      this.products = res.products;
      
      var facetDtos: Array<FacetDto> = [];
      res.facetDtos.forEach(facetDto => {
        var  facetValuesDto: Array<FacetValueDto> = [];
          facetDto.facetValueDto.forEach(facetValue => {
               let facetValueDto:FacetValueDto; 
               facetValueDto = {
                facetValueName: facetValue.facetValueName,
                count: facetValue.count,
                checked: this.isCheckedFunc(facetValue.facetValueName)
              }
              facetValuesDto.push(facetValueDto);
          });
          let facetDto1:FacetDto = {
            facetName: facetDto.facetName,
            facetValueDto: facetValuesDto 
          };
          facetDtos.push(facetDto1);
      })
      this.facetDtos = facetDtos;
    });
  }

  applyFacets(){
    var filters = [];
    this.facetDtos.forEach(facetDto => {
      var selectedFacetValues = [];
      facetDto.facetValueDto.forEach(facetValueDto => {
        if(facetValueDto.checked)
          selectedFacetValues.push(facetValueDto.facetValueName);
      });
      if(selectedFacetValues.length>0){
        filters.push({
          key : facetDto.facetName,
          value: selectedFacetValues
        })
      }
    });
    console.log("selected filters:" + JSON.stringify(filters));
    //this.searchQueryDto.filters = filters;
    this.filters = filters;    
    this.getProducts();
  }

  fieldsChange(values:any):void {
    console.log(values.currentTarget.checked);
  }

}
