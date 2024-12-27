"use client";

import { useError } from "@/Providers/ErrorStateProvider";
import { ServerParseError } from "@apollo/client/link/http";
import { ServerError } from "@apollo/client/link/utils";
import { GraphQLFormattedError } from "graphql";
import _ from "lodash";
import React, { ReactNode } from "react";
import styles from "./Error.module.css";

function isGraphQLFormattedError(
  error: unknown,
): error is GraphQLFormattedError {
  if (error === undefined) {
    return false;
  }

  if (error === null) {
    return false;
  }

  if (typeof error !== "object") {
    return false;
  }

  if (!("message" in error)) {
    return false;
  }

  if (typeof error.message !== "string") {
    return false;
  }

  if (!("locations" in error)) {
    return false;
  }

  if (!Array.isArray(error.locations)) {
    return false;
  }

  if (!("path" in error)) {
    return false;
  }

  if (!Array.isArray(error.path)) {
    return false;
  }

  if (!("extensions" in error)) {
    return false;
  }

  if (typeof error.extensions !== "object") {
    return false;
  }

  return true;
}

function isError(error: unknown): error is Error {
  if (error === undefined) {
    return false;
  }

  if (error === null) {
    return false;
  }

  if (typeof error !== "object") {
    return false;
  }

  if (!("cause" in error)) {
    return false;
  }

  return true;
}

function isServerParseError(error: unknown): error is ServerParseError {
  if (!isError(error)) {
    return false;
  }

  if (error === undefined) {
    return false;
  }

  if (error === null) {
    return false;
  }

  if (typeof error !== "object") {
    return false;
  }

  if (!("response" in error)) {
    return false;
  }

  if (!("statusCode" in error)) {
    return false;
  }

  if (typeof error.statusCode !== "number") {
    return false;
  }

  if (!("bodyText" in error)) {
    return false;
  }

  if (typeof error.bodyText !== "string") {
    return false;
  }

  return true;
}

function isServerError(error: unknown): error is ServerError {
  if (error === undefined) {
    return false;
  }

  if (error === null) {
    return false;
  }

  if (!isError(error)) {
    return false;
  }

  if (typeof error !== "object") {
    return false;
  }

  if (!("response" in error)) {
    return false;
  }

  if (!("statusCode" in error)) {
    return false;
  }

  if (typeof error.statusCode !== "number") {
    return false;
  }

  if (!("result" in error)) {
    return false;
  }

  if (typeof error.result !== "object") {
    return false;
  }

  return true;
}

export const Error = ({ children }: { children?: ReactNode }) => {
  const error = useError();

  const formattedErrors = React.useMemo(
    () =>
      _.compact(
        error?.map((error) => {
          if (isGraphQLFormattedError(error)) {
            return error.message;
          }

          if (isServerParseError(error)) {
            return error.bodyText;
          }

          if (isServerError(error)) {
            return JSON.stringify(error.result);
          }

          if (isError(error)) {
            return error.message;
          }

          if (error === null) {
            return null;
          }

          return error;
        }) ?? [],
      ),
    [error],
  );

  if (!error) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          {formattedErrors.map((formattedError, index) => (
            <div key={index}>{formattedError}</div>
          ))}
        </div>
      </div>
      {children}
    </>
  );
};
