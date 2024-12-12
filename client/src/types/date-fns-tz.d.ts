declare module "date-fns-tz" {
  export function utcToZonedTime(
    date: Date | number | string,
    timeZone: string,
  ): Date;
  export function zonedTimeToUtc(
    date: Date | number | string,
    timeZone: string,
  ): Date;
  export function format(
    date: Date | number,
    format: string,
    options?: { timeZone?: string },
  ): string;
}
