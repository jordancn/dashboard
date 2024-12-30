import { CircleIcon } from "@/Atoms/CircleIcon";
import { CircleSlashIcon } from "@/Atoms/CircleSlashIcon";

export const ConnectionStatusIcon = ({
  status,
}: {
  status: "connected" | "disconnected";
}) => {
  if (status === "connected") {
    return <CircleIcon variant="positive" />;
  }

  return <CircleSlashIcon variant="negative" />;
};
