/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { Monospace } from 'Atoms/Monospace';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useTransactionsReviewQuery } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { NavigationBar } from 'Molecules/NavigationBar';
import { SectionHeading } from 'Molecules/SectionHeading';
import { ContentScrollable } from 'Templates/Content';
import { toDateIso } from 'Utils/date-iso';
import { formatCurrency, formatDate, getNamedDateRange } from 'Utils/formatters';
import { relativePosition, useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router';
import stc from 'string-to-color';
import { Subheadline, Title1 } from 'design-system';

export const TransactionsReview: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string; start: string; end: string }>();
  const navigate = useNavigate();

  const results = useTransactionsReviewQuery({
    variables: {
      dateRange: {
        start: params.start,
        end: params.end,
      },
    },
  });

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

  const vendors = React.useMemo(() => {
    return _.orderBy(results.data?.vendors || [], (v) => v.name.toLowerCase());
  }, [results]);

  const categories = React.useMemo(() => {
    return _.orderBy(results.data?.categories || [], (v) => v.name.toLowerCase());
  }, [results]);

  const transactions = React.useMemo(() => {
    return _.orderBy(
      results.data?.transactions || [],
      [
        (t) =>
          t.description
            .toUpperCase()
            .replace(/^[0-9 ]+/, '')
            .replace(/[AEIOUYaeiouy]/g, ''),
        (t) => Math.abs(t.amount),
      ],
      ['asc', 'desc'],
    );
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
      <ContentScrollable type='wrap-cards' fullWidth>
        <Title1 title='Transaction Review' />
        <SectionHeading title={getNamedDateRange({ start: toDateIso(params.start), end: toDateIso(params.end) })} />

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
          {/* TODO memoize */}
          {transactions.map((transaction, index) => {
            return (
              <Card size='double'>
                <CardContents position={relativePosition(index, results.data?.transactions || [])}>
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                      gap: 10px;
                      flex-direction: row;

                      overflow-x: scroll;
                      overflow-y: hidden;

                      & > div {
                        /* border: 1px solid red; */
                      }
                    `}
                  >
                    <div
                      css={css`
                        width: 45px;
                        height: 45px;
                      `}
                    >
                      {transaction.vendor?.image && (
                        <img
                          alt={transaction.vendor?.name || ''}
                          css={css`
                            width: 45px;
                            height: 45px;
                          `}
                          src={`data:image/png;base64,${transaction.vendor?.image}`}
                        />
                      )}
                      {!transaction.vendor?.image && (
                        <svg xmlns='http://www.w3.org/2000/svg' width='45' height='45' viewBox='0 0 90 90'>
                          <g id='Group_81' data-name='Group 81'>
                            <rect id='Rectangle_251' data-name='Rectangle 251' width='90' height='90' rx='10' fill={stc(transaction.vendor?.name || '')} />
                            <text
                              id='W'
                              x='50%'
                              y='50%'
                              text-anchor='middle'
                              fill='#f5f5f5'
                              font-size='62'
                              font-family='"SF Pro Text", "SF Pro Display", -apple-system, system-ui,
BlinkMacSystemFont;'
                              font-weight='500'
                            >
                              <tspan y='69'>{transaction.vendor?.name.substring(0, 1).toUpperCase()}</tspan>
                            </text>
                          </g>
                        </svg>
                      )}
                    </div>

                    <div
                      css={css`
                        width: 120px;
                        min-width: 120px;
                        max-width: 120px;
                      `}
                    >
                      {formatDate(transaction.date)}
                    </div>

                    <div
                      css={css`
                        width: 300px;
                      `}
                    >
                      <Subheadline title={transaction.account.entity.name} />
                    </div>

                    <div
                      css={css`
                        width: 600px;
                      `}
                    >
                      <Subheadline title={transaction.account.name} />
                    </div>

                    <div
                      css={css`
                        width: 70px;
                      `}
                    >
                      <Subheadline title={transaction.account.number} />
                    </div>

                    <div
                      css={css`
                        width: 500px;
                        text-overflow: clip;
                        /* border: 1px solid red; */
                      `}
                    >
                      <Monospace title={transaction.description} />
                    </div>

                    <div
                      css={css`
                        width: 120px;
                        min-width: 120px;
                        max-width: 120px;
                        text-align: right;
                      `}
                    >
                      {formatCurrency.format(transaction.amount)}
                    </div>

                    {/* <div>{transaction.pending}</div> */}
                    <div>
                      <select
                        css={css`
                          border: none;
                          font: ${FONT};
                          font-size: 15px;
                          outline: none;
                          padding: 0;
                          margin: 0;
                          color: inherit;
                          background-color: transparent;
                        `}
                      >
                        {vendors.map((vendor) => {
                          return (
                            <option id={vendor.id} selected={transaction.vendor?.id === vendor.id}>
                              {vendor.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <select
                        css={css`
                          border: none;
                          font: ${FONT};
                          font-size: 15px;
                          outline: none;
                          padding: 0;
                          margin: 0;
                          color: inherit;
                          background-color: transparent;
                        `}
                      >
                        {categories.map((category) => {
                          return (
                            <option id={category.id} selected={transaction.category?.categoryId === category.categoryId}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </CardContents>
              </Card>
            );
          })}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
