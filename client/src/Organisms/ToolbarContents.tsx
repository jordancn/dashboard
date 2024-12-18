import { Spinner } from "@/Atoms/Spinner";
import { useSidebarContentsQuery } from "@/GraphQL/client.gen";
import { ToolbarItem } from "@/Molecules/ToolbarItem";
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

export const entitiesSortOrder = {
  Personal: 1,
  Retirement: 2,
};

export const ToolbarContents = () => {
  const results = useSidebarContentsQuery();

  if (results.loading) {
    return <Spinner />;
  }

  return (
    <>
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
    </>
  );
};
