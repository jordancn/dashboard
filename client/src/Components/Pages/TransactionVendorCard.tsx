/** @jsxRuntime classic */
/** @jsx jsx */
import { Checkmark } from 'Atoms/Checkmark';
import { css, jsx } from '@emotion/react';
import { useSetTransactionVendorMutation } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headline } from 'design-system';

export const TransactionVendorCard: React.FC<{ isChecked: boolean; position?: 'start' | 'middle' | 'end'; transaction: { id: string }; vendor?: { id: string; name: string } }> = (props) => {
  const navigate = useNavigate();

  const [setTransactionVendorMutation, { data, loading, error }] = useSetTransactionVendorMutation({
    variables: {
      transactionId: props.transaction.id,
      vendorId: props.vendor?.id,
    },
  });

  const onClick = React.useCallback(async () => {
    await setTransactionVendorMutation();

    navigate(-1);
  }, [setTransactionVendorMutation]);

  return (
    <Card size='single' onClick={onClick}>
      <CardContents position={props.position}>
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
              <Headline title={props.vendor?.name || 'No Vendor'} />
            </div>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-self: center;
            `}
          >
            {props.isChecked && <Checkmark />}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
