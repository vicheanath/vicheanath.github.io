/**
 * Profile data as a typed object so pages can compute from it (durations,
 * totals, current role) instead of hand-maintaining derived strings.
 *
 * Dates are `YYYY-MM`. `end: 'present'` marks an ongoing role: anything derived
 * from today's date must be rendered client-side (see LiveDuration) so the
 * prerendered HTML does not freeze the build date into the page.
 */

export type YearMonth = `${number}-${number}` | 'present';

export interface ExperienceItem {
  title: string;
  company: string;
  start: YearMonth;
  end: YearMonth;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Internship' | 'Freelance';
  workMode: 'On-site' | 'Hybrid' | 'Remote';
}

export interface EducationItem {
  school: string;
  degree: string;
  start: YearMonth;
  end: YearMonth;
}

export interface Profile {
  name: string;
  pronouns?: string;
  headline: string;
  location: string;
  linkedInUrl: string;
  about: string;
  topSkills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export const profile: Profile = {
  name: 'Vichea Nath',
  headline: 'Full-stack software engineer',
  location: '',
  linkedInUrl: 'https://www.linkedin.com/in/vicheanath/',
  about:
    'I am a full-stack software engineer focused on building reliable .NET backends, responsive React applications, and maintainable systems. I write about architecture, APIs, performance, and the practical decisions behind production software.',
  topSkills: ['.NET', 'React', 'TypeScript', 'APIs', 'Architecture'],
  experience: [],
  education: [],
};

/* ----------------------------------------------------------------------
   Derived values
   ---------------------------------------------------------------------- */

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Months since epoch, so ranges are simple subtraction. */
function toMonthIndex(value: YearMonth, now = new Date()): number {
  if (value === 'present') {
    return now.getUTCFullYear() * 12 + now.getUTCMonth();
  }

  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
}

export function formatMonth(value: YearMonth): string {
  if (value === 'present') return 'Present';

  const [year, month] = value.split('-').map(Number);
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

/** "Jul 2025 – Present" */
export function formatPeriod(entry: { start: YearMonth; end: YearMonth }): string {
  return `${formatMonth(entry.start)} – ${formatMonth(entry.end)}`;
}

/** "2 yrs 10 mos" — pass `now` when the range is open-ended. */
export function formatDuration(
  entry: { start: YearMonth; end: YearMonth },
  now = new Date()
): string {
  const months = Math.max(1, toMonthIndex(entry.end, now) - toMonthIndex(entry.start, now));
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);

  return parts.join(' ') || '1 mo';
}

export function isOngoing(entry: { end: YearMonth }): boolean {
  return entry.end === 'present';
}

/** The role at the top of the list, if it is still running. */
export function getCurrentRole(): ExperienceItem | undefined {
  return profile.experience.find(isOngoing) ?? profile.experience[0];
}

/**
 * Total professional experience in whole years, counting distinct months so
 * overlapping roles are not double-counted.
 */
export function getYearsOfExperience(now = new Date()): number {
  const months = new Set<number>();

  for (const job of profile.experience) {
    const from = toMonthIndex(job.start, now);
    const to = toMonthIndex(job.end, now);
    for (let m = from; m < to; m += 1) months.add(m);
  }

  return Math.floor(months.size / 12);
}

export default profile;
