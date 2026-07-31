const INDONESIAN_LOCALE = "id-ID";
const INDONESIAN_TIME_ZONE = "Asia/Jakarta";
const EMPTY_VALUE = "—";

const defaultNumberFormatter = new Intl.NumberFormat(INDONESIAN_LOCALE);
const defaultDateFormatter = new Intl.DateTimeFormat(INDONESIAN_LOCALE, {
  dateStyle: "medium",
  timeZone: INDONESIAN_TIME_ZONE,
});

export function formatNumber(
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions,
) {
  if (value == null || !Number.isFinite(value)) {
    return EMPTY_VALUE;
  }

  if (!options) {
    return defaultNumberFormatter.format(value);
  }

  return new Intl.NumberFormat(INDONESIAN_LOCALE, options).format(value);
}

export function formatDate(
  value: Date | string | number | null | undefined,
  options?: Intl.DateTimeFormatOptions,
) {
  if (value == null) {
    return EMPTY_VALUE;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return EMPTY_VALUE;
  }

  if (!options) {
    return defaultDateFormatter.format(date);
  }

  return new Intl.DateTimeFormat(INDONESIAN_LOCALE, {
    timeZone: INDONESIAN_TIME_ZONE,
    ...options,
  }).format(date);
}
