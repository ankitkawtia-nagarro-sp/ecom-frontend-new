export class SearchQueryDto{
    textQuery: String;
    filters: Array<Filter>
}

export class Filter {
    key: String;
    value: Array<String>;
    from?: String;
    to?: String;
}