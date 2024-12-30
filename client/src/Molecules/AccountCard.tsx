import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { Headline } from "@/Atoms/Headline";
import { MonogramIcon } from "@/Atoms/MonogramIcon";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { formatCurrency } from "@/Utils/formatters";
import { hasEntityId, useRouteParams } from "@/Utils/param-helpers";
import Image from "next/image";
import styles from "./AccountCard.module.css";

export const AccountCard = ({
  name,
  currentBalance,
  entity,
  number,
  accountType,
  relativePosition,
  href,
}: {
  name: string;
  currentBalance: number;
  entity: {
    id: string;
    name: string;
  };
  number: string;
  accountType: string;
  relativePosition: "start" | "middle" | "end" | "single";
  href?: string;
}) => {
  const { entityId } = useRouteParams({ entityId: "overview" }, hasEntityId);

  const icon: string | undefined = undefined;

  return (
    <Card href={href}>
      <CardTitle />
      <CardContents position={relativePosition}>
        <div className={styles.container}>
          <div className={styles.icon}>
            {icon && <Image alt={name} src={icon} />}
            {!icon && <MonogramIcon name={name} />}
          </div>
          <div className={styles.nameTypeContainer}>
            <div className={styles.name}>
              <Headline title={name} weight="Bold" />
            </div>
            <div>
              <div className={styles.accountType}>
                {entityId === "overview" && (
                  <Caption1
                    title={`${entity.name} ${accountType}`}
                    ordinal="Secondary"
                  />
                )}
                {entityId !== "overview" && (
                  <Caption1 title={accountType} ordinal="Secondary" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.balanceContainer}>
            <div className={styles.balance}>
              {formatCurrency.format(currentBalance)}
            </div>
            <div>
              <Caption1 title={`· · · · ${number}`} ordinal="Secondary" />
            </div>
          </div>
          <div className={styles.chevron}>
            <Chevron />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
