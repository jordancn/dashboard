/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useTransactionVendorQuery } from 'GraphQL/client.gen';
import { NavigationBar } from 'Molecules/NavigationBar';
import { TransactionNewVendorCard } from 'Pages/TransactionNewVendorCard';
import { TransactionVendorCard } from 'Pages/TransactionVendorCard';
import { ContentScrollable } from 'Templates/Content';
import { useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as _ from 'lodash';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';

export const TransactionVendor: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId: string; transactionId: string }>();

  const search = useLocation().search;
  const description = new URLSearchParams(search).get('description');

  const navigate = useNavigate();

  const results = useTransactionVendorQuery({
    variables: {
      transactionId: params.transactionId,
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
          <TransactionVendorCard position='start' isChecked={!transaction.vendor} transaction={transaction} />
          <TransactionNewVendorCard position='end' placeholder={description || ''} transaction={transaction} />
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
          {_.orderBy(results.data?.vendors || [], (vendor) => vendor.name).map((vendor, index, thing) => {
            return <TransactionVendorCard vendor={vendor} isChecked={vendor.id === transaction.vendor?.id} transaction={transaction} key={vendor.id} position={index === 0 ? 'start' : index + 1 === thing.length ? 'end' : 'middle'} />;
          })}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
