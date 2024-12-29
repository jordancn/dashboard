"use client";

import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { Selector } from "@/Molecules/Selector";
import { ActivitySlideRenderer } from "@/Organisms/SlideableActivity";
import {
  useActivityGroup,
  useGroupIndex,
  useSetActivityGroup,
  useSetGroupIndex,
} from "@/Providers/AppStateProvider";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { hasEntityId, useRouteParams } from "@/Utils/param-helpers";
import { useRouter } from "next/navigation";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard, virtualize } from "react-swipeable-views-utils";
import styles from "./page.module.css";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const ActivityPage = () => {
  const { entityId } = useRouteParams({ entityId: "overview" }, hasEntityId);

  const activityGroup = useActivityGroup();
  const setActivityGroup = useSetActivityGroup();
  const groupIndex = useGroupIndex();
  const setGroupIndex = useSetGroupIndex();
  const router = useRouter();

  const options = React.useMemo(() => {
    return [
      {
        label: "Week",
        onClick: () => {
          setActivityGroup("Week");
          setGroupIndex(0);

          router.push(`/entity/${entityId || "overview"}/activity/Week`);
        },
      },
      {
        label: "Month",
        onClick: () => {
          setActivityGroup("Month");
          setGroupIndex(0);

          router.push(`/entity/${entityId || "overview"}/activity/Month`);
        },
      },
      {
        label: "Year",
        onClick: () => {
          setActivityGroup("Year");
          setGroupIndex(0);

          router.push(`/entity/${entityId || "overview"}/activity/Year`);
        },
      },
    ];
  }, [setActivityGroup, setGroupIndex, router, entityId]);

  const onBackClicked = React.useCallback(() => {
    router.push(`/entity/${entityId || "overview"}`);
  }, [router, entityId]);

  const previousScreenTitle = usePreviousScreenTitle();

  return (
    <>
      <NavigationBar>
        <div
          className={styles.navigationBarBackButtonContainer}
          onClick={onBackClicked}
        >
          <div>
            <NavigationChevronLeft />
          </div>
          <div className={styles.navigationBarTitle}>{previousScreenTitle}</div>
        </div>

        <div className={styles.selectorContainer}>
          <Selector options={options} selectedOptionLabel={activityGroup} />
        </div>
      </NavigationBar>
      <ContentScrollable
        type="wrap-cards"
        fullHeight
        fullWidth
        hasNavigationBar
      >
        <VirtualizeSwipeableViews
          style={styles.root}
          slideStyle={styles.slide}
          overscanSlideBefore={1}
          overscanSlideAfter={1}
          index={groupIndex}
          onChangeIndex={setGroupIndex}
          slideRenderer={ActivitySlideRenderer}
        />
      </ContentScrollable>
    </>
  );
};

export default ActivityPage;
