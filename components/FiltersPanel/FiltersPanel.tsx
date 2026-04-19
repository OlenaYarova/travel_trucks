'use client';

import { useEffect, useState } from 'react';

import type { CatalogFilters, FilterOptions } from '@/types/filter';

import styles from './FiltersPanel.module.css';

type FiltersPanelProps = {
  value: CatalogFilters;
  options?: FilterOptions;
  onApply: (filters: CatalogFilters) => void;
  onReset: () => void;
};

const defaultFilters: CatalogFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export function FiltersPanel({
  value,
  options,
  onApply,
  onReset,
}: FiltersPanelProps) {
  const [draftFilters, setDraftFilters] = useState<CatalogFilters>({
    ...defaultFilters,
    ...value,
  });

  useEffect(() => {
    setDraftFilters({
      ...defaultFilters,
      ...value,
    });
  }, [value]);

  const setField = (field: keyof CatalogFilters, nextValue: string) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: nextValue,
    }));
  };

  return (
    <form
      className={styles.panel}
      onSubmit={(event) => {
        event.preventDefault();
        onApply(draftFilters);
      }}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <input
          id="location"
          className={styles.input}
          type="text"
          placeholder="City"
          value={draftFilters.location ?? ''}
          onChange={(event) => setField('location', event.target.value)}
        />
      </div>

      <FilterGroup
        title="Vehicle type"
        name="form"
        options={options?.forms ?? []}
        value={draftFilters.form ?? ''}
        onChange={(nextValue) => setField('form', nextValue)}
      />

      <FilterGroup
        title="Engine"
        name="engine"
        options={options?.engines ?? []}
        value={draftFilters.engine ?? ''}
        onChange={(nextValue) => setField('engine', nextValue)}
      />

      <FilterGroup
        title="Transmission"
        name="transmission"
        options={options?.transmissions ?? []}
        value={draftFilters.transmission ?? ''}
        onChange={(nextValue) => setField('transmission', nextValue)}
      />

      <div className={styles.actions}>
        <button className={styles.primaryButton} type="submit">
          Search
        </button>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => {
            setDraftFilters(defaultFilters);
            onReset();
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

type FilterGroupProps = {
  title: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterGroup({
  title,
  name,
  options,
  value,
  onChange,
}: FilterGroupProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{title}</legend>

      <div className={styles.options}>
        {options.map((option) => (
          <label key={option} className={styles.option}>
            <input
              className={styles.radio}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span className={styles.optionLabel}>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
