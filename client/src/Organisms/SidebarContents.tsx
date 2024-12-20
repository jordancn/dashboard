import { SidebarTitle } from "@/Atoms/SidebarTitle";
import { Spinner } from "@/Atoms/Spinner";
import { useSidebarContentsQuery } from "@/GraphQL/client.gen";
import { SidebarListItem } from "@/Molecules/SidebarListItem";
import { shame } from "@/Types/core";
import _ from "lodash";

const icons = {
  Personal: "user",
  Retirement: "bullseye",
};

const names = {
  Personal: "Personal",
  Retirement: "Retirement",
};

const sort = {
  Personal: 1,
  Retirement: 2,
};

export const SidebarContents = () => {
  const results = useSidebarContentsQuery();

  if (results.loading) {
    return <Spinner />;
  }

  return (
    <>
      <SidebarTitle title="Finances" />
      <SidebarListItem
        entityId="overview"
        title="Overview"
        icon="globe-americas"
        path="/overview"
      />

      {_.orderBy(
        (results.data?.entities || []).filter(
          (entity) => (icons as shame)[entity.name],
        ),
        (entity) => (sort as shame)[entity.name],
      ).map((entity) => {
        return (
          <SidebarListItem
            key={entity.id}
            entityId={entity.id}
            title={(names as shame)[entity.name]}
            icon={(icons as shame)[entity.name]}
            path={`/entity/${entity.id}/insights`}
          />
        );
      })}

      <SidebarListItem
        entityId="review"
        title="Review"
        icon="tasks"
        path="/review/2022-06-01/2022-06-30"
      />
    </>
  );
};
