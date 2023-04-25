import { Product } from "../product";

export class ProductSearchResponseDto {
    products: Array<Product>;
    minPrice: Number;
    maxPrice: Number;
    facetDtos: Array<FacetDto>;
}

export class FacetDto {
    facetName: String;
    facetValueDto: Array<FacetValueDto>;
}

export class FacetValueDto {
    facetValueName: String;
    count: Number;
    checked: Boolean;
}