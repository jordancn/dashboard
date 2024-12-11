import styles from "./SectionHeading.module.css";
import { Headline } from "../Atoms/Headline";
import { useRelativeSize } from "@/Utils/helpers";
import { Label } from "../Atoms/Label";

export const SectionHeading = (props: {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) => {
  const size = useRelativeSize("single");

  return (
    <div className={styles.sectionHeading} style={{ width: `${size}px` }}>
      <Headline title={props.title} />
      {props.subtitle && (
        <Label title={props.subtitle} onClick={props.onClick} />
      )}
    </div>
  );
};
