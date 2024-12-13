import { DateIso } from "@/utils/date-iso";

export type Pagination = {
  limit: number;
  offset: number;
};

export type DateRange = {
  start: DateIso;
  end: DateIso;
};
