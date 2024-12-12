"use client";

import { useAccountQuery } from "@/app/client.gen";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AccountPage() {
  const params = useParams();

  const accountInfo = useAccountQuery({
    variables: {
      id: params.accountId as string,
    },
  });

  if (accountInfo.loading) {
    return <div>Loading...</div>;
  }

  if (accountInfo.error) {
    return <div>Error: {accountInfo.error.message}</div>;
  }

  if (!accountInfo.data) {
    return <div>No data</div>;
  }

  if (!accountInfo.data.account) {
    return <div>No account</div>;
  }

  const accountId = accountInfo.data.account.id;

  console.log(accountInfo);

  return (
    <div>
      <h1>{accountInfo.data.account.name}</h1>

      <div>
        <Link href={`${accountId}/transactions`}>Transactions</Link>
      </div>
    </div>
  );
}
