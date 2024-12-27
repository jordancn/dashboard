import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { Headline } from "@/Atoms/Headline";
import { MonogramIcon } from "@/Atoms/MonogramIcon";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { formatCurrency } from "@/Utils/formatters";
import { useRouteParams } from "@/Utils/helpers";
import { assertIsEntityParams } from "@/Utils/param-helpers";
import Image from "next/image";
import styles from "./AccountCard.module.css";

export const AccountCard = ({
  id,
  name,
  currentBalance,
  institution,
  entity,
  number,
  accountType,
  relativePosition,
  href,
}: {
  id: string;
  name: string;
  currentBalance: number;
  institution: {
    id: string;
    name: string;
  };
  entity: {
    id: string;
    name: string;
  };
  number: string;
  accountType: string;
  relativePosition: "start" | "middle" | "end" | "single";
  href?: string;
}) => {
  const params = useRouteParams(assertIsEntityParams);

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
                {params?.entityId === "overview" && (
                  <Caption1
                    title={`${entity.name} ${accountType}`}
                    ordinal="Secondary"
                  />
                )}
                {params?.entityId !== "overview" && (
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
