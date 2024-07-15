import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import {
  getAllPosts,
  getLatestPosts,
  getLinkedUserPosts,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Saved = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const [refreshing, setrefreshing] = useState(false);

  const { data: posts, refetch } = useAppwrite(() =>
    getLinkedUserPosts(user.$id)
  );
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setrefreshing(true);
    // re call videos if any new videos appears
    await refetch();
    setrefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        //data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-5 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <Text className="text-2xl font-psemibold text-white">
                Saved Videos
              </Text>
            </View>

            <SearchInput placeholder="Search your saved videos" />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Saved;
