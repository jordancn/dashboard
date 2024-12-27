import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { MonogramIcon } from "@/Atoms/MonogramIcon";
import { Subheadline } from "@/Atoms/Subheadline";
import { Base64Url } from "@/GraphQL/Base64Url";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import Image from "next/image";
import styles from "./TransactionCard.module.css";

export const TransactionCard = ({
  id,
  date,
  vendorName,
  categoryName,
  amount,
  relativePosition,
  pending,
  image,
  entityId,
}: {
  id: string;
  date: DateIso;
  vendorName: string | undefined;
  categoryName: string | undefined;
  amount: number;
  relativePosition: "start" | "middle" | "end" | "single";
  pending: boolean;
  image?: Base64Url;
  entityId?: string;
}) => {
  return (
    <Card
      href={`/entity/${entityId}/insights/transaction/${id}`}
      withSeparators
    >
      <CardTitle />
      <CardContents
        position={relativePosition}
        variant={
          pending || categoryName === "Transfer" ? "translucent" : undefined
        }
      >
        <div className={styles.transactionCard}>
          <div className={styles.imageContainer}>
            {image && (
              <Image
                alt={vendorName || ""}
                className={styles.image}
                src={`data:image/png;base64,${image}`}
                width={45}
                height={45}
              />
            )}
            {!image && <MonogramIcon name={vendorName || ""} />}
          </div>
          <div className={styles.vendorAndDate}>
            <div className={styles.vendor}>
              <Subheadline weight="Bold" title={vendorName || ""} />
            </div>
            <div>
              <div className={styles.date}>
                {pending && <Caption1 title="Pending" ordinal="Secondary" />}
                {!pending && (
                  <Caption1 title={formatDate(date)} ordinal="Secondary" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.amountAndCategory}>
            <div>{formatCurrency.format(amount)}</div>
            <div>
              <Caption1
                title={categoryName || ""}
                ordinal="Secondary"
                alignment="Right"
              />
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
