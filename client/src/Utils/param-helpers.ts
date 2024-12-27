import { assertIsDateIso, DateIso } from "@/Utils/date-iso";
import assert from "assert";

export function assertIsEntityParams(
  params: unknown,
): asserts params is { entityId: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("entityId" in params, "entityId is required");
  assert(typeof params.entityId === "string", "entityId is not a string");
}

export function assertIsTransactionParams(
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

export function assertIsIsEntityAndTransactionParams(
  params: unknown,
): asserts params is { entityId: string; transactionId: string } {
  assertIsEntityParams(params);
  assertIsTransactionParams(params);
}

export function assertIsTransactionGroupParams(
  params: unknown,
): asserts params is { entityId: string; start: string; end: string } {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("entityId" in params, "entityId is required");
  assert(typeof params.entityId === "string", "entityId is not a string");
  assert("start" in params, "start is required");
  assert(typeof params.start === "string", "start is not a string");
  assert("end" in params, "end is required");
  assert(typeof params.end === "string", "end is not a string");
}

export function assertIsTransactionCategoryGroupParams(
  params: unknown,
): asserts params is {
  entityId: string;
  categoryId: string;
  start: DateIso;
  end: DateIso;
} {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("entityId" in params, "entityId is required");
  assert(typeof params.entityId === "string", "entityId is not a string");
  assert("categoryId" in params, "categoryId is required");
  assert(typeof params.categoryId === "string", "categoryId is not a string");
  assert("start" in params, "start is required");
  assert(typeof params.start === "string", "start is not a string");
  assertIsDateIso(params.start);
  assert("end" in params, "end is required");
  assert(typeof params.end === "string", "end is not a string");
  assertIsDateIso(params.end);
}

export function assertIsActivityParams(params: unknown): asserts params is {
  entityId: string;
  groupType: string;
  start: DateIso | undefined;
  end: DateIso | undefined;
} {
  assert(params, "params is required");
  assert(typeof params === "object", "params is not an object");
  assert("entityId" in params, "entityId is required");
  assert(typeof params.entityId === "string", "entityId is not a string");
  assert("groupType" in params, "groupType is required");
  assert(typeof params.groupType === "string", "groupType is not a string");

  if ("start" in params) {
    assert(typeof params.start === "string", "start is not a string");
    assertIsDateIso(params.start);
  }

  if ("end" in params) {
    assert(typeof params.end === "string", "end is not a string");
    assertIsDateIso(params.end);
  }
}
