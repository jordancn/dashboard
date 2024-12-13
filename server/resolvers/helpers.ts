import { Scope } from "@/scope";
import { Id } from "@/types/core";
import { DateRange } from "@/types/interface";
import { parseToDate, toIsoDate } from "@/utils/date-iso";
import * as _ from "lodash";

export const asId = (idObj: { id: Id }) => {
  return idObj.id;
};

export const asIds = <TObj extends { id: Id }>(idObjs: TObj[]) => {
  return idObjs.map((obj) => obj.id);
};

export const scopeKey = (scope: Scope, extra?: string) => {
  const prefix = `${_.orderBy(Object.keys(scope))
    .filter((key) => !!(scope as any)[key])
    .map((key) => `${key}("${JSON.stringify((scope as any)[key])}")`)
    .join(".")}`;

  return `${prefix}${extra ? `${prefix ? "." : ""}${extra}` : ""}`;
};

export type Parent = { scope: Scope };

export const narrowScope = (
  existingScope: Scope,
  newScope: Scope = {}
): Scope => {
  return {
    ...existingScope,
    ...newScope,
  };
};

export function withScope<TObj extends { id: Id | null | undefined }>(
  value: TObj,
  scope: Scope,
  id: (id: Id) => Scope
): { id: NonNullable<TObj["id"]>; scope: Scope } | null;

export function withScope<TObj extends { id: Id | null | undefined }>(
  values: TObj[],
  scope: Scope,
  id: (value: TObj) => Scope
): Array<{ id: TObj["id"]; scope: Scope }>;

export function withScope<TObj extends { id: Id | null | undefined }>(
  values: TObj | TObj[],
  scope: Scope,
  id: (value: TObj | Id) => Scope
) {
  if (Array.isArray(values)) {
    return values.map((value) => ({
      ...value,
      scope: { ...scope, ...id(value) },
    }));
  }

  if (!values.id) {
    return null;
  }

  return {
    ...values,
    scope: { ...scope, ...id(values.id) },
  };
}

export const whereDateRange = (dateRange: DateRange | undefined) => {
  if (dateRange?.start && dateRange?.end) {
    return {
      AND: [
        { date: { gte: parseToDate(toIsoDate(dateRange.start)) } },
        { date: { lte: parseToDate(toIsoDate(dateRange.end)) } },
      ],
    };
  }

  if (dateRange?.start) {
    return { date: { gte: parseToDate(toIsoDate(dateRange.start)) } };
  }

  if (dateRange?.end) {
    return { date: { lte: parseToDate(toIsoDate(dateRange.end)) } };
  }

  return {};
};
