/** @jsxRuntime classic */
/** @jsx jsx */
import { Checkmark } from 'Atoms/Checkmark';
import { css, jsx } from '@emotion/react';
import { useSetTransactionCategoryMutation } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headline } from 'design-system';

export const TransactionCategoryCard: React.FC<{ isChecked: boolean; position?: 'start' | 'middle' | 'end'; transaction: { id: string }; category?: { id: string; name: string; categoryId: string } }> = (props) => {
  const navigate = useNavigate();

  const [setTransactionCategoryMutation, { data, loading, error }] = useSetTransactionCategoryMutation({
    variables: {
      transactionId: props.transaction.id,
      categoryId: props.category?.categoryId,
    },
  });

  const onClick = React.useCallback(async () => {
    await setTransactionCategoryMutation();

    navigate(-1);
  }, [setTransactionCategoryMutation]);

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
              <Headline title={props.category?.name || 'No Category'} />
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
