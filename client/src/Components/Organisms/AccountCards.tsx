import { getRelativePosition, useRelativeSize } from "@/Utils/helpers";
import _ from "lodash";
import { useCallback, useMemo } from "react";
import { Empty } from "../Atoms/Empty";
import { AccountCard } from "../Molecules/AccountCard";
import { SectionHeading } from "../Molecules/SectionHeading";
import styles from "./AccountCards.module.css";

export const AccountCards = (props: {
  accounts: Array<{
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
  }>;
  entityId?: string;
}) => {
  const size = useRelativeSize("single");

  // const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = useCallback((accountId: string) => {
    // navigate(`/entity/${props.entityId || 'overview'}/insights/transaction/${transactionId}`);
  }, []);

  const accountGroups = useMemo(() => {
    return _.groupBy(props.accounts, (account) => account.institution.name);
  }, [props.accounts]);

  return (
    <div style={{ width: `${size}px` }} className={styles.accountCards}>
      {/* TODO memoize */}
      {Object.keys(accountGroups).map((institutionName) => {
        const accounts = accountGroups[institutionName];

        return (
          <Empty key={institutionName}>
            <SectionHeading title={institutionName} />

            <div style={{ width: `${size}px` }} className={styles.section}>
              {_.orderBy(
                accounts,
                (account) => account.currentBalance,
                "desc",
              ).map((account, index) => {
                return (
                  <AccountCard
                    relativePosition={getRelativePosition(index, accounts)}
                    key={account.id}
                    name={account.name}
                    institution={account.institution}
                    currentBalance={account.currentBalance}
                    id={account.id}
                    onClick={() => onClick(account.id)}
                    number={account.number}
                    accountType={account.accountType}
                    entity={account.entity}
                  />
                );
              })}
            </div>
          </Empty>
        );
      })}
    </div>
  );
};
