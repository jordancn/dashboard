/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { CategoryType, useTransactionCategoryQuery } from 'GraphQL/client.gen';
import { CardTitle } from 'Molecules/CardTitle';
import { NavigationBar } from 'Molecules/NavigationBar';
import { ContentScrollable } from 'Templates/Content';
import { today } from 'Utils/date-iso';
import { useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { TransactionCategoryCard } from './TransactionCategoryCard';
import { TransactionNewCategoryCard } from './TransactionNewCategoryCard';

export const TransactionCategory: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string; transactionId: string }>();

  const search = useLocation().search;
  const description = new URLSearchParams(search).get('description');

  const navigate = useNavigate();

  const results = useTransactionCategoryQuery({
    variables: {
      transactionId: params.transactionId,
      dateRange: { start: today(), end: today() },
    },
  });

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

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

  const transaction = results.data?.transaction;

  if (!transaction) {
    return null;
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
              Transaction
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type='wrap-cards'>
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
          <TransactionCategoryCard position='start' isChecked={!transaction.category} transaction={transaction} />
          <TransactionNewCategoryCard position='end' placeholder={description || ''} transaction={transaction} />
        </div>

        <CardTitle title='Income' />
        <div
          css={css`
            width: ${size}px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;
          `}
        >
          {_.orderBy(results.data?.categories || [], (category) => category.name)
            .filter((category) => category.categoryType === CategoryType.Income)
            .map((category, index, thing) => {
              return (
                <TransactionCategoryCard
                  category={category}
                  isChecked={category.id === transaction.category?.id}
                  transaction={transaction}
                  key={category.id}
                  position={index === 0 ? 'start' : index + 1 === thing.length ? 'end' : 'middle'}
                />
              );
            })}
        </div>

        <CardTitle title='Expense' />
        <div
          css={css`
            width: ${size}px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;
          `}
        >
          {_.orderBy(results.data?.categories || [], (category) => category.name)
            .filter((category) => category.categoryType === CategoryType.Expense)
            .map((category, index, thing) => {
              return (
                <TransactionCategoryCard
                  category={category}
                  isChecked={category.id === transaction.category?.id}
                  transaction={transaction}
                  key={category.id}
                  position={index === 0 ? 'start' : index + 1 === thing.length ? 'end' : 'middle'}
                />
              );
            })}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
