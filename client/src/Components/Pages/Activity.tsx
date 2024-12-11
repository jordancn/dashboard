/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Empty } from 'Atoms/Empty';
import { Spinner } from 'Atoms/Spinner';
import { css, jsx } from '@emotion/react';
import { CategoryType, useEntityActivityOverviewQuery, useEntityActivityQuery } from 'GraphQL/client.gen';
import { Card } from 'Molecules/Card';
import { CardContents } from 'Molecules/CardContents';
import { CardTitle } from 'Molecules/CardTitle';
import { EntityInsightActivityCard } from 'Molecules/EntityInsightActivityCard';
import { NavigationBar } from 'Molecules/NavigationBar';
import { Selector } from 'Molecules/Selector';
import { TransactionGroup } from 'Molecules/TransactionGroupCard';
import { ActivityGroup, useActivityGroup, useGroupIndex, useSetActivityGroup, useSetGroupIndex } from 'Providers/AppStateProvider';
import { ContentScrollable } from 'Templates/Content';
import { addDays, addMonths, addYears, DateIso, getFirstDayOfMonth, getFirstDayOfYear, getLastDayOfMonth, getLastDayOfYear, getWeekDayFromIsoDate, today, toMonthAndYear, toShortMonthAndDate, toYear } from 'Utils/date-iso';
import { formatCurrency } from 'Utils/formatters';
import { getActivitySubGroup, getActivitySubGroupBy, relativePosition, useRelativeSize, useRouteParams } from 'Utils/helpers';
import * as _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import { Title } from 'Atoms/Title';
import { Subheadline, Caption1 } from 'design-system';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = {
  root: {
    // paddingLeft: '16px',
    // paddingRight: '16px',
  },
  slideContainer: {
    // paddingLeft: '8px',
    // paddingRight: '8px',
  },
};

export const TestActivityContainer: React.FC<{ index: number; type: ActivityGroup; start: DateIso; end: DateIso }> = (props) => {
  const size = useRelativeSize('single');
  const activityGroup = useActivityGroup();

  const title = activityGroup === 'Month' ? toMonthAndYear(props.start) : activityGroup === 'Year' ? toYear(props.start) : `${toShortMonthAndDate(props.start)} – ${toShortMonthAndDate(props.end)}`;

  return (
    <div
      css={css`
        width: calc(${size}px);

        padding-left: 16px;
        padding-right: 16px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
      `}
    >
      <div
        css={css`
          margin-left: 10px;
        `}
      >
        <Title title={title} />
      </div>

      <TestActivity end={props.end} index={props.index} start={props.start} type={activityGroup} />
    </div>
  );
};

export const TestActivity: React.FC<{ index: number; type: ActivityGroup; start: DateIso; end: DateIso }> = (props) => {
  const size = useRelativeSize('single');
  const activityGroup = useActivityGroup();

  const navigate = useNavigate();

  const params = useRouteParams<{ entityId?: string | 'overview' }>();

  const dateRange = {
    start: props.start,
    end: props.end,
  };

  const onClick = React.useCallback(
    (categoryId: string) => {
      navigate(`/entity/${params.entityId || 'overview'}/insights/category/${categoryId}/${dateRange.start}/${dateRange.end}`);
    },
    [navigate, dateRange],
  );

  const results =
    params.entityId && params.entityId !== 'overview'
      ? useEntityActivityQuery({
          variables: {
            entityId: params.entityId,
            dateRange,
            activityGroupBy: getActivitySubGroupBy(activityGroup),
          },
        })
      : useEntityActivityOverviewQuery({
          variables: {
            dateRange,
            activityGroupBy: getActivitySubGroupBy(activityGroup),
          },
        });

  const categories = React.useMemo(() => {
    if (results.loading || !results.data) {
      return;
    }

    if ('entity' in results.data) {
      return results.data.entity?.categories;
    }

    if ('categories' in results.data) {
      return results.data.categories;
    }
  }, [results]);

  const activity = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    const getActivity = () => {
      if (!results.data) {
        return [];
      }

      if ('entity' in results.data) {
        return results.data.entity?.activity || [];
      }

      if ('activity' in results.data) {
        return results.data.activity || [];
      }

      return [];
    };

    const act = getActivity();

    return act.map((activity, index, list) => ({
      groupIndex: activity.groupIndex,
      start: activity.start,
      end: activity.end,
      value: Math.abs(activity.total),
      totalIncome: Math.abs(activity.totalIncome),
      totalExpenses: Math.abs(activity.totalExpenses),
    }));
  }, [results]);

  if (results.loading) {
    return (
      <Empty>
        <div>
          <Card size='single'>
            <CardTitle />
            <CardContents variant='transparent'>
              <div
                css={css`
                  height: 400px;
                `}
              >
                <Spinner />
              </div>
            </CardContents>
          </Card>
        </div>
      </Empty>
    );
  }

  const totalIncome = _.sum((categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Income).map((category) => category.total));
  const totalIncomeCount = _.sum((categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Income).map((category) => category.count));

  const totalExpense = _.sum((categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Expense).map((category) => category.total));
  const totalExpenseCount = _.sum((categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Expense).map((category) => category.count));

  return (
    <Empty>
      <div>
        <EntityInsightActivityCard size='single' entityId={params.entityId} activity={activity} activityGroup={getActivitySubGroup(activityGroup)} />

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
                  <Subheadline title='Income' />
                </div>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                `}
              >
                <div>{formatCurrency.format(totalIncome || 0)}</div>
                <div>
                  <Caption1 title={`${totalIncomeCount || 0} transactions`} color='Secondary' />
                </div>
              </div>
            </div>
          </CardContents>
        </Card>

        {_.orderBy(
          (categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Income),
          (category) => category.total,
          'desc',
        ).map((category, index, list) => {
          return (
            <TransactionGroup
              relativePosition={relativePosition(index, list)}
              key={category.categoryId}
              title={category.name}
              id={category.categoryId}
              total={category.total}
              transactionCount={category.count}
              onClick={() => onClick(category.categoryId)}
            />
          );
        })}
      </div>

      {/* subtitle='Show Merchants' /> */}

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
                  <Subheadline title='Expenses' />
                </div>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                `}
              >
                <div>{formatCurrency.format(totalExpense || 0)}</div>
                <div>
                  <Caption1 title={`${totalExpenseCount || 0} transactions`} color='Secondary' />
                </div>
              </div>
            </div>
          </CardContents>
        </Card>

        {_.orderBy(
          (categories || []).filter((category) => category.total !== 0 && category.categoryType === CategoryType.Expense),
          (category) => category.total,
          'asc',
        ).map((category, index, list) => {
          return (
            <TransactionGroup
              relativePosition={relativePosition(index, list)}
              key={category.categoryId}
              title={category.name}
              id={category.categoryId}
              total={category.total}
              transactionCount={category.count}
              onClick={() => onClick(category.categoryId)}
            />
          );
        })}
      </div>
    </Empty>
  );
};

export const Activity: React.FC<{}> = () => {
  const params = useRouteParams<{ entityId?: string | 'overview'; groupType: string; start?: string }>();
  const activityGroup = useActivityGroup();
  const setActivityGroup = useSetActivityGroup();
  const navigate = useNavigate();
  const groupIndex = useGroupIndex();
  const setGroupIndex = useSetGroupIndex();

  const options = React.useMemo(() => {
    return [
      {
        label: 'Week',
        onClick: () => {
          setActivityGroup('Week');
          setGroupIndex(0);

          navigate(`/entity/${params.entityId || 'overview'}/activity/Week#1`);
        },
      },
      {
        label: 'Month',
        onClick: () => {
          setActivityGroup('Month');
          setGroupIndex(0);

          navigate(`/entity/${params.entityId || 'overview'}/activity/Month#1`);
        },
      },
      {
        label: 'Year',
        onClick: () => {
          setActivityGroup('Year');
          setGroupIndex(0);

          navigate(`/entity/${params.entityId || 'overview'}/activity/Year#1`);
        },
      },
    ];
  }, []);

  return (
    <Empty>
      <NavigationBar>
        <Selector size='half' options={options} selectedOptionLabel={activityGroup} />
      </NavigationBar>
      <ContentScrollable type='wrap-cards' fullHeight fullWidth navigationBar>
        <VirtualizeSwipeableViews style={styles.root} slideStyle={styles.slideContainer} overscanSlideBefore={1} overscanSlideAfter={1} index={groupIndex} onChangeIndex={setGroupIndex} slideRenderer={slideRenderer} />
      </ContentScrollable>
    </Empty>
  );
};

const Thing: React.FC<{ index: number }> = (props) => {
  const activityGroup = useActivityGroup();

  const date = today();

  const dateRange = React.useMemo(() => {
    switch (activityGroup) {
      case 'Week': {
        const dayOfWeek = getWeekDayFromIsoDate(date);

        const start = addDays(date, -dayOfWeek + 7 * props.index);
        const end = addDays(date, 6 - dayOfWeek + 7 * props.index);

        return { start, end };
      }
      case 'Month': {
        const start = getFirstDayOfMonth(addMonths(date, props.index));
        const end = getLastDayOfMonth(addMonths(date, props.index));

        return { start, end };
      }
      case 'Year':
        const start = getFirstDayOfYear(addYears(date, props.index));
        const end = getLastDayOfYear(addYears(date, props.index));

        return { start, end };

      default:
        return;
    }
  }, [activityGroup]);

  if (!dateRange) {
    return null;
  }

  return <TestActivityContainer index={props.index} start={dateRange.start} end={dateRange.end} type={activityGroup} />;
};

function slideRenderer(params: { index: number; key: number }) {
  return <Thing key={params.key} index={params.index} />;
}
