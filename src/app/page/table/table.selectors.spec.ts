import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import {
  selectAvailableColumns,
  selectCurrentPage,
  selectDisplayedColumns,
  selectNumbersByRating,
  selectNumbersByReleaseYear,
  selectNumbersByReleaseYearTop15,
  selectPageSize,
  selectSearchTerm,
  selectTableFeature,
  selectTotalCount,
} from './table.selectors';

describe('TableSelector', () => {
  const item1: NetflixTitle = {
    show_id: 's1',
    type: 'Movie',
    title: 'Dick Johnson Is Dead',
    director: ['Kirsten Johnson'],
    cast: ['Someone'],
    country: ['United States'],
    date_added: 'September 25, 2021',
    release_year: '2020',
    rating: 'PG-13',
    duration: '90 min',
    listed_in: ['Documentaries'],
    description: 'Test Description 1',
  };

  const item2: NetflixTitle = {
    show_id: 's2',
    type: 'TV Show',
    title: 'Live Long and Prosper',
    director: ['Jannet Kirston'],
    cast: ['Someone Else'],
    country: ['Germany'],
    date_added: 'October 30, 1999',
    release_year: '2020',
    rating: 'R',
    duration: '2 Seasons',
    listed_in: ['Horror'],
    description: 'Test Description 2',
  };

  describe('selectCurrentPage', () => {
    it('should return current page', () => {
      const expected: NetflixTitle[] = [item2];

      expect(
        selectCurrentPage.projector({
          items: [item1, item2],
          page: 1,
          pageSize: 1,
        })
      ).toEqual(expected);
    });

    it('should return sorted page (desc)', () => {
      const expected: NetflixTitle[] = [item2, item1];

      expect(
        selectCurrentPage.projector({
          items: [item1, item2],
          page: 0,
          pageSize: 2,
          sort: { active: 'show_id', direction: 'desc' },
        })
      ).toEqual(expected);
    });

    it('should return sorted page (asc)', () => {
      const expected: NetflixTitle[] = [item1, item2];

      expect(
        selectCurrentPage.projector({
          items: [item1, item2],
          page: 0,
          pageSize: 2,
          sort: { active: 'show_id', direction: 'asc' },
        })
      ).toEqual(expected);
    });
  });

  describe('selectPageSize', () => {
    it('should return pageSize', () => {
      expect(
        selectPageSize.projector({
          pageSize: 1337,
        })
      ).toBe(1337);
    });
  });

  describe('selectTotalCount', () => {
    it('should return the number of items', () => {
      expect(
        selectTotalCount.projector({
          items: [item1, item2],
        })
      ).toBe(2);
    });
  });

  describe('selectSearchTerm', () => {
    it('should return the search term', () => {
      expect(
        selectSearchTerm.projector({
          search: 'search',
        })
      ).toBe('search');
    });
  });

  describe('selectDisplayedColumns', () => {
    it('should return the displayed columns', () => {
      expect(
        selectDisplayedColumns.projector({
          displayedColumns: ['show_id', 'type'],
        })
      ).toEqual(['show_id', 'type']);
    });
  });

  describe('selectAvailableColumns', () => {
    it('should return the displayed columns', () => {
      expect(
        selectAvailableColumns.projector({
          items: [item1],
        })
      ).toEqual(Object.keys(item1));
    });
  });

  describe('selectNumbersByRating', () => {
    it('should return graph dataset of number of shows in each rating', () => {
      expect(
        selectNumbersByRating.projector({
          items: [item1, item2],
        })
      ).toEqual([
        { name: 'PG-13', value: 1 },
        { name: 'R', value: 1 },
      ]);
    });
  });

  describe('selectNumbersByReleaseYear', () => {
    it('should return graph dataset of the number of releases in each release year', () => {
      expect(
        selectNumbersByReleaseYear.projector({
          items: [item1, item2],
        })
      ).toEqual([
        { name: '2020', value: 2 }
      ]);
    });
  });



  describe('selectNumbersByReleaseYearTop15', () => {
    it('should return graph dataset of the top 15 release years with the most releases in them', () => {
      expect(
        selectNumbersByReleaseYearTop15.projector({
          items: [
            { release_year: "2022" } as NetflixTitle,
            { release_year: "2016" } as NetflixTitle,
            { release_year: "2015" } as NetflixTitle,
            { release_year: "2015" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
            { release_year: "2012" } as NetflixTitle,
            { release_year: "2011" } as NetflixTitle,
            { release_year: "2011" } as NetflixTitle,
            { release_year: "2010" } as NetflixTitle,
            { release_year: "2010" } as NetflixTitle,
            { release_year: "2009" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
            { release_year: "2009" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
            { release_year: "2007" } as NetflixTitle,
            { release_year: "2019" } as NetflixTitle,
            { release_year: "2018" } as NetflixTitle,
            { release_year: "2007" } as NetflixTitle,
            { release_year: "2014" } as NetflixTitle,
            { release_year: "2014" } as NetflixTitle,
            { release_year: "2013" } as NetflixTitle,
            { release_year: "2013" } as NetflixTitle,
            { release_year: "2012" } as NetflixTitle,
            { release_year: "2022" } as NetflixTitle,
            { release_year: "2021" } as NetflixTitle,
            { release_year: "2020" } as NetflixTitle,
            { release_year: "2020" } as NetflixTitle,
            { release_year: "2019" } as NetflixTitle,
            { release_year: "2018" } as NetflixTitle,
            { release_year: "2017" } as NetflixTitle,
            { release_year: "2017" } as NetflixTitle,
            { release_year: "2017" } as NetflixTitle,
            { release_year: "2016" } as NetflixTitle,
            { release_year: "2008" } as NetflixTitle,
          ],
        })
      ).toEqual([
        { name: '2022', value: 2 },
        { name: '2020', value: 2 },
        { name: '2019', value: 2 },
        { name: '2018', value: 2 },
        { name: '2017', value: 3 },
        { name: '2016', value: 2 },
        { name: '2015', value: 2 },
        { name: '2014', value: 2 },
        { name: '2013', value: 2 },
        { name: '2012', value: 2 },
        { name: '2011', value: 2 },
        { name: '2010', value: 2 },
        { name: '2009', value: 2 },
        { name: '2008', value: 6 },
        { name: '2007', value: 2 },
      ]);
    });
  });
});
