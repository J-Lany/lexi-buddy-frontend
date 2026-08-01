import { getListViewState } from '@/shared/lib/list-view-state';

describe('getListViewState', () => {
  it('is "loading" while pending, regardless of error/count', () => {
    expect(
      getListViewState({ isPending: true, isError: false, totalCount: 0, filteredCount: 0 }),
    ).toBe('loading');
    expect(
      getListViewState({ isPending: true, isError: true, totalCount: 0, filteredCount: 0 }),
    ).toBe('loading');
    expect(
      getListViewState({ isPending: true, isError: false, totalCount: 5, filteredCount: 5 }),
    ).toBe('loading');
  });

  it('is "error" once not pending and isError is true', () => {
    expect(
      getListViewState({ isPending: false, isError: true, totalCount: 0, filteredCount: 0 }),
    ).toBe('error');
    expect(
      getListViewState({ isPending: false, isError: true, totalCount: 3, filteredCount: 3 }),
    ).toBe('error');
  });

  it('is "empty" once not pending, no error, and the source collection is empty', () => {
    expect(
      getListViewState({ isPending: false, isError: false, totalCount: 0, filteredCount: 0 }),
    ).toBe('empty');
  });

  it('is "no-results" when the source has items but the filter matched none', () => {
    expect(
      getListViewState({ isPending: false, isError: false, totalCount: 5, filteredCount: 0 }),
    ).toBe('no-results');
  });

  it('is "list" when the filter matched at least one item', () => {
    expect(
      getListViewState({ isPending: false, isError: false, totalCount: 5, filteredCount: 5 }),
    ).toBe('list');
    expect(
      getListViewState({ isPending: false, isError: false, totalCount: 5, filteredCount: 2 }),
    ).toBe('list');
  });

  it('never returns two different states for the same input (deterministic, exhaustive switch)', () => {
    const bools = [true, false];
    const counts = [0, 1, 5];
    const seen = new Set<string>();

    for (const isPending of bools) {
      for (const isError of bools) {
        for (const totalCount of counts) {
          for (const filteredCount of counts) {
            const result = getListViewState({ isPending, isError, totalCount, filteredCount });
            seen.add(result);
          }
        }
      }
    }

    expect([...seen].sort()).toEqual(['empty', 'error', 'list', 'loading', 'no-results'].sort());
  });
});
