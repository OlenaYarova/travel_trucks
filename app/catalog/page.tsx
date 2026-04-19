
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CatalogClient from './Catalog.client';
import { getAllCampers } from '@/lib/api/clientApi';
import { cleanParams } from '@/helpers/cleanParams';
import { DEFAULT_CATALOG_PAGINATION } from '../../constans/pagination';
import type { CatalogFilters } from '@/types/filter';


type CatalogPageProps = {
  searchParams: Promise<
    CatalogFilters & {
      page?: string;
      perPage?: string;
    }
  >;
};



export default async function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  const cleanedParams = cleanParams((await searchParams) ?? {});

  const params = {
    ...cleanedParams,
    page: Number(cleanedParams.page) || DEFAULT_CATALOG_PAGINATION.page,
    perPage:
      Number(cleanedParams.perPage) || DEFAULT_CATALOG_PAGINATION.perPage,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', params],
    queryFn: ({ pageParam = DEFAULT_CATALOG_PAGINATION.page }) =>
      getAllCampers({
        location: params.location,
        form: params.form,
        engine: params.engine,
        transmission: params.transmission,
        page: Number(pageParam),

      }),
    initialPageParam: DEFAULT_CATALOG_PAGINATION.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient initialSearchParams={params} />
    </HydrationBoundary>
  );
}
