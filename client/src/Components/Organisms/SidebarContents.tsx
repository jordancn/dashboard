import { useSidebarContentsQuery } from "@/app/client.gen";
import { shame } from "@/types/core";
import _ from "lodash";
import { Empty } from "../Atoms/Empty";
import { SidebarTitle } from "../Atoms/SidebarTitle";
import { Spinner } from "../Atoms/Spinner";
import { SidebarListItem } from "../Molecules/SidebarListItem";

const icons = {
  Personal: "user",
  Active: "search-dollar",
  Passive: "home",
  Retirement: "bullseye",
};

const names = {
  Personal: "Personal",
  Active: "Solutions",
  Passive: "Properties",
  Retirement: "Retirement",
};

const sort = {
  Personal: 1,
  Active: 2,
  Passive: 3,
  Retirement: 4,
};

export const SidebarContents = () => {
  const results = useSidebarContentsQuery();

  if (results.loading) {
    return <Spinner />;
  }

  return (
    <Empty>
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
    </Empty>
  );
};
