import { View, Text, ImageBackground, Animated } from 'react-native'
import React, { useRef } from 'react'

const SplashScreen = () => {
    const scaleAnim = useRef(new Animated.Value(1.2)).current;

  return (
    <View className="flex-1 w-full h-full">
    <Animated.View
      className="absolute inset-0 w-full h-full"
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <ImageBackground
        source={require("../assets/main-splash.jpg")}
        className="flex-1"
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
      </ImageBackground>
    </Animated.View>
    
    {/* Dark overlay */}
    <View className="flex-1 bg-black/50 px-6 pb-12 w-full h-full">
      {/* Content container */}
      <View className="flex-1 justify-between">
        {/* Top spacing */}
        <View className="h-1/5" />

        {/* Main content */}
        <View className="items-center space-y-6">
          <Text className="text-white text-2xl font-bold text-center">
          THE CITIZEN APP 🇬🇭
          </Text>

          <Text className="text-white text-center text-base opacity-90">
            Be A Citizen Not A Spectator
          </Text>
        </View>

        {/* Bottom content */}
        <View className="items-center pb-8">
          <Text className="text-white text-base opacity-70">
            Powered by Precision GIS
          </Text>
        </View>
      </View>
    </View>
  </View>
  )
}

export default SplashScreen