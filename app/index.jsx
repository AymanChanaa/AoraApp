import { Redirect, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App() {

  const { isLoggedIn, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedIn) 
    return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex items-center min-h-[85vh] px-4 pt-8">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className ="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
          title = "Continue with email"
          handlePress = {() => router.push("/sign-in")}
          containerStyles  = "w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar 
      backgroundColor="#161622"
      style="light"
      />
    </SafeAreaView>
  );
}

export default App;
