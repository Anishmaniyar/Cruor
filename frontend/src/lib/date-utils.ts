/**
 * Parses a date-only value from the API without shifting the calendar day.
 *
 * The backend columns are DATE/TIME types with no timezone, but they are
 * serialized as full ISO timestamps at UTC midnight, e.g.
 * "2026-09-20T00:00:00.000Z". Passing that straight to `new Date(...)` and then
 * formatting it in local time renders the PREVIOUS day for every viewer west of
 * UTC (a Sep 20 booking showed as "Sep 19" in New York).
 *
 * Reading the date portion and rebuilding it at LOCAL midnight keeps the
 * displayed day identical in every timezone, because the formatter also works in
 * local time.
 *
 * Returns null when the value is empty or unparseable.
 */
export function parseDateOnly(value: string | null | undefined): Date | null {
  if (!value) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (!match) {
    const fallback = new Date(value);
    return isNaN(fallback.getTime()) ? null : fallback;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  return new Date(year, month - 1, day);
}
