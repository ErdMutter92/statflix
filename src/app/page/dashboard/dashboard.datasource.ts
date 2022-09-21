import {
    CollectionViewer, DataSource
} from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { loadPage, pageChange } from './dashboard.actions';
import { Store } from '@ngrx/store';
import { PageState } from "src/app/types/page.state";
import { selectCurrentPage, selectPageSize, selectTotalCount } from "./dashboard.selectors";
import { PageEvent } from "@angular/material/paginator";
import { NetflixTitle } from "src/app/types/netflixtitle.interface";

/**
 * NOTE: I am overloading this datasource to handle a lot of things happening with
 * the table. I'm doing this because the datasource lives in the frontend, but want
 * to pretend as though it is something retreived from the backend.
 */
@Injectable()
export class DashboardDataSource implements DataSource<NetflixTitle> {
    public readonly items = this.store.select(selectCurrentPage);
    public readonly pageSize = this.store.select(selectPageSize);
    public readonly length = this.store.select(selectTotalCount);

    constructor(
        private store: Store<{ dashboard: PageState<NetflixTitle> }>
    ) {}

    connect(collectionViewer: CollectionViewer): Observable<NetflixTitle[]> {
        return this.items;
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    /**
     * 
     * @param index (default: 0)
     */
    loadPage(index: number = 0) {
        this.store.dispatch(loadPage({ page: index }));
    }

    /**
     * This forwards the event from the paginator to the reducer where we
     * extract the pageIndex and the pageSize to determine the next state.
     * @param event PageEvent
     */
    paginate(event: PageEvent) {
        this.store.dispatch(pageChange(event));
    }
}