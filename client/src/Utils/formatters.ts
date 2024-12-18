import { DateRange } from "@/GraphQL/client.gen";
import {
  format,
  formatDistance,
  isToday,
  isTomorrow,
  isYesterday,
  parse,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  DateIso,
  differenceInDays,
  getFirstDayOfMonth,
  lastDayOfMonth,
  toMonth,
  toShortMonthAndDate,
  toYear,
} from "./date-iso";

const usdFormater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

const weightNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  minimumIntegerDigits: 3,
});

const ShouldCensor = false;

const censorCurrency = (value: number) => {
  const formatted = usdFormater.format(value);
  const digits = usdFormater.format(value).replace("$", "").replace(/,/g, "");
  const length = digits.length - 3;

  if (ShouldCensor) {
    return usdFormater.format(Math.random() * Math.pow(10, length - 1));
  }

  return formatted;
};

export const formatCurrency = {
  format: (v: number | null | undefined): string => {
    if (v === null || v === undefined) {
      return "";
    }

    return censorCurrency(v);
  },
  formatK: (v: number | null | undefined): string => {
    if (v === null || v === undefined) {
      return "";
    }

    return `${censorCurrency(v / 1000)}k`;
  },
};

const censorNumber = (
  value: number,
  formatter: Intl.NumberFormat = numberFormatter,
) => {
  const formatted = formatter.format(value);
  const digits = formatter.format(value).replace(/,/g, "");
  const length = digits.length - 3;

  if (ShouldCensor) {
    return formatter.format(Math.random() * Math.pow(10, length - 1));
  }

  return formatted;
};

export const formatNumber = {
  format: (v: number): string => {
    return censorNumber(v);
  },
  formatPercent: (v: number): string => {
    return `${censorNumber(v * 100)}%`;
  },
  formatPercentInt: (
    v: number | undefined | null,
    options: { withSign: boolean } = { withSign: true },
  ): string => {
    if (v === undefined || v === null) {
      return "";
    }

    const formatted = `${censorNumber(v * 100)}%`.replace(/\.[0-9]+/, "");

    if (options?.withSign) {
      return formatted;
    }

    return formatted.replace(/^\-/, "");
  },
  formatWeight: (v: number): string => {
    return censorNumber(v, weightNumberFormatter);
  },
};

export const getTimeDistance = (timestamp: string) => {
  const timeZone = "America/Detroit";
  const zonedDate = utcToZonedTime(timestamp, timeZone);

  const distance = formatDistance(zonedDate, new Date(), { addSuffix: true });

  if (distance.match(/less than a minute/)) {
    return "just now";
  }

  return distance
    .replace("about ", "")
    .replace(" ago", "")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" minutes", "m")
    .replace(" minute", "m");
};

export const formatDate = (date: DateIso) => {
  const [yearString, month, day] = date.substring(0, 10).split("-");

  const year = Number.parseInt(yearString);

  const formatted = `${month}/${day}/${year < 2000 ? 1900 + year : year}`;

  if (isToday(new Date(formatted))) {
    return "Today";
  }

  if (isYesterday(new Date(formatted))) {
    return "Yesterday";
  }

  if (isTomorrow(new Date(formatted))) {
    return "Tomorrow";
  }

  return formatted;
};

export const formatDateMonthDay = (date: string) => {
  const [yearString, month, day] = date.substring(0, 10).split("-");

  const year = Number.parseInt(yearString);

  const formatted = `${month}/${day}/${year < 2000 ? 1900 + year : year}`;

  if (isToday(new Date(formatted))) {
    return "Today";
  }

  if (isYesterday(new Date(formatted))) {
    return "Yesterday";
  }

  if (isTomorrow(new Date(formatted))) {
    return "Tomorrow";
  }

  return format(parse(formatted, "MM/dd/yyyy", new Date()), "MMM d");
};

export const formatMonth = (date: string) => {
  const [yearString, month] = date.substring(0, 10).split("-");

  const year = Number.parseInt(yearString);

  const firstOfMonth = `${month}/01/${year < 2000 ? 1900 + year : year}`;

  const d = new Date(firstOfMonth);

  const formatted = format(d, "MMMM");

  return formatted;
};

export const getNamedDateRange = (dateRange: DateRange) => {
  const firstDoM = getFirstDayOfMonth(dateRange.start);
  const lastDoM = lastDayOfMonth(dateRange.start);

  const isYear = differenceInDays(dateRange.end, dateRange.start) >= 364;

  // console.log('dateRange', dateRange);
  // console.log('isYear', isYear);
  // console.log('differenceInDays(dateRange.end, dateRange.start)', differenceInDays(dateRange.end, dateRange.start));

  const isMonth = firstDoM === dateRange.start && lastDoM === dateRange.end;

  const isWeek = differenceInDays(dateRange.end, dateRange.start) === 6;

  if (isYear) {
    return toYear(dateRange.end);
  }

  if (isMonth) {
    return toMonth(firstDoM);
  }

  if (isWeek) {
    return `${toShortMonthAndDate(dateRange.start)} – ${toShortMonthAndDate(dateRange.end)}`;
  }

  return `${toShortMonthAndDate(dateRange.start)} – ${toShortMonthAndDate(dateRange.end)}`;
};
