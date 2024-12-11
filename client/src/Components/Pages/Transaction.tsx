/** @jsxRuntime classic */
/** @jsx jsx */
import { Chevron } from 'Atoms/Chevron';
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useTransactionQuery } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { NavigationBar } from 'Molecules/NavigationBar';
import { TransactionAmount } from 'Molecules/TransactionAmount';
import { ContentScrollable } from 'Templates/Content';
import { formatCurrency, formatDate } from 'Utils/formatters';
import { useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { Subheadline, Caption1 } from 'design-system';

export const Transaction: React.FC<{ mode: 'insights' }> = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string; transactionId: string }>();
  const navigate = useNavigate();

  const results = useTransactionQuery({
    variables: {
      transactionId: params.transactionId,
    },
  });

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

  const onMerchantClick = React.useCallback(() => {
    const transaction = results.data?.transaction;

    if (!transaction) {
      return;
    }

    navigate(`/entity/${params.entityId || 'overview'}/insights/transaction/${params.transactionId}/vendor?description=${transaction?.description}`);
  }, [navigate, params, results]);

  const onCategoryClick = React.useCallback(() => {
    navigate(`/entity/${params.entityId || 'overview'}/insights/transaction/${params.transactionId}/category?description=${transaction?.description}`);
  }, [navigate, params, results]);

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
              {props.mode === 'insights' ? <Empty>Insights</Empty> : <Empty>Back</Empty>}
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type='wrap-cards'>
        <div
          css={css`
            width: ${size}px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
          `}
        >
          {transaction.vendor?.image && (
            <img
              alt={transaction.vendor?.name || ''}
              css={css`
                width: 45px;
                height: 45px;
              `}
              src={`data:image/png;base64,${transaction.vendor.image}`}
            />
          )}
        </div>

        <div
          css={css`
            width: ${size}px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Subheadline title={transaction.vendor?.name || ''} />
        </div>

        <div
          css={css`
            width: ${size}px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <TransactionAmount title={formatCurrency.format(transaction.amount)} />
        </div>

        <div
          css={css`
            width: ${size}px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {transaction.pending && <Caption1 title='Pending' />}
          {!transaction.pending && <Caption1 title={formatDate(transaction.date)} />}
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
          <Card size='single'>
            <CardContents position='start'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Caption1 weight='Bold' title={transaction.account?.name} />
                  </div>
                  <div>
                    <Caption1 title='Account Number' color='Secondary' />
                  </div>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-self: flex-end;
                  `}
                >
                  <div>
                    <Caption1 title={`· · · · ${transaction.account?.number}`} color='Secondary' />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card size='single'>
            <CardContents position='middle'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Caption1 weight='Bold' title='Description' />
                  </div>
                  <div>
                    <Caption1 title={transaction.description} color='Secondary' />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card size='single' onClick={!transaction.pending ? onCategoryClick : undefined}>
            <CardContents position='middle'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Caption1 weight='Bold' title='Category' />
                  </div>
                  <div>
                    <Caption1 title={transaction.category?.name || 'No Category'} color='Secondary' />
                  </div>
                </div>
                <div
                  css={css`
                    align-self: flex-start;
                    padding-top: 6px;
                  `}
                >
                  {!transaction.pending && <Chevron />}
                </div>
              </div>
            </CardContents>
          </Card>
          <Card size='single' onClick={!transaction.pending ? onMerchantClick : undefined}>
            <CardContents position='end'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Caption1 weight='Bold' title='Merchant' />
                  </div>
                  <div>
                    <Caption1 title={transaction.vendor?.name || 'No Vendor'} color='Secondary' />
                  </div>
                </div>
                <div
                  css={css`
                    align-self: flex-start;
                    padding-top: 6px;
                  `}
                >
                  {!transaction.pending && <Chevron />}
                </div>
              </div>
            </CardContents>
          </Card>
          {transaction.vendor?.name === 'Amazon' && (
            <Card size='single' onClick={onMerchantClick}>
              <CardContents position='end'>
                <div
                  css={css`
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                    `}
                  >
                    <div>
                      <Caption1 weight='Bold' title='Details' />
                    </div>
                    <div>
                      {/* https://www.amazon.com/gp/your-account/order-details/?orderID=111-3298699-4870603 */}
                      <Caption1 title='111-3298699-4870603' color='Secondary' />
                    </div>
                  </div>
                  <div
                    css={css`
                      align-self: flex-start;
                      padding-top: 6px;
                    `}
                  >
                    <Chevron />
                  </div>
                </div>
              </CardContents>
            </Card>
          )}
          {/* <Card size='single'>
            <CardContents position='end'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  height: 150px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Headline title='Notes' />
                  </div>
                  <div>
                    <TextInput onChange={() => {}} value='' placeholder='' multiline />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card> */}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
