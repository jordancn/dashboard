export const required = <T>(value: T | null | undefined): T => {
  if (value === null || value === undefined) {
    throw new Error("Value must be defined");
  }

  return value;
};

export const optional = <T>(value: T | null | undefined): T | undefined => {
  if (value === null) {
    return undefined;
  }

  return value;
};
