import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ImageGallery = ({ images, onRemove, onAddFromGallery, onTakePhoto }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
    >
      {/* Add Photo Buttons */}
      {images.length < 5 && (
        <>
          <TouchableOpacity
            onPress={onTakePhoto}
            className="w-28 h-28 rounded-2xl bg-white border-2 border-dashed border-gray-300 items-center justify-center"
          >
            <Ionicons name="camera" size={28} color="#9ca3af" />
            <Text className="text-xs text-gray-500 mt-2 font-medium">Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onAddFromGallery}
            className="w-28 h-28 rounded-2xl bg-white border-2 border-dashed border-gray-300 items-center justify-center"
          >
            <Ionicons name="images" size={28} color="#9ca3af" />
            <Text className="text-xs text-gray-500 mt-2 font-medium">From Gallery</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Image Previews */}
      {images.map((image, index) => (
        <View key={index} className="relative">
          <Image
            source={{ uri: image }}
            className="w-28 h-28 rounded-2xl"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => onRemove(index)}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>
          <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded-md">
            <Text className="text-white text-xs font-bold">{index + 1}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

export default ImageGallery