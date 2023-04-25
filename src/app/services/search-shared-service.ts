import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductSearchResponseDto } from '../models/response/product-search-response-dto';

@Injectable()
export class SearchSharedService{
    private messageSource = new BehaviorSubject<ProductSearchResponseDto>(new ProductSearchResponseDto());
    currentMessage = this.messageSource.asObservable();

    constructor(){}

    sendSearchData(productSearchResponseDto: ProductSearchResponseDto){
        console.log("sendsearchdata:"+JSON.stringify(productSearchResponseDto));
        this.messageSource.next(productSearchResponseDto);
    }
    
}