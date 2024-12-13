import { Empty } from "@/Atoms/Empty";
import { AccountCard } from "@/Molecules/AccountCard";
import { SectionHeading } from "@/Molecules/SectionHeading";
import {
  getRelativePosition,
  getWidthClassName,
  useSize,
} from "@/Utils/helpers";
import classNames from "classnames";
import _ from "lodash";
import { useMemo } from "react";
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
  const size = useSize("single");

  const accountGroups = useMemo(() => {
    return _.groupBy(props.accounts, (account) => account.institution.name);
  }, [props.accounts]);

  return (
    <div
      className={classNames(styles.accountCards, {
        ...getWidthClassName(size),
      })}
    >
      {/* TODO memoize */}
      {Object.keys(accountGroups).map((institutionName) => {
        const accounts = accountGroups[institutionName];

        return (
          <Empty key={institutionName}>
            <SectionHeading title={institutionName} />

            <div
              className={classNames(styles.section, {
                ...getWidthClassName(size),
              })}
            >
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
                    href={`/entity/${props.entityId || "overview"}/insights/account/${account.id}`}
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
