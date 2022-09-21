import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { selectCurrentPage, selectPageSize, selectTotalCount } from './table.selectors';

describe('TableSelector', () => {
    const item1: NetflixTitle = {
        "show_id": "s1",
        "type": "Movie",
        "title": "Dick Johnson Is Dead",
        "director": [
          "Kirsten Johnson"
        ],
        "cast": ["Someone"],
        "country": [
          "United States"
        ],
        "date_added": "September 25, 2021",
        "release_year": "2020",
        "rating": "PG-13",
        "duration": "90 min",
        "listed_in": [
          "Documentaries"
        ],
        "description": "Test Description 1"
    };

    const item2: NetflixTitle = {
        "show_id": "s2",
        "type": "TV Show",
        "title": "Live Long and Prosper",
        "director": [
          "Jannet Kirston"
        ],
        "cast": ["Someone Else"],
        "country": [
          "Germany"
        ],
        "date_added": "October 30, 1999",
        "release_year": "2020",
        "rating": "R",
        "duration": "2 Seasons",
        "listed_in": [
          "Horror"
        ],
        "description": "Test Description 2"
    }

    describe('selectCurrentPage', () => {
        it('should return current page', () => {
            const expected: NetflixTitle[] = [item2];
    
            expect(selectCurrentPage.projector({
                items: [item1, item2],
                page: 1,
                pageSize: 1,
            })).toEqual(expected);
        });

        it('should return sorted page (desc)', () => {
            const expected: NetflixTitle[] = [item2, item1];

            expect(selectCurrentPage.projector({
                items: [item1, item2],
                page: 0,
                pageSize: 2,
                sort: { active: 'show_id', direction: 'desc' },
            })).toEqual(expected);
        });

        it('should return sorted page (asc)', () => {
            const expected: NetflixTitle[] = [item1, item2];

            expect(selectCurrentPage.projector({
                items: [item1, item2],
                page: 0,
                pageSize: 2,
                sort: { active: 'show_id', direction: 'asc' },
            })).toEqual(expected);
        });
    });

    describe('selectPageSize', () => {
        it('should return pageSize', () => {
            expect(selectPageSize.projector({
                pageSize: 1337,
            })).toBe(1337);
        });
    });
    
    describe('selectTotalCount', () => {
        it('should return the number of items', () => {
            expect(selectTotalCount.projector({
                items: [item1, item2],
            })).toBe(2)
        })
    });
})