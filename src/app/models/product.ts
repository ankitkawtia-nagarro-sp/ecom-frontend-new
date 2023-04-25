

export class Product {
    product_id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    status: string;
    imgs: Array<Img>;
    dimensions: Dimension;
    weight: string;
    qty: number;
    attrs: Array<Attribute>;
    merchant_info: MerchantInfo;
    price_details: PriceDetails;
    product_facets: Array<ProductFacet>;
    variants: any[];
}

class Img {
    height:string;
	width:string;
	src:string;
}
class Dimension {
    unit:string;
	length:number;
	width:number;
	height:number;
}

class Attribute {
    name:string;
	value:string;
}

class MerchantInfo{
    id:string;
	name:string;
	address:string;
	city:string;
	state:string;
	zipcode:string;
	country:string;
}

class PriceDetails{
    currency:string;
	mrp:Number;
	sale_price:Number;
	discount:Number;
}

export class ProductFacet{
    facet_name:String;
    facet_value:Array<String>;
}


