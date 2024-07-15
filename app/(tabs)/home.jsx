import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const [refreshing, setrefreshing] = useState(false);

  const { data: posts, refetch: refetchAllPosts } = useAppwrite(getAllPosts);
  const { data: latestPosts, refetch: refetchLatestsPosts } =
    useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setrefreshing(true);
    // re call videos if any new videos appears
    await refetchAllPosts();
    await refetchLatestsPosts();
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
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Home
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search for a video topic" />

            <View classeName="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
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

export default Home;
