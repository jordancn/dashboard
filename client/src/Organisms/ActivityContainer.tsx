import { Title1 } from "@/Atoms/Title1";
import { Activity } from "@/Organisms/Activity";
import { ActivityGroup, useActivityGroup } from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import { getActivityGroupName, getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import styles from "./ActivityContainer.module.css";

export const ActivityContainer = (props: {
  index: number;
  type: ActivityGroup;
  start: DateIso;
  end: DateIso;
}) => {
  const activityGroup = useActivityGroup();

  const title = getActivityGroupName({
    activityGroup: props.type,
    start: props.start,
    end: props.end,
  });

  return (
    <div
      className={classNames(styles.activityContainer, {
        ...getWidthClassName("full"),
      })}
    >
      <div className={styles.titleContainer}>
        <Title1 weight="Bold" title={title} />
      </div>

      <Activity
        end={props.end}
        index={props.index}
        start={props.start}
        type={activityGroup}
      />
    </div>
  );
};
