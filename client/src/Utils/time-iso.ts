import * as DateFns from "date-fns";
import { Flavor } from "./core";

// todo: refactor and resolve these:
// (this file's type was meant to represent time-of-day, but in practice sometimes holds (new Date()).toString()s in it.)
export type TimeIso = Flavor<string, "ISO8601Time">;
// export type Type = Flavor<string, "Time of day (HH:MM:SS)">;
export const VALID_REGEX = /^\d{2}:\d{2}:\d{2}$/;

export type TimeSet = {
  startTime: TimeIso;
  endTime: TimeIso;
};
export const isValid = (t: unknown): t is TimeIso =>
  typeof t === "string" && VALID_REGEX.test(t);

export function getDuration(timeSet: TimeSet): number {
  return DateFns.differenceInMinutes(
    parse(timeSet.endTime),
    parse(timeSet.startTime),
  );
}
export type DurationMinutes = Flavor<number, "Duration in minutes">;

export function toHoursMinutes(input: TimeIso): string {
  return DateFns.format(parse(input), "h:mma");
}

export function toHoursAmPm(input: TimeIso): string {
  return DateFns.format(parse(input), "ha");
}
export function toHours(input: TimeIso): string {
  return DateFns.format(parse(input), "h");
}
export function toMinutes(input: TimeIso): string {
  return DateFns.format(parse(input), "mm");
}
export function parse(input: TimeIso): Date {
  return DateFns.parseISO(`2000-01-01T${input}`);
}
export function from(
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
): TimeIso {
  return fromDate(new Date(2000, 1, 1, hours, minutes, seconds));
}

export function fromDate(date: Date): TimeIso {
  return DateFns.format(date, "HH:mm:ss") as TimeIso;
}

export function timeIso(
  literals: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...placeholders: never[]
) {
  if (literals.length !== 1) {
    throw new Error("One parameter only, please.");
  }
  const time = literals[0];
  if (!VALID_REGEX.test(time)) {
    throw new Error(`Invalid IsoTime ${time}`);
  }
  return time as TimeIso;
}
