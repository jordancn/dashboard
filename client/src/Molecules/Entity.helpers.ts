export const shouldUseOverviewQuery = (entityId: string | undefined) => {
  if (!entityId) {
    return true;
  }

  if (entityId === "overview") {
    return true;
  }

  return false;
};

export const shouldSkipOverviewQuery = (entityId: string | undefined) => {
  return !shouldUseOverviewQuery(entityId);
};

export const shouldSkipEntityQuery = (entityId: string | undefined) => {
  return shouldUseOverviewQuery(entityId);
};
