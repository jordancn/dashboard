import { useSidebarContentsQuery } from "@/app/client.gen";
import _ from "lodash";
import { Empty } from "../Atoms/Empty";
import { Spinner } from "../Atoms/Spinner";
import { ToolbarItem } from "../Molecules/ToolbarItem";
import { shame } from "@/types/core";

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

export const entitiesSortOrder = {
  Personal: 1,
  Active: 2,
  Passive: 3,
  Retirement: 4,
};

export const ToolbarContents = () => {
  const results = useSidebarContentsQuery();

  if (results.loading) {
    return <Spinner />;
  }

  return (
    <Empty>
      <ToolbarItem
        title="Overview"
        entityId="overview"
        icon="globe-americas"
        path={`/overview`}
        base="/overview"
      />
      {_.orderBy(
        (results.data?.entities || []).filter(
          (entity) => (icons as shame)[entity.name],
        ),
        (entity) => (entitiesSortOrder as shame)[entity.name],
      ).map((entity) => {
        return (
          <ToolbarItem
            entityId={entity.id}
            key={entity.id}
            title={(names as shame)[entity.name]}
            icon={(icons as shame)[entity.name]}
            path={`/entity/${entity.id}/insights`}
            base={`/entity/${entity.id}`}
          />
        );
      })}
      {/* <ToolbarItem title='Test' icon='radiation' path='/test/Month' /> */}
    </Empty>
  );
};
