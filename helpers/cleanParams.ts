import type { CatalogFilters } from '@/types/filter';

type CatalogSearchParams = CatalogFilters & {
  page?: string;
  perPage?: string;
};

export const normalizeLocation = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue.includes(',')) {
    return trimmedValue;
  }

  const parts = trimmedValue
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length !== 2) {
    return trimmedValue;
  }

  const [firstPart, secondPart] = parts;

  if (
    !firstPart.toLowerCase().startsWith('ukraine') &&
    secondPart.toLowerCase().startsWith('ukraine')
  ) {
    return `${secondPart}, ${firstPart}`;
  }

  return `${firstPart}, ${secondPart}`;
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

    if (key === 'location') {
      return [[key, normalizeLocation(trimmedValue)] as const];
    }

    return [[key, trimmedValue] as const];
  });

  return Object.fromEntries(cleanedEntries) as Partial<CatalogSearchParams>;
};
