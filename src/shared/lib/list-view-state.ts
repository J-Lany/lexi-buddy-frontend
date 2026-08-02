export type ListViewState = 'loading' | 'error' | 'empty' | 'no-results' | 'list';

type Params = {
  isPending: boolean;
  isError: boolean;
  totalCount: number;
  filteredCount: number;
};

/**
 * `isPending` (not `isLoading`) so a query with `fetchStatus: 'paused'`
 * (offline, no cached data yet) stays `loading` instead of falling through
 * to `empty` — `isLoading` is `isPending && isFetching`, which is false
 * while paused even though there's no confirmed response yet.
 * `isPending` also stays false forever after the first successful response,
 * so a background refetch never re-shows the loading state.
 */
export function getListViewState({
  isPending,
  isError,
  totalCount,
  filteredCount,
}: Params): ListViewState {
  if (isPending) return 'loading';
  if (isError) return 'error';
  if (totalCount === 0) return 'empty';
  if (filteredCount === 0) return 'no-results';
  return 'list';
}
