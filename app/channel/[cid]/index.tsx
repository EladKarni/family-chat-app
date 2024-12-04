import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo";
import { Stack, useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { AppContext } from "@/contexts/appContexts";

export default function ChannelScreen() {
  const router = useRouter();
  const { setThread, channel } = useContext(AppContext) as any;
  const { setTopInset } = useAttachmentPickerContext();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  if (!channel) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Channel Screen" }} />
      {channel ? (
        <Channel
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          audioRecordingEnabled
          enableOfflineSupport
        >
          <MessageList
            onThreadSelect={(thread) => {
              setThread(thread);
              router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
            }}
          />
          <MessageInput />
        </Channel>
      ) : null}
    </SafeAreaView>
  );
}
