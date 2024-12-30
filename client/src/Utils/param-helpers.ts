import { assertIsDateIso, DateIso } from "@/Utils/date-iso";
import assert from "assert";
import { useParams } from "next/navigation";

export function hasEntityId(
  params: unknown,
): asserts params is { entityId: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("entityId" in params, "entityId is required");
  assert(typeof params.entityId === "string", "entityId is not a string");
}

export function hasCategoryId(
  params: unknown,
): asserts params is { categoryId: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("categoryId" in params, "categoryId is required");
  assert(typeof params.categoryId === "string", "categoryId is not a string");
}

export function hasGroupType(
  params: unknown,
): asserts params is { groupType: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("groupType" in params, "groupType is required");
  assert(typeof params.groupType === "string", "groupType is not a string");
}

export function hasStart(
  params: unknown,
): asserts params is { start: DateIso } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("start" in params, "start is required");
  assert(typeof params.start === "string", "start is not a string");
  assertIsDateIso(params.start);
}

export function hasEnd(params: unknown): asserts params is { end: DateIso } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("end" in params, "end is required");
  assert(typeof params.end === "string", "end is not a string");
  assertIsDateIso(params.end);
}

export function hasTransactionId(
  params: unknown,
): asserts params is { transactionId: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("transactionId" in params, "transactionId is required");
  assert(
    typeof params.transactionId === "string",
    "transactionId is not a string",
  );
}

type AssertionFn<T> = (params: unknown) => asserts params is T;
type AssertedTypes<A extends Array<AssertionFn<unknown>>> =
  A[number] extends AssertionFn<infer U> ? U : never;
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
type AssertionsToIntersection<A extends Array<AssertionFn<unknown>>> =
  UnionToIntersection<AssertedTypes<A>>;

export function useRouteParams<A extends Array<AssertionFn<unknown>>>(
  defaultParams: Partial<AssertionsToIntersection<A>>,
  ...assertionFns: A
): AssertionsToIntersection<A> {
  const params = useParams();

  assert(defaultParams, "defaultParams is required");
  assert(typeof defaultParams === "object", "defaultParams is not an object");

  const actualParams: unknown = { ...defaultParams, ...params };

  assertionFns.forEach((fn) => fn(actualParams));

  return actualParams as AssertionsToIntersection<A>;
}
