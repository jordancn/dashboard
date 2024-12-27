import { Caption1 } from "@/Atoms/Caption1";
import { Headline } from "@/Atoms/Headline";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { formatCurrency } from "@/Utils/formatters";
import styles from "./ActivityHeading.module.css";

export const ActivityHeading = ({
  title,
  value,
  count,
}: {
  title: string;
  value: number;
  count: number;
}) => {
  return (
    <Card>
      <CardTitle />
      <CardContents variant="transparent">
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.title}>
              <Headline weight="Bold" title={title} />
            </div>
          </div>
          <div className={styles.valueAndCount}>
            <div>{formatCurrency.format(value || 0)}</div>
            <div>
              <Caption1
                title={`${count || 0} transactions`}
                ordinal="Secondary"
              />
            </div>
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
