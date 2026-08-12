import { useSyncExternalStore } from 'react';
import { formatDuration, getYearsOfExperience, type YearMonth } from '../content/profile';

interface LiveDurationProps {
  entry: { start: YearMonth; end: YearMonth };
  /** Rendered before the value, e.g. " · ". */
  prefix?: string;
}

function subscribe() {
  return () => {};
}

/**
 * Duration for an ongoing range. Rendered in the browser only — the value
 * depends on today's date, which would otherwise be frozen at build time in
 * the prerendered HTML and mismatch on hydration.
 */
export default function LiveDuration({ entry, prefix }: LiveDurationProps) {
  const value = useSyncExternalStore(
    subscribe,
    () => formatDuration(entry),
    () => null
  );

  if (!value) return null;

  return (
    <>
      {prefix}
      {value}
    </>
  );
}

/**
 * Total years of experience, computed from the profile timeline. Client-only
 * for the same reason as LiveDuration: the current role has no end date.
 */
export function LiveYearsOfExperience() {
  const years = useSyncExternalStore(
    subscribe,
    () => getYearsOfExperience(),
    () => null
  );

  return <>{years === null ? '' : `${years}+ yrs`}</>;
}
