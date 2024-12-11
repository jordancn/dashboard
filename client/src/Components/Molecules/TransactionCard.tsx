import { Base64Url } from "@/app/Base64Url";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { generateColor } from "@marko19907/string-to-color";
import { Caption1 } from "../Atoms/Caption1";
import { Chevron } from "../Atoms/Chevron";
import { Card } from "./Card";
import { CardContents } from "./CardContents";
import { CardTitle } from "./CardTitle";
import styles from "./TransactionCard.module.css";

export const TransactionCard = (props: {
  id: string;
  date: any;
  vendorName: string | undefined;
  categoryName: string | undefined;
  amount: number;
  relativePosition: "start" | "middle" | "end" | "single";
  pending: boolean;
  onClick?: () => void;
  image?: Base64Url;
}) => {
  return (
    <Card size="single" onClick={props.onClick}>
      <CardTitle />
      <CardContents
        position={props.relativePosition}
        variant={
          props.pending || props.categoryName === "Transfer"
            ? "translucent"
            : undefined
        }
      >
        <div className={styles.transactionCard}>
          <div className={styles.imageContainer}>
            {props.image && (
              <img
                alt={props.vendorName || ""}
                className={styles.image}
                src={`data:image/png;base64,${props.image}`}
              />
            )}
            {!props.image && (
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
                    fill={generateColor(props.vendorName || "")}
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
                      {props.vendorName?.substring(0, 1).toUpperCase()}
                    </tspan>
                  </text>
                </g>
              </svg>
            )}
          </div>
          <div className={styles.additionalContainer}>
            <div className={styles.vendorContainer}>
              <Caption1
                weight="Bold"
                title={(props.vendorName || "")
                  .replace("ACH CREDIT ", "")
                  .replace("ACH HOLD ", "")}
              />
            </div>
            <div>
              <div className={styles.secondaryContainer}>
                {props.pending && (
                  <Caption1 title="Pending" color="Secondary" />
                )}
                {!props.pending && (
                  <Caption1 title={formatDate(props.date)} color="Secondary" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.amount}>
            <div>{formatCurrency.format(props.amount)}</div>
            <div>
              <Caption1 title={props.categoryName || ""} color="Secondary" />
            </div>
          </div>
          <div className={styles.chevronContainer}>
            <Chevron />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
