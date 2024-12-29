import { NavigationCircleLeft } from "@/Atoms/NavigationCircleLeft";
import { NavigationCircleRight } from "@/Atoms/NavigationCircleRight";
import { Title1 } from "@/Atoms/Title1";
import { Activity } from "@/Organisms/Activity";
import {
  useActivityGroup,
  useSetGroupIndex,
} from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import { getActivityGroupName, getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import styles from "./ActivityContainer.module.css";

export const ActivityContainer = ({
  index,
  start,
  end,
}: {
  index: number;
  start: DateIso;
  end: DateIso;
}) => {
  const activityGroup = useActivityGroup();
  const setGroupIndex = useSetGroupIndex();

  const title = getActivityGroupName({
    activityGroup,
    start,
    end,
  });

  const goBack = useCallback(() => {
    setGroupIndex(index - 1);
  }, [index, setGroupIndex]);

  const goForward = useCallback(() => {
    if (index === 0) {
      return;
    }

    setGroupIndex(index + 1);
  }, [index, setGroupIndex]);

  const isForwardDisabled = useMemo(() => {
    return index === 0;
  }, [index]);

  return (
    <div
      className={classNames(styles.activityContainer, {
        ...getWidthClassName("full"),
      })}
    >
      <div className={styles.titleContainer}>
        <div onClick={goBack}>
          <NavigationCircleLeft />
        </div>
        <Title1 weight="Bold" title={title} />
        <div onClick={goForward}>
          <NavigationCircleRight disabled={isForwardDisabled} />
        </div>
      </div>

      <Activity start={start} end={end} />
    </div>
  );
};
