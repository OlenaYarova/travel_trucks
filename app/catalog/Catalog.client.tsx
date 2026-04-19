'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { FiltersPanel } from '@/components/FiltersPanel/FiltersPanel';
import { CamperList } from '@/components/CamperList/CamperList';
import Loader from '@/components/Loader/Loader';
import { LoadMoreButton } from '@/components/LoadMoreButton/LoadMoreButton';
import { DEFAULT_CATALOG_PAGINATION } from '@/constans/pagination';
import { normalizeLocation } from '@/helpers/cleanParams';
import { getAllCampers, getFilters } from '@/lib/api/clientApi';
import type { Camper, GetAllCampersParams } from '@/types/camper';
import type { CatalogFilters, FilterOptions } from '@/types/filter';

import styles from './Catalog.module.css';

type CatalogClientProps = {
  initialSearchParams: GetAllCampersParams;
};

const fallbackFilterOptions: FilterOptions = {
  forms: ['alcove', 'panel_van', 'integrated', 'semi_integrated'],
  transmissions: ['automatic', 'manual'],
  engines: ['diesel', 'petrol', 'hybrid', 'electric'],
};

const extractFilters = ({
  location,
  form,
  transmission,
  engine,
}: GetAllCampersParams): CatalogFilters => ({
  location,
  form,
  transmission,
  engine,
});

const buildSearchParams = (filters: CatalogFilters) => {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      searchParams.set(
        key,
        key === 'location' ? normalizeLocation(value) : value
      );
    }
  });

  searchParams.set('page', String(DEFAULT_CATALOG_PAGINATION.page));
  searchParams.set('perPage', String(DEFAULT_CATALOG_PAGINATION.perPage));

  return searchParams.toString();
};

const getPageItems = (page: unknown) => {
  if (
    page &&
    typeof page === 'object' &&
    'campers' in page &&
    Array.isArray((page as { campers?: unknown }).campers)
  ) {
    return (page as { campers: Camper[] }).campers;
  }

  return [];
};

const normalizeFilters = (filters: CatalogFilters): CatalogFilters => ({
  ...filters,
  location: filters.location ? normalizeLocation(filters.location) : '',
});

export default function CatalogClient({
  initialSearchParams,
}: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeFilters, setActiveFilters] = useState<CatalogFilters>(
    extractFilters(initialSearchParams)
  );

  const { data: filterOptions } = useQuery<FilterOptions>({
    queryKey: ['filters'],
    queryFn: getFilters,
    refetchOnMount: false,
    retry: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['campers', activeFilters],
    queryFn: ({ pageParam }) =>
      getAllCampers({
        ...activeFilters,
        perPage:
          initialSearchParams.perPage ?? DEFAULT_CATALOG_PAGINATION.perPage,
        page: Number(pageParam),
      }),
    initialPageParam:
      initialSearchParams.page ?? DEFAULT_CATALOG_PAGINATION.page,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => getPageItems(page)) ?? [];

  const handleApplyFilters = (nextFilters: CatalogFilters) => {
    const normalizedFilters = normalizeFilters(nextFilters);

    setActiveFilters(normalizedFilters);

    const queryString = buildSearchParams(normalizedFilters);
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  };

  const handleResetFilters = () => {
    handleApplyFilters({});
  };

  return (
    <main className={styles.main}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <FiltersPanel
            key={JSON.stringify(activeFilters)}
            value={activeFilters}
            options={filterOptions ?? fallbackFilterOptions}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </aside>

        <section className={styles.content}>
          {isLoading && <Loader label="Завантажуємо кемпери..." />}
          {isError && <p className={styles.state}>Failed to load campers.</p>}

          {!isLoading && !isError && (
            <>
              <CamperList campers={campers} />

              {hasNextPage && (
                <div className={styles.loadMoreWrap}>
                  <LoadMoreButton
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    loading={isFetchingNextPage}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
