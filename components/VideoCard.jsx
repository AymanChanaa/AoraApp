import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import { usePathname } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { insertLinkedVideos } from "../lib/appwrite";

const VideoCard = ({ video }) => {
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();
  const pathname = usePathname();

  const addToFavorites = async (video, user) => {
    await insertLinkedVideos(video, user.$id);
    Alert.alert("Success", "Posts saved successfully");
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="flex-row items-center justify-center flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary items-center justify-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="h-full w-full rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>
        </View>
        {pathname.startsWith("/home") ? (
          <View className="pt-2">
            <TouchableOpacity onPress={() => addToFavorites(video, user)}>
              <Image
                source={icons.heart}
                className="w-5 h-5 border-white"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>

      {play ? (
        <Video
          source={{ uri: video.video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => console.log("Video Error:", error)}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <Image
            source={{ uri: video.thumail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
