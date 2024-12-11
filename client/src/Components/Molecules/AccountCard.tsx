import { Caption1 } from "@/Components/Atoms/Caption1";
import { Chevron } from "@/Components/Atoms/Chevron";
import { Headline } from "@/Components/Atoms/Headline";
import { Card } from "@/Components/Molecules/Card";
import { CardContents } from "@/Components/Molecules/CardContents";
import { CardTitle } from "@/Components/Molecules/CardTitle";
import { formatCurrency } from "@/Utils/formatters";
import { useRouteParams } from "@/Utils/helpers";
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
  onClick?: () => void;
}) => {
  const params = useRouteParams<{ entityId?: string }>();

  const icon: string | undefined = undefined;

  return (
    <Card size="single" onClick={props.onClick}>
      <CardTitle />
      <CardContents position={props.relativePosition}>
        <div className={styles.container}>
          <div className={styles.icon}>
            {icon && <img alt={props.name} src={icon} />}
            {!icon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 90 90"
              >
                <g id="Group_81" data-name="Group 81">
                  <rect
                    id="Rectangle_251"
                    data-name="Rectangle 251"
                    width="90"
                    height="90"
                    rx="10"
                    fill="#6a6a6a"
                  />
                  <text
                    id="W"
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    fill="#f5f5f5"
                    font-size="62"
                    font-family='"SF Pro Text", "SF Pro Display", -apple-system, system-ui,
BlinkMacSystemFont;'
                    font-weight="500"
                  >
                    <tspan y="69">
                      {props.name.substring(0, 1).toUpperCase()}
                    </tspan>
                  </text>
                </g>
              </svg>
            )}
          </div>
          <div className={styles.nameTypeContainer}>
            <div className={styles.name}>
              <Headline title={props.name} />
            </div>
            <div>
              <div className={styles.accountType}>
                {params.entityId === "overview" && (
                  <Caption1
                    title={`${props.entity.name} ${props.accountType}`}
                    color="Secondary"
                  />
                )}
                {params.entityId !== "overview" && (
                  <Caption1 title={props.accountType} color="Secondary" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.balanceContainer}>
            <div>{formatCurrency.format(props.currentBalance)}</div>
            <div>
              <Caption1 title={`· · · · ${props.number}`} color="Secondary" />
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
