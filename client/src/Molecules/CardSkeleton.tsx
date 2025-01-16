import { Spinner } from "@/Atoms/Spinner";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import styles from "./CardSkeleton.module.css";

export const CardSkeleton = ({
  size,
}: {
  size?: "full" | "half" | "quarter";
}) => {
  return (
    <Card size={size}>
      <CardContents>
        <div className={styles.placeholder}>
          <Spinner size="small" />
        </div>
      </CardContents>
    </Card>
  );
};
