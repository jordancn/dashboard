/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { NavigationChevron } from 'Atoms/NavigationChevron';
import { Spinner } from 'Atoms/Spinner';
import { FONT } from 'Configuration/Configuration';
import { css, jsx } from '@emotion/react';
import { useAccountsOverallQuery, useEntityAccountsQuery } from 'GraphQL/client.gen';
import { NavigationBar } from 'Molecules/NavigationBar';
import { AccountCards } from 'Organisms/AccountCards';
import { ContentScrollable } from 'Templates/Content';
import { useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as React from 'react';
import { useNavigate } from 'react-router';

export const Accounts: React.FC = (props) => {
  const size = useRelativeSize('single');
  const params = useRouteParams<{ entityId?: string }>();
  const navigate = useNavigate();

  const results =
    params.entityId && params.entityId !== 'overview'
      ? useEntityAccountsQuery({
          variables: {
            entityId: params.entityId,
          },
        })
      : useAccountsOverallQuery({});

  const onBackClicked = React.useCallback(() => {
    navigate(-1);
  }, []);

  const accounts = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    if (!results.data) {
      return [];
    }

    if ('entity' in results.data) {
      return results.data.entity?.accounts || [];
    }

    if ('accounts' in results.data) {
      return results.data.accounts;
    }

    return [];
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
          <AccountCards accounts={accounts} />
        </div>
      </ContentScrollable>
    </Empty>
  );
};
