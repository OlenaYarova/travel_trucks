import type { CatalogFilters } from '@/types/filter';

type CatalogSearchParams = CatalogFilters & {
  page?: string;
  perPage?: string;
};

export const cleanParams = (params: Partial<CatalogSearchParams>) => {
  const cleanedEntries = Object.entries(params).flatMap(([key, value]) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;

    if (typeof normalizedValue !== 'string') {
      return [];
    }

    const trimmedValue = normalizedValue.trim();

    if (!trimmedValue) {
      return [];
    }

    return [[key, trimmedValue] as const];
  });

  return Object.fromEntries(cleanedEntries) as Partial<CatalogSearchParams>;
};
