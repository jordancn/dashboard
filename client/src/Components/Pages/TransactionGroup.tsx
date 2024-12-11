/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useTransactionGroupOverviewQuery, useTransactionGroupQuery } from 'GraphQL/client.gen';
import { NavigationBar } from 'Molecules/NavigationBar';
import { SectionHeading } from 'Molecules/SectionHeading';
import { TransactionCards } from 'Organisms/TransactionCards';
import { ContentScrollable } from 'Templates/Content';
import { formatLongMonthYear, toDateIso } from 'Utils/date-iso';
import { useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as React from 'react';
import { useNavigate } from 'react-router';

export const TransactionGroup: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string; start: string; end: string }>();
  const navigate = useNavigate();

  const results =
    params.entityId && params.entityId !== 'overview'
      ? useTransactionGroupQuery({
          variables: {
            entityId: params.entityId,
            transactionsDateRange: {
              start: params.start,
              end: params.end,
            },
          },
        })
      : useTransactionGroupOverviewQuery({
          variables: {
            transactionsDateRange: {
              start: params.start,
              end: params.end,
            },
          },
        });

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

  const transactions = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    if (!results.data) {
      return [];
    }

    const t = 'entity' in results.data ? results.data.entity?.transactions : 'transactions' in results.data ? results.data.transactions : [];

    return (t || []).map((transaction) => ({
      id: transaction.id,
      date: transaction.date,
      vendorName: transaction.vendor?.name || transaction.description,
      categoryName: transaction.category?.name,
      amount: transaction.amount,
      pending: transaction.pending,
      image: transaction.vendor?.image || undefined,
    }));
  }, [results]);

  if (results.loading) {
    return (
      <Empty>
        <NavigationBar></NavigationBar>
        <ContentScrollable type='wrap-cards'>
          <Spinner />
        </ContentScrollable>
      </Empty>
    );
  }

  return (
    <Empty>
      <NavigationBar>
        <div
          css={css`
            display: flex;
            width: 100%;
            align-items: center;
            height: 44px;
          `}
        >
          <div
            css={css`
              margin-left: 5px;
              display: flex;
              align-items: center;
              height: 44px;
              z-index: 100;
              cursor: pointer;
            `}
            onClick={onBackClicked}
          >
            <div>
              <NavigationChevron />
            </div>
            <div
              css={css`
                font-size: 17px;
                color: #007aff;
                font: ${FONT};
                margin-top: -4px;
                margin-left: 10px;
              `}
            >
              Insights
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type='wrap-cards'>
        <SectionHeading title={formatLongMonthYear(toDateIso(params.start))} />

        <div
          css={css`
            width: ${size}px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
          `}
        >
          <TransactionCards transactions={transactions} entityId={params.entityId} />
        </div>
      </ContentScrollable>
    </Empty>
  );
};
