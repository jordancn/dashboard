/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAddCategoryMutation, useSetTransactionCategoryMutation } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { TextInput } from 'Molecules/TextInput';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const TransactionNewCategoryCard: React.FC<{ placeholder: string; position?: 'start' | 'middle' | 'end'; transaction: { id: string } }> = (props) => {
  const navigate = useNavigate();

  const [setTransactionCategoryMutation] = useSetTransactionCategoryMutation();

  const [addCategory] = useAddCategoryMutation();

  const onChange = React.useCallback(
    async (name: string) => {
      const category = await addCategory({
        variables: {
          name,
        },
        refetchQueries: ['TransactionCategory'],
      });

      if (!category.data?.addCategory.categoryId) {
        return;
      }

      await setTransactionCategoryMutation({
        variables: {
          transactionId: props.transaction.id,
          categoryId: category.data.addCategory.categoryId,
        },
      });

      navigate(-1);
    },
    [setTransactionCategoryMutation, props.transaction.id],
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
