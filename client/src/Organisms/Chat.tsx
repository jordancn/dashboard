import { TextInput } from "@/Molecules/TextInput";
import { useChatChannel } from "@/Organisms/ChatChannel";
import { useSetError } from "@/Providers/ErrorStateProvider";
import { useIsSocketConnected } from "@/Providers/SocketProvider";
import { DateTimeIso, now, toSlashyDateAndTime } from "@/Utils/date-time-iso";
import classNames from "classnames";
import Mousetrap from "mousetrap";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

export const Chat = ({ onClose }: { onClose: () => void }) => {
  const isSocketConnected = useIsSocketConnected();
  const setError = useSetError();
  const chatChannel = useChatChannel();

  const [entries, setEntries] = useState<
    { type: "request" | "response"; message: string; date: DateTimeIso }[]
  >([]);
  const [message, setMessage] = useState<string>("");

  const logsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatChannel.state === "disconnected") {
      return;
    }

    chatChannel.on((data) => {
      console.log("received", JSON.stringify(data));

      setEntries((prev) => [
        ...prev,
        {
          type: "response",
          message: data.message,
          date: data.date,
        },
      ]);

      setTimeout(() => {
        logsRef.current?.scrollTo({
          top: logsRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    });

    return () => {
      chatChannel.off();
    };
  }, [chatChannel]);

  const sendData = useCallback(
    (message: string) => {
      console.log("sendData", message);

      if (chatChannel.state === "disconnected") {
        setError(["Socket is disconnected"]);
        return;
      }

      setEntries((prev) => [
        ...prev,
        { type: "request", message, date: now() },
      ]);

      chatChannel.emit({ message });

      setMessage("");
    },
    [chatChannel, setError],
  );

  const onSendButtonClicked = useCallback(() => {
    if (chatChannel.state === "disconnected") {
      return;
    }

    console.log("onSendButtonClicked", message);

    sendData(message);
  }, [chatChannel, message, sendData]);

  const onInputEnter = useCallback(
    (value: string) => {
      console.log("onInputEnter", value);

      sendData(value);
    },
    [sendData],
  );

  const onInputChanged = useCallback(
    (value: string) => {
      console.log("onInputChanged", value);

      setMessage(value);
    },
    [setMessage],
  );

  useEffect(() => {
    Mousetrap.bind("escape", () => {
      onClose();
    });
  }, [onClose]);

  return (
    <div className={styles.chatContainer} onClick={onClose}>
      {/* <div className={styles.chatClose} onClick={onClose}>
        <CloseIcon />
      </div> */}
      <div className={styles.chat} onClick={(e) => e.stopPropagation()}>
        <div className={styles.logs} ref={logsRef}>
          {entries.map((entry, index) => (
            <div
              className={classNames(styles.log, {
                [styles.request]: entry.type === "request",
                [styles.response]: entry.type === "response",
              })}
              key={index}
            >
              <div className={styles.logDate}>
                {toSlashyDateAndTime(entry.date)}
              </div>
              <div className={styles.logMessage}>{entry.message}</div>
            </div>
          ))}
        </div>
        <div className={styles.message}>
          {/* <ConnectionStatusIcon
            status={isSocketConnected ? "connected" : "disconnected"}
          />
         */}
          <div className={styles.messageMessage}>
            <TextInput
              value={message}
              onChange={onInputChanged}
              onEnter={onInputEnter}
              placeholder="Message"
              clearOnEnter
            />
          </div>
          <div className={styles.messageButton}>
            <button
              className={classNames({
                [styles.buttonEnabled]: chatChannel.state === "connected",
                [styles.buttonDisabled]: chatChannel.state === "disconnected",
              })}
              onClick={onSendButtonClicked}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
