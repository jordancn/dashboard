"use client";

import { NavigationChevron } from "@/Atoms/NavigationChevron";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { Selector } from "@/Molecules/Selector";
import { ActivitySlideRenderer } from "@/Organisms/SlideableActivity";
import {
  useActivityGroup,
  useGroupIndex,
  useSetActivityGroup,
  useSetGroupIndex,
} from "@/Providers/AppStateProvider";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { useRouteParams } from "@/Utils/helpers";
import { assertIsActivityParams } from "@/Utils/param-helpers";
import { useRouter } from "next/navigation";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard, virtualize } from "react-swipeable-views-utils";
import styles from "./page.module.css";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const ActivityPage = () => {
  const params = useRouteParams(assertIsActivityParams);
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

          router.push(`/entity/${params.entityId || "overview"}/activity/Week`);
        },
      },
      {
        label: "Month",
        onClick: () => {
          setActivityGroup("Month");
          setGroupIndex(0);

          router.push(
            `/entity/${params.entityId || "overview"}/activity/Month`,
          );
        },
      },
      {
        label: "Year",
        onClick: () => {
          setActivityGroup("Year");
          setGroupIndex(0);

          router.push(`/entity/${params.entityId || "overview"}/activity/Year`);
        },
      },
    ];
  }, [setActivityGroup, setGroupIndex, router, params.entityId]);

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <NavigationBar>
        <div
          className={styles.navigationBarBackButtonContainer}
          onClick={onBackClicked}
        >
          <div>
            <NavigationChevron />
          </div>
          <div className={styles.navigationBarTitle}>
            <>Back</>
          </div>
        </div>

        <div className={styles.selectorContainer}>
          <Selector
            size="half"
            options={options}
            selectedOptionLabel={activityGroup}
          />
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
