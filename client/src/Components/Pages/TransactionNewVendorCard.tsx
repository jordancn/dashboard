/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAddVendorMutation, useSetTransactionVendorMutation } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { TextInput } from 'Molecules/TextInput';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const TransactionNewVendorCard: React.FC<{ placeholder: string; position?: 'start' | 'middle' | 'end'; transaction: { id: string } }> = (props) => {
  const navigate = useNavigate();

  const [setTransactionVendorMutation] = useSetTransactionVendorMutation();

  const [addVendor] = useAddVendorMutation();

  const onChange = React.useCallback(
    async (name: string) => {
      const vendor = await addVendor({
        variables: {
          name,
        },
        refetchQueries: ['TransactionVendor'],
      });

      if (!vendor.data?.addVendor.id) {
        return;
      }

      await setTransactionVendorMutation({
        variables: {
          transactionId: props.transaction.id,
          vendorId: vendor.data.addVendor.id,
        },
      });

      navigate(-1);
    },
    [setTransactionVendorMutation, props.transaction.id],
  );

  return (
    <Card size='single'>
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
              flex-grow: 1;
            `}
          >
            <TextInput placeholder={props.placeholder} value='' onChange={onChange} />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-self: center;
            `}
          ></div>
        </div>
      </CardContents>
    </Card>
  );
};
