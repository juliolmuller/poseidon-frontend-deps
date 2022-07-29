import { QueryFilters, Updater, MutationFilters } from './utils';
import type { QueryClientConfig, DefaultOptions, FetchInfiniteQueryOptions, FetchQueryOptions, InfiniteData, InvalidateOptions, InvalidateQueryFilters, MutationKey, MutationObserverOptions, MutationOptions, QueryFunction, QueryKey, QueryObserverOptions, RefetchOptions, RefetchQueryFilters, ResetOptions, ResetQueryFilters, SetDataOptions } from './types';
import type { QueryState } from './query';
import { QueryCache } from './queryCache';
import { MutationCache } from './mutationCache';
import { CancelOptions, DefaultedQueryObserverOptions } from './types';
import { Logger } from './logger';
export declare class QueryClient {
    private queryCache;
    private mutationCache;
    private logger;
    private defaultOptions;
    private queryDefaults;
    private mutationDefaults;
    private unsubscribeFocus?;
    private unsubscribeOnline?;
    constructor(config?: QueryClientConfig);
    mount(): void;
    unmount(): void;
    isFetching(filters?: QueryFilters): number;
    isFetching(queryKey?: QueryKey, filters?: QueryFilters): number;
    isMutating(filters?: MutationFilters): number;
    getQueryData<TData = unknown>(queryKey: QueryKey, filters?: QueryFilters): TData | undefined;
    getQueriesData<TData = unknown>(queryKey: QueryKey): [QueryKey, TData][];
    getQueriesData<TData = unknown>(filters: QueryFilters): [QueryKey, TData][];
    setQueryData<TData>(queryKey: QueryKey, updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions): TData | undefined;
    setQueriesData<TData>(queryKey: QueryKey, updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions): [QueryKey, TData | undefined][];
    setQueriesData<TData>(filters: QueryFilters, updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions): [QueryKey, TData | undefined][];
    getQueryState<TData = unknown, TError = undefined>(queryKey: QueryKey, filters?: QueryFilters): QueryState<TData, TError> | undefined;
    removeQueries(filters?: QueryFilters): void;
    removeQueries(queryKey?: QueryKey, filters?: QueryFilters): void;
    resetQueries<TPageData = unknown>(filters?: ResetQueryFilters<TPageData>, options?: ResetOptions): Promise<void>;
    resetQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: ResetQueryFilters<TPageData>, options?: ResetOptions): Promise<void>;
    cancelQueries(filters?: QueryFilters, options?: CancelOptions): Promise<void>;
    cancelQueries(queryKey?: QueryKey, filters?: QueryFilters, options?: CancelOptions): Promise<void>;
    invalidateQueries<TPageData = unknown>(filters?: InvalidateQueryFilters<TPageData>, options?: InvalidateOptions): Promise<void>;
    invalidateQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: InvalidateQueryFilters<TPageData>, options?: InvalidateOptions): Promise<void>;
    refetchQueries<TPageData = unknown>(filters?: RefetchQueryFilters<TPageData>, options?: RefetchOptions): Promise<void>;
    refetchQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: RefetchQueryFilters<TPageData>, options?: RefetchOptions): Promise<void>;
    fetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<TData>;
    fetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<TData>;
    fetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<TData>;
    prefetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    prefetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    prefetchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    fetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<InfiniteData<TData>>;
    fetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<InfiniteData<TData>>;
    fetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<InfiniteData<TData>>;
    prefetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    prefetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    prefetchInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): Promise<void>;
    resumePausedMutations(): Promise<void>;
    getQueryCache(): QueryCache;
    getMutationCache(): MutationCache;
    getLogger(): Logger;
    getDefaultOptions(): DefaultOptions;
    setDefaultOptions(options: DefaultOptions): void;
    setQueryDefaults(queryKey: QueryKey, options: QueryObserverOptions<unknown, any, any, any>): void;
    getQueryDefaults(queryKey?: QueryKey): QueryObserverOptions<any, any, any, any, any> | undefined;
    setMutationDefaults(mutationKey: MutationKey, options: MutationObserverOptions<any, any, any, any>): void;
    getMutationDefaults(mutationKey?: MutationKey): MutationObserverOptions<any, any, any, any> | undefined;
    defaultQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey>(options?: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> | DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>): DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
    defaultMutationOptions<T extends MutationOptions<any, any, any, any>>(options?: T): T;
    clear(): void;
}
