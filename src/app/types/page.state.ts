import { Sort } from "./sort.interface";

export interface PageState<Item> {
    pageSize: number;
    page: number;
    items: Item[];
    sort?: Sort
}