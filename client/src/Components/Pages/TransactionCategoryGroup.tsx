/* eslint-disable react-hooks/rules-of-hooks */

/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useTransactionCategoryGroupOverallQuery, useTransactionCategoryGroupQuery } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { CardTitle } from 'Molecules/CardTitle';
import { NavigationBar } from 'Molecules/NavigationBar';
import { SectionHeading } from 'Molecules/SectionHeading';
import { TransactionCards } from 'Organisms/TransactionCards';
import { useActivityGroup } from 'Providers/AppStateProvider';
import { ContentScrollable } from 'Templates/Content';
import { toDateIso } from 'Utils/date-iso';
import { formatCurrency, getNamedDateRange } from 'Utils/formatters';
import { getActivityGroupBy, useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { Headline, Caption1 } from 'design-system';

export const TransactionCategoryGroup: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string | 'overall'; start: string; end: string; categoryId: string }>();
  const navigate = useNavigate();

  const activityGroup = useActivityGroup();

  const results =
    params.entityId === 'overview'
      ? useTransactionCategoryGroupOverallQuery({
          variables: {
            dateRange: {
              start: params.start, // getFirstDayOfYear(isoStringToIsoDate(params.start)),
              end: params.end,
            },
            categoryId: params.categoryId,
            groupBy: getActivityGroupBy(activityGroup),
          },
        })
      : useTransactionCategoryGroupQuery({
          variables: {
            entityId: params.entityId,
            dateRange: {
              start: params.start, // getFirstDayOfYear(isoStringToIsoDate(params.start)),
              end: params.end,
            },
            categoryId: params.categoryId,
            groupBy: getActivityGroupBy(activityGroup),
          },
        });

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

  // const transactions = React.useMemo(() => {
  //   if (results.loading) {
  //     return [];
  //   }

  //   return (results.data?.entity?.category?.transactions || []).map((transaction) => ({
  //     id: transaction.id,
  //     date: transaction.date,
  //     vendorName: transaction.vendor?.name || transaction.description,
  //     categoryName: transaction.category?.name,
  //     amount: transaction.amount,
  //   }));
  // }, [results]);

  const category = React.useMemo(() => {
    if (!results.data) {
      return;
    }

    if ('entity' in results.data) {
      return results.data.entity?.category;
    }

    if ('category' in results.data) {
      return results.data.category;
    }
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
        <SectionHeading title={category?.name || ''} />
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
          <Card size='single'>
            <CardTitle />
            <CardContents>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  align-items: center;
                  justify-content: space-between;
                  gap: 10px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    flex: 2;
                  `}
                >
                  <div
                    css={css`
                      height: 20px;
                      overflow-y: hidden;
                    `}
                  >
                    <Headline title={getNamedDateRange({ start: toDateIso(params.start), end: toDateIso(params.end) })} />
                  </div>
                  {/* <div>
                    <Subheadline title={formatDate(props.date)} variant='secondary' />
                  </div> */}
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                  `}
                >
                  <div>{formatCurrency.format(category?.total || 0)}</div>
                  <div>
                    <Caption1 title={`${category?.count || 0} transactions`} color='Secondary' />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
        </div>

        {/* <SectionHeading title={formatLongMonthYear(isoStringToIsoDate(params.start))} /> */}

        {_.orderBy(category?.transactionGroups || [], (transactionGroup) => transactionGroup.start, 'desc').map((transactionGroup) => {
          if (transactionGroup.transactions.length === 0) {
            return null;
          }

          return (
            <div>
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
                <Card size='single'>
                  <CardTitle />
                  <CardContents variant='transparent'>
                    <div
                      css={css`
                        display: flex;
                        width: 100%;
                        align-items: center;
                        justify-content: space-between;
                        gap: 10px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          flex: 2;
                        `}
                      >
                        <div
                          css={css`
                            height: 20px;
                            overflow-y: hidden;
                          `}
                        >
                          <Headline title={getNamedDateRange({ start: transactionGroup.start, end: transactionGroup.end })} />
                        </div>
                      </div>
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          align-items: flex-end;
                        `}
                      >
                        <div>{formatCurrency.format(transactionGroup.total || 0)}</div>
                        <div>
                          <Caption1 title={`${transactionGroup.count || 0} transactions`} color='Secondary' />
                        </div>
                      </div>
                    </div>
                  </CardContents>
                </Card>
              </div>

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
                <TransactionCards
                  transactions={transactionGroup.transactions.map((transaction) => {
                    return {
                      amount: transaction.amount,
                      categoryName: transaction.category?.name || '',
                      date: transaction.date,
                      id: transaction.id,
                      vendorName: transaction.vendor?.name || transaction.description,
                      pending: transaction.pending,
                    };
                  })}
                  entityId={params.entityId}
                />
              </div>
            </div>
          );
        })}

        {/* <TransactionAmount title={formatCurrency.format(category?.total || 0)} /> */}
      </ContentScrollable>
    </Empty>
  );
};
