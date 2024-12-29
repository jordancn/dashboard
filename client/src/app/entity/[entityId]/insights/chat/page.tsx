"use client";

import { TextInput } from "@/Molecules/TextInput";
import {
  useIsSocketConnected,
  useSocketChannel,
} from "@/Providers/SocketProvider";
import { DateIso } from "@/Utils/date-iso";
import { DateTimeIso, toSlashyDateAndTime } from "@/Utils/date-time-iso";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

type HelloRequest = {
  message: string;
};

type HelloResponse = {
  message: string;
  date: DateIso;
};

const useHelloSocketChannel = () => {
  const channel = useSocketChannel<HelloRequest, HelloResponse>("hello");

  return channel;
};

const Chat = () => {
  const isSocketConnected = useIsSocketConnected();
  const channel = useHelloSocketChannel();
  const [responsesReceived, setResponsesReceived] = useState<HelloResponse[]>(
    [],
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (channel.state === "disconnected") {
      return;
    }

    channel.on?.((data) => {
      console.log("received", JSON.stringify(data));

      setResponsesReceived((prev) => [...prev, data]);
    });
  }, [channel, responsesReceived]);

  const sendData = useCallback(() => {
    channel.emit?.({ message });
  }, [channel, message]);

  return (
    <div>
      {isSocketConnected ? <div>Connected</div> : <div>Disconnected</div>}

      <div className={styles.request}>
        <div className={styles.requestMessage}></div>
        <TextInput
          value={message}
          onChange={setMessage}
          placeholder="Message"
        />
        <div className={styles.requestButton}>
          <button onClick={sendData}>Send</button>
        </div>
      </div>

      <div className={styles.responses}>
        {responsesReceived.map((response, index) => (
          <div className={styles.response} key={index}>
            <div className={styles.responseDate}>
              {toSlashyDateAndTime(response.date as unknown as DateTimeIso)}
            </div>
            <div className={styles.responseMessage}>{response.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
