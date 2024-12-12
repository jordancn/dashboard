import { useAccountsOverallQuery } from "@/app/client.gen";
import { useEntityAccountsQuery } from "@/app/client.gen";
import { useRelativeSize } from "@/Utils/helpers";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Empty } from "../Atoms/Empty";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { NavigationBar } from "../Molecules/NavigationBar";
import { AccountCards } from "../Organisms/AccountCards";
import { ContentScrollable } from "../Templates/Content";
import styles from "./Accounts.module.css";

const useAccountsQuery = (entityId?: string) => {
  const isEntity = !!entityId && entityId !== "overview";

  const entityResults = useEntityAccountsQuery({
    variables: {
      entityId: entityId || "",
    },
    skip: !isEntity,
  });

  const overallResults = useAccountsOverallQuery({
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const Accounts = () => {
  const size = useRelativeSize("single");
  const params = useParams<{ entityId?: string }>();
  // const navigate = useNavigate();

  const results = useAccountsQuery(params.entityId);

  const onBackClicked = useCallback(() => {
    // navigate(-1);
  }, []);

  const accounts = useMemo(() => {
    if (results.loading) {
      return [];
    }

    if (!results.data) {
      return [];
    }

    if ("entity" in results.data) {
      return results.data.entity?.accounts || [];
    }

    if ("accounts" in results.data) {
      return results.data.accounts;
    }

    return [];
  }, [results]);

  if (results.loading) {
    return (
      <Empty>
        <NavigationBar></NavigationBar>
        <ContentScrollable type="wrap-cards">
          <Spinner />
        </ContentScrollable>
      </Empty>
    );
  }

  return (
    <Empty>
      <NavigationBar>
        <div className={styles.navigationBar}>
          <div className={styles.backButtonContainer} onClick={onBackClicked}>
            <div>
              <NavigationChevron />
            </div>
            <div className={styles.title}>Insights</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div style={{ width: `${size}px` }} className={styles.accounts}>
          <AccountCards accounts={accounts} />
        </div>
      </ContentScrollable>
    </Empty>
  );
};
