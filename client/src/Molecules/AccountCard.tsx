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

export const AccountCard = (props: {
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
    <Card size="full" href={props.href}>
      <CardTitle />
      <CardContents position={props.relativePosition}>
        <div className={styles.container}>
          <div className={styles.icon}>
            {icon && <Image alt={props.name} src={icon} />}
            {!icon && <MonogramIcon name={props.name} />}
          </div>
          <div className={styles.nameTypeContainer}>
            <div className={styles.name}>
              <Headline title={props.name} weight="Bold" />
            </div>
            <div>
              <div className={styles.accountType}>
                {params?.entityId === "overview" && (
                  <Caption1
                    title={`${props.entity.name} ${props.accountType}`}
                    ordinal="Secondary"
                  />
                )}
                {params?.entityId !== "overview" && (
                  <Caption1 title={props.accountType} ordinal="Secondary" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.balanceContainer}>
            <div className={styles.balance}>
              {formatCurrency.format(props.currentBalance)}
            </div>
            <div>
              <Caption1 title={`· · · · ${props.number}`} ordinal="Secondary" />
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
