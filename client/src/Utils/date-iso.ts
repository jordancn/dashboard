import { shame } from "@/Types/core";
import * as DateFns from "date-fns";
import * as _ from "lodash";
import { reverse } from "lodash";
import { isString } from "util";
import { Brand } from "./core";

export type DateIso = Brand<string, "ISO8601Date">;
export type DateTense = "today" | "past" | "future";
export const VALID_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

function validateAndParse(date: DateIso): Date {
  if (process.env.NODE_ENV !== "production" && !VALID_REGEX.test(date)) {
    throw new Error(`Invalid IsoDate ${date}`);
  }
  return DateFns.parseISO(date);
}

export const parseToDate = validateAndParse;
export const differenceInDays = (a: DateIso, b: DateIso): number =>
  DateFns.differenceInCalendarDays(validateAndParse(a), validateAndParse(b));

export const differenceInMonths = (a: DateIso, b: DateIso): number =>
  DateFns.differenceInMonths(validateAndParse(a), validateAndParse(b));

export const differenceInHours = (a: DateIso, b: DateIso): number =>
  DateFns.differenceInHours(validateAndParse(a), validateAndParse(b));

export const lastDayOfMonth = (a: DateIso): DateIso =>
  toIsoDate(DateFns.lastDayOfMonth(validateAndParse(a)));

export const tomorrow = (): DateIso => addDays(today(), 1);
export const lastWeek = (): DateIso => addDays(today(), -7);
export const nextWeek = (): DateIso => addDays(today(), 7);
export const yesterday = (): DateIso => addDays(today(), -1);
export const isThisYear = (x: DateIso): boolean =>
  getYearFromIsoDate(x) === thisYear();
export const isLastYear = (x: DateIso): boolean =>
  getYearFromIsoDate(x) === lastYear();
export const isAfter = (x: DateIso, y: DateIso) =>
  DateFns.isAfter(validateAndParse(x), validateAndParse(y));
export const isBefore = (x: DateIso, y: DateIso) =>
  DateFns.isBefore(validateAndParse(x), validateAndParse(y));

// TODO: Fix this
export const today = (): DateIso => toIsoDate(new Date("2021-10-31"));

export const thisYear = (): string => getYearFromIsoDate(toIsoDate(new Date()));
export const lastYear = (): string =>
  getYearFromIsoDate(addYears(toIsoDate(new Date()), -1));
export const getPreviousYear = (x: DateIso) =>
  toIsoDate(getYearFromIsoDate(addYears(x, -1)));
export const toDate = (x: Date | string): Date =>
  isString(x) ? DateFns.parseISO(x) : x;
export const toIsoDate = (x: Date | string): DateIso =>
  DateFns.format(toDate(x), "yyyy-MM-dd") as DateIso;
export const isValid = (x: Date | string): boolean =>
  DateFns.isValid(toDate(x));
export const toShortDayDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "E M-d-yyyy");
export const toSlashyDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MM/dd/yyyy");
export const toLongDay = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "EEEE");
export const toMonth = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MMMM");
export const toYear = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "yyyy");
export const toShortMonth = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MMM");
export const toMonthAndDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MMMM d");
export const toDayOfWeek = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "eee");
export const toMonthAndYear = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MMMM, yyyy");
export const toShortMonthAndDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "MMM d");
export const formatLongForm = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "E, MMMM d, yyyy");
export const formatLongDayAndMonth = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "EEEE, MMMM d");
export const formatShortDayAndLongMonth = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "E, MMMM d");
export const formatLongDayMonthYear = (x: DateIso): string =>
  DateFns.format(validateAndParse(toIsoDate(x)), "dddd, LLLL d, yyyy");
export const formatLongMonthDayYear = (x: DateIso): string =>
  DateFns.format(validateAndParse(toIsoDate(x)), "LLLL d, yyyy");
export const formatLongMonth = (x: DateIso): string =>
  DateFns.format(validateAndParse(toIsoDate(x)), "LLLL");
export const formatLongMonthYear = (x: DateIso): string =>
  DateFns.format(validateAndParse(toIsoDate(x)), "LLLL, yyyy");
export const getMonthAndYearFromIsoDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "yyyy-MM");
export const getYearFromIsoDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "yyyy");
export const getMonthFromIsoDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "M");
export const getDayFromIsoDate = (x: DateIso): string =>
  DateFns.format(validateAndParse(x), "d");
export const get0BasedMonthFromIsoDate = (x: DateIso): number =>
  DateFns.getMonth(validateAndParse(x));

export function eachDay(
  startDate: DateIso,
  endDate: DateIso,
  order?: "asc" | "desc",
) {
  const start = validateAndParse(startDate);
  const end = validateAndParse(endDate);

  return order && order === "asc"
    ? reverse(DateFns.eachDayOfInterval({ start, end }).map(toIsoDate))
    : DateFns.eachDayOfInterval({ start, end }).map(toIsoDate);
}

export function isInDateRange(
  dateToCheck: DateIso,
  dateRange: { start: DateIso; end: DateIso },
): boolean {
  return dateToCheck >= dateRange.start && dateToCheck <= dateRange.end;
}

export function areEqual(_today: DateIso, date: DateIso): boolean {
  return DateFns.isEqual(validateAndParse(_today), validateAndParse(date));
}

export function isTomorrow(_today: DateIso, date: DateIso): boolean {
  const _tomorrow = DateFns.addDays(validateAndParse(_today), 1);
  return DateFns.isSameDay(_tomorrow, validateAndParse(date));
}

/**
 * Sunday is 0, Saturday is 6
 */
export function getWeekDayFromIsoDate(date: DateIso): number {
  return DateFns.getDay(validateAndParse(date));
}

export function isWeekend(date: DateIso): boolean {
  return DateFns.isWeekend(validateAndParse(date));
}

export function getMonthDayFromIsoDate(date: DateIso): number {
  return DateFns.getDate(validateAndParse(date));
}

export function getMonthAndDayFromIsoDate(date: DateIso): string {
  return DateFns.format(validateAndParse(date), "MMM d");
}

export function distanceInWords(a: DateIso, b: DateIso): string {
  return DateFns.formatDistance(validateAndParse(a), validateAndParse(b));
}

export function addMonths(date: DateIso, numMonths: number): DateIso {
  return toIsoDate(DateFns.addMonths(validateAndParse(date), numMonths));
}

export function addYears(date: DateIso, numYears: number): DateIso {
  return toIsoDate(DateFns.addYears(validateAndParse(date), numYears));
}

export function addDays(date: DateIso, numDays: number): DateIso {
  return toIsoDate(DateFns.addDays(validateAndParse(date), numDays));
}

export function getDateTense(date: DateIso, currentDate: DateIso): DateTense {
  if (date === currentDate) {
    return "today";
  } else if (date.localeCompare(currentDate) > 0) {
    return "future";
  }
  return "past";
}

export function dateIso(
  literals: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...placeholders: never[]
) {
  if (literals.length !== 1) {
    throw new Error("One parameter only, please.");
  }
  const date = literals[0];
  if (!VALID_REGEX.test(date)) {
    throw new Error(`Invalid IsoDate ${date}`);
  }
  return date as DateIso;
}

export const descendingYearMonthAscendingDateComparator = (
  _a: DateIso,
  _b: DateIso,
) => {
  const a = validateAndParse(_a);
  const b = validateAndParse(_b);
  return (
    DateFns.getYear(b) - DateFns.getYear(a) ||
    DateFns.getMonth(b) - DateFns.getMonth(a) ||
    DateFns.getDate(a) - DateFns.getDate(b)
  );
};

export const toDateIso = (x: Date | string): DateIso => {
  if (typeof x === "string") {
    const d = x.substr(0, 10);
    if (isValid(d)) {
      return d as shame as DateIso;
    }
  } else {
    const d = x.toISOString().substr(0, 10);

    if (isValid(d)) {
      return d as shame as DateIso;
    }
  }

  throw new Error(`Cannot convert ${x} to DateIso!`);
};

type DateGroup = {
  groupIndex: number;
  type: "Week" | "Month" | "Year";
  start: DateIso;
  end: DateIso;
};

export const getYearlyWeekGroups = (dateRange: {
  start: DateIso;
  end: DateIso;
}): DateGroup[] => {
  const weekDay = getWeekDayFromIsoDate(getFirstDayOfYear(dateRange.start));

  const startYear = Number.parseInt(getYearFromIsoDate(dateRange.start));
  const startMonth = get0BasedMonthFromIsoDate(dateRange.start);
  const startDate = DateFns.addDays(
    new Date(startYear, startMonth, 1),
    -weekDay,
  );

  const endYear = Number.parseInt(getYearFromIsoDate(dateRange.end));
  const endMonth = get0BasedMonthFromIsoDate(dateRange.end);
  const endDate = new Date(endYear, endMonth, 1);

  const last = DateFns.lastDayOfMonth(endDate);

  return _.compact(
    _.range(0, 52).map((weekNumber) => {
      const start = DateFns.addWeeks(startDate, weekNumber);
      const end = DateFns.addDays(
        DateFns.addWeeks(startDate, weekNumber + 1),
        -1,
      );

      if (DateFns.isAfter(start, last)) {
        return undefined;
      }

      return {
        groupIndex: weekNumber + 1,
        type: "Week" as const,
        start: toIsoDate(start),
        end: DateFns.isAfter(end, last) ? toIsoDate(last) : toIsoDate(end),
      };
    }),
  );
};

export const getWeekGroups = (dateRange: { start: DateIso; end: DateIso }) => {
  const year = Number.parseInt(getYearFromIsoDate(dateRange.start));
  const month = get0BasedMonthFromIsoDate(dateRange.start);
  const date = new Date(year, month, 1);

  const weekCount = DateFns.getWeeksInMonth(date);

  const last = DateFns.lastDayOfMonth(date);

  return _.compact(
    _.range(0, weekCount).map((weekNumber) => {
      const start = DateFns.addWeeks(date, weekNumber);
      const end = DateFns.addDays(DateFns.addWeeks(date, weekNumber + 1), -1);

      if (DateFns.isAfter(start, last)) {
        return undefined;
      }

      return {
        groupIndex: weekNumber + 1,
        type: "Week" as const,
        start: toIsoDate(start),
        end: DateFns.isAfter(end, last) ? toIsoDate(last) : toIsoDate(end),
      };
    }),
  );
};

export const getFirstDayOfMonth = (date: DateIso) =>
  toIsoDate(`${date.substr(0, 7)}-01`);
export const getLastDayOfMonth = (date: DateIso) => {
  const daysInMonth = DateFns.getDaysInMonth(validateAndParse(date));

  return toIsoDate(`${date.substr(0, 7)}-${daysInMonth}`);
};

export const getFirstDayOfYear = (date: DateIso) =>
  toIsoDate(`${date.substr(0, 4)}-01-01`);
export const getLastDayOfYear = (date: DateIso) =>
  toIsoDate(`${date.substr(0, 4)}-12-31`);

export const getMonthGroups = (dateRange: {
  start: DateIso;
  end: DateIso;
}): DateGroup[] => {
  const firstDayOfFirstMonth = getFirstDayOfMonth(dateRange.start);

  const startMonth = get0BasedMonthFromIsoDate(dateRange.start);
  const endMonth = get0BasedMonthFromIsoDate(dateRange.end);

  const monthCount = endMonth - startMonth + 1;

  return _.compact(
    _.range(0, monthCount).map((monthNumber) => {
      const start = addMonths(firstDayOfFirstMonth, monthNumber);
      const end = lastDayOfMonth(start);

      return {
        groupIndex: monthNumber + 1,
        type: "Month" as const,
        start: start,
        end: toIsoDate(end),
      };
    }),
  );
};

export const getYearGroups = (dateRange: {
  start: DateIso;
  end: DateIso;
}): DateGroup[] => {
  const startYear = Number.parseInt(getYearFromIsoDate(dateRange.start));
  const endYear = Number.parseInt(getYearFromIsoDate(dateRange.end));

  const yearCount = endYear - startYear + 1;

  return _.compact(
    _.range(0, yearCount).map((yearNumber) => {
      const start = `${startYear + yearNumber}-01-01`;
      const end = `${startYear + yearNumber}-12-31`;

      return {
        groupIndex: yearNumber + 1,
        type: "Year" as const,
        start: toIsoDate(start),
        end: toIsoDate(end),
      };
    }),
  );
};

export function getPreviousDateRange(dateRange: {
  start: DateIso;
  end: DateIso;
}) {
  const dayDifference = differenceInDays(
    toIsoDate(dateRange.end),
    toIsoDate(dateRange.start),
  );

  const start = addDays(toIsoDate(dateRange.start), -dayDifference);

  const end = addDays(toIsoDate(dateRange.start), -1);
  return { start, end };
}
