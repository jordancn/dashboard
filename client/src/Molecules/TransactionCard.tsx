import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { MonogramIcon } from "@/Atoms/MonogramIcon";
import { Base64Url } from "@/GraphQL/Base64Url";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import Image from "next/image";
import styles from "./TransactionCard.module.css";

export const TransactionCard = (props: {
  id: string;
  date: DateIso;
  vendorName: string | undefined;
  categoryName: string | undefined;
  amount: number;
  relativePosition: "start" | "middle" | "end" | "single";
  pending: boolean;
  onClick?: () => void;
  image?: Base64Url;
  entityId?: string;
}) => {
  return (
    <Card
      size="single"
      href={`/entity/${props.entityId}/insights/transaction/${props.id}`}
    >
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
              <Image
                alt={props.vendorName || ""}
                className={styles.image}
                src={`data:image/png;base64,${props.image}`}
                width={45}
                height={45}
              />
            )}
            {!props.image && <MonogramIcon name={props.vendorName || ""} />}
          </div>
          <div className={styles.additionalContainer}>
            <div className={styles.vendorContainer}>
              <Caption1 weight="Bold" title={props.vendorName || ""} />
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
