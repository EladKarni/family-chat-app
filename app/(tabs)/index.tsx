import { StyleSheet, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useContext, useMemo } from "react";
import { Stack, useRouter } from "expo-router";
import { chatUserId } from "@/chatConfig";
import { AppContext } from "@/contexts/appContexts";

const filters = {
  members: { $in: [chatUserId] },
  type: "messaging",
};
const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen() {
  const memoizedFilters = useMemo(() => filters, []);
  const router = useRouter();
  const { setChannel } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Channel List Screen" }} />
      <ChannelList
        filters={memoizedFilters}
        options={options}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/channel/${channel.cid}` as any);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
