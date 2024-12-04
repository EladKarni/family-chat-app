import React, { ReactElement, useState } from "react";
import { DefaultStreamChatGenerics } from "stream-chat-expo";
import { MessageType, ThreadType } from "stream-chat-expo";

export const AppContext = React.createContext({
  channel: null as any,
  setChannel: (channel: any) => {},
  thread: null as
    | MessageType<DefaultStreamChatGenerics>
    | ThreadType<DefaultStreamChatGenerics>
    | null
    | undefined,
  setThread: (thread: any) => {},
});

export const AppProvider = ({ children }: { children: ReactElement }) => {
  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState();

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
