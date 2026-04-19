import type { CatalogFilters } from '@/types/filter';

type CatalogSearchParams = CatalogFilters & {
  page?: string;
  perPage?: string;
};

export const cleanParams = (params: Partial<CatalogSearchParams>) => {
  const cleanedEntries = Object.entries(params).flatMap(([key, value]) => {
    const rawValue = Array.isArray(value) ? value[0] : value;

    if (typeof rawValue !== 'string') {
      return [];
    }

    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
      return [];
    }

    return [[key, trimmedValue] as const];
  });

  return Object.fromEntries(cleanedEntries) as Partial<CatalogSearchParams>;
};
