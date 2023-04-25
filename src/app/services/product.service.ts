import { Injectable } from '@angular/core';
import { SearchQueryDto } from '../models/search-query-dto';
import { HttpClient } from '@angular/common/http';
import { ProductSearchResponseDto } from '../models/response/product-search-response-dto';
import { PRODUCT_SEARCH_API_CONSTANTS, PRODUCT_SEARCH_SERVER_CONSTANTS } from '../constants/product.constants';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  search(searchQueryDto: SearchQueryDto){
    //const searchUrl = `${PRODUCT_SEARCH_SERVER_CONSTANTS.baseURL}/${PRODUCT_SEARCH_API_CONSTANTS.search}`;
    const query = searchQueryDto.textQuery;
    /*return this.http.post<ProductSearchResponseDto>(searchUrl, searchQueryDto).pipe(map(data => {
      return data;
    }));*/
    return this.http.get<ProductSearchResponseDto>(environment.searchUrl+"?query="+query);
  }

  searchWithFilters(searchQueryDto: SearchQueryDto){
    //const searchUrl = `${PRODUCT_SEARCH_SERVER_CONSTANTS.baseURL}/${PRODUCT_SEARCH_API_CONSTANTS.search}`;
    return this.http.post<ProductSearchResponseDto>(environment.searchUrl, searchQueryDto).pipe(map(data => {
      return data;
    }));
  }
}
