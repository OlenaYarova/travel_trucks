import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse the TravelTrucks camper catalog, filter vehicles, and load more offers for your next trip.',
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    title: 'Catalog | TravelTrucks',
    description:
      'Browse the TravelTrucks camper catalog, filter vehicles, and load more offers for your next trip.',
    url: 'https://travel-trucks.vercel.app/catalog',
    images: [
      {
        url: '/image/hero_2.webp',
        width: 1440,
        height: 696,
        alt: 'TravelTrucks catalog preview',
      },
    ],
  },
};

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
