import { Sort } from "./sort.interface";

export interface PageState<Item> {
    displayedColumns: (keyof Item)[];
    pageSize: number;
    page: number;
    items: Item[];
    sort?: Sort;
    search: string;
}