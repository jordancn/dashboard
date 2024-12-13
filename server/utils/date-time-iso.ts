import { Brand } from "@/types/core";
import * as DateIso from "@/utils/date-iso";
import * as TimeIso from "@/utils/time-iso";
import * as DateFns from "date-fns";
import * as DateFnsTz from "date-fns-tz";

export type DateTimeIso = Brand<string, "ISO8601DateTime">;
export type Timezone = Brand<string, "IANA_TIMEZONES">;

// not a perfect regex but probably good enough for our needs.
// Ex.: '2020-06-15T16:18:20Z', or '…T16:18:20.123+03:00'
export const VALID_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}(\.\d{3})?([+-]|Z)(([01]\d|2[0-3]):([0-5]\d))?$/;

const FORMATTED_DATE = "yyyy-MM-dd HH:mm:ss.SSS";

export function validateAndParse(dateTime: DateTimeIso): Date {
  if (process.env.NODE_ENV !== "production" && !VALID_REGEX.test(dateTime)) {
    throw new Error(`Invalid IsoDateTime ${dateTime}`);
  }

  return DateFns.parseISO(dateTime);
}

// todo make these accept Type
export function dateFromTimestamp(timestamp: string): DateIso.DateIso {
  return DateIso.toIsoDate(new Date(Date.parse(timestamp)));
}
export function timeFromTimestamp(timestamp: string): TimeIso.TimeIso {
  return TimeIso.fromDate(new Date(Date.parse(timestamp)));
}
export function addMilliseconds(
  dateTime: DateTimeIso,
  millisecondsToAdd: number
): DateTimeIso {
  return toIsoDateTime(
    DateFns.addMilliseconds(validateAndParse(dateTime), millisecondsToAdd)
  );
}

export function addHours(
  dateTime: DateTimeIso,
  hoursToAdd: number
): DateTimeIso {
  return toIsoDateTime(
    DateFns.addHours(validateAndParse(dateTime), hoursToAdd)
  );
}

export function addDays(dateTime: DateTimeIso, daysToAdd: number): DateTimeIso {
  return toIsoDateTime(DateFns.addDays(validateAndParse(dateTime), daysToAdd));
}

export function addYears(
  dateTime: DateTimeIso,
  yearsToAdd: number
): DateTimeIso {
  return toIsoDateTime(
    DateFns.addYears(validateAndParse(dateTime), yearsToAdd)
  );
}

export function toIsoDateTime(dateTime: Date | string): DateTimeIso {
  if (typeof dateTime === "string" && !/([+-]\d{2})|([Z]$)/.test(dateTime)) {
    // should end in :DD or Z
    console.warn(`☢️ You called toIsoDateTime with a date string that will be interpreted as local time. This value will be converted to UTC.
    You _probably_ didn’t mean to do this.
    If you’re writing a test that involves dates, e.g. "2012-01-01", you probably want to use "2012-01-01Z or "2012:01-01:{UTC OFFSET}"
    If you’re writing a test that involves times, e.g. "2012-01-01T12-59-59", you probably want to use "2012-01-01T12:59:59Z" or "2012-01-01T12:59:59:{UTC OFFSET}"`);
  }
  dateTime =
    typeof dateTime === "string" ? DateFns.parseISO(dateTime) : dateTime;
  // return in utc
  return dateTime.toISOString() as DateTimeIso;
}

export function toUTC(dateTime: DateTimeIso): DateTimeIso {
  return validateAndParse(dateTime).toISOString() as DateTimeIso;
}

export function toLocalTime(arg: DateTimeIso): DateTimeIso {
  return DateFns.format(validateAndParse(arg), FORMATTED_DATE) as DateTimeIso;
}

export function getMostRecentDate(
  d1: DateTimeIso,
  d2: DateTimeIso
): DateTimeIso {
  return DateFns.compareDesc(validateAndParse(d1), validateAndParse(d2)) === 1
    ? d2
    : d1;
}

export function isDateInThePast(arg: DateTimeIso): boolean {
  const currentDateTime = now();
  return getMostRecentDate(currentDateTime, arg) === currentDateTime;
}

export function utcToZonedTimeDate(
  dateTime: DateTimeIso,
  timeZone: string
): Date {
  return DateFnsTz.utcToZonedTime(dateTime, timeZone);
}

export function utcToZonedTime(
  dateTime: DateTimeIso,
  timeZone: string
): DateTimeIso {
  return toIsoDateTime(DateFnsTz.utcToZonedTime(dateTime, timeZone));
}

export function toLocalTimeIso(dateTime: DateTimeIso): TimeIso.TimeIso {
  return DateFns.format(
    validateAndParse(dateTime),
    "HH:mm:ss"
  ) as TimeIso.TimeIso;
}

export function toTimeZone(
  dateTime: DateTimeIso,
  timeZone: Timezone
): TimeIso.TimeIso {
  return DateFnsTz.format(
    DateFnsTz.utcToZonedTime(dateTime, timeZone),
    FORMATTED_DATE,
    { timeZone }
  );
}

export const toTimeZoneAbbreviation = (
  x: DateTimeIso,
  timeZone: string
): string => DateFnsTz.format(validateAndParse(x), "z", { timeZone });

export const toSlashyDate = (x: DateTimeIso): string =>
  DateFns.format(validateAndParse(x), "MM/dd/yyyy");

export const toSlashyDateAndTime = (x: DateTimeIso): string =>
  DateFns.format(validateAndParse(x), "MM/dd/yyyy hh:mm a");

export const toLongLocalizedTime = (x: DateTimeIso): string =>
  DateFns.format(validateAndParse(x), "p");

export const toLongLocalizedTimeWithSeconds = (x: DateTimeIso): string =>
  DateFns.format(validateAndParse(x), "pp");

export const toSlashyDateAndTimeWithTimezone = (
  x: DateTimeIso,
  timezone: string
): string => {
  const adjustedTime = utcToZonedTime(x, timezone as Timezone);
  return `${toSlashyDate(adjustedTime)}, ${toLongLocalizedTime(
    adjustedTime
  )} ${toTimeZoneAbbreviation(adjustedTime, timezone as Timezone)}`;
};

export const toSlashyDateAndTimeWithTimezoneWithSeconds = (
  x: DateTimeIso,
  timezone: string
): string => {
  const adjustedTime = utcToZonedTime(x, timezone as Timezone);
  return `${toSlashyDate(adjustedTime)}, ${toLongLocalizedTimeWithSeconds(
    adjustedTime
  )} ${toTimeZoneAbbreviation(adjustedTime, timezone as Timezone)}`;
};

export const now = (): DateTimeIso => toIsoDateTime(new Date());

export function dateTimeIso(
  literals: TemplateStringsArray,
  ...placeholders: never[]
) {
  if (literals.length !== 1) {
    throw new Error("One parameter only, please.");
  }
  const dateTime = literals[0];
  if (!VALID_REGEX.test(dateTime)) {
    throw new Error(`Invalid IsoDateTime ${dateTime}`);
  }
  return dateTime as DateTimeIso;
}

export function startOfDay(time: DateTimeIso): DateTimeIso {
  return toIsoDateTime(DateFns.startOfDay(validateAndParse(time)));
}

export function startOfTomorrow(): Date {
  return DateFns.startOfTomorrow();
}

export function startOfTomorrowInTimezone(timeZone?: Timezone): Date {
  const tomorrow = DateFns.startOfTomorrow();

  if (timeZone) {
    return DateFnsTz.zonedTimeToUtc(tomorrow, timeZone);
  }
  return tomorrow;
}

export const createIntervals = (
  start: DateTimeIso,
  end: DateTimeIso,
  intervalInDays: number
): { start: DateTimeIso; end: DateTimeIso }[] => {
  const intervalInHours = intervalInDays * 24;
  let current = start;
  const intervals: { start: DateTimeIso; end: DateTimeIso }[] = [];

  while (true) {
    const next = addHours(current, intervalInHours);
    if (next >= end) {
      break;
    }
    intervals.push({ start: current, end: next });
    current = next;
  }

  intervals.push({ start: current, end });
  return intervals;
};
