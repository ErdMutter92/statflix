export interface PageState<Item> {
    pageSize: number;
    page: number;
    items: Item[];
}