import { PageEvent } from "@angular/material/paginator";
import { Observable } from "rxjs";
import { Sort } from "./sort.interface";

export interface ActionableTable<Item> {
    readonly items: Observable<Item[]>;
    readonly pageSize: Observable<number>;
    readonly length: Observable<number>;
    sort(event: Sort): void;
    paginate(event: PageEvent): void;
    loadPage(index: number): void;
}