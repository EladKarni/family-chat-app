import React, { ReactElement } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { chatApiKey, chatUserId, chatUserName } from "../chatConfig";

const user = {
  id: chatUserId,
  name: chatUserName,
};

export const ChatWrapper = ({ children }: { children: ReactElement }) => {
  const chatClient = StreamChat.getInstance(chatApiKey);
  chatClient.connectUser(user, chatClient.devToken(chatUserId));
  if (!chatClient) {
    return (
      <SafeAreaView>
        <Text>Loading chat .......</Text>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>{children}</Chat>
    </OverlayProvider>
  );
};
