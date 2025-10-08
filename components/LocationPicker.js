import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const LocationPicker = ({ location, district, onDetectLocation, isLoading }) => {
  return (
    <View className="mb-6">
      <Text className="text-sm font-bold text-gray-700 mb-3">
        Location <Text className="text-red-500">*</Text>
      </Text>

      {location ? (
        <View className="bg-white rounded-2xl p-4 border-2 border-green-200">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={20} color="#22c55e" />
                <Text className="text-sm font-bold text-gray-900 ml-2">Location Detected</Text>
              </View>
              <Text className="text-sm text-gray-600 mb-1">{district}</Text>
              <Text className="text-xs text-gray-500">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onDetectLocation}
              className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="refresh" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row items-center pt-3 border-t border-gray-100">
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text className="text-xs text-green-600 ml-1.5 font-medium">
              Location verified
            </Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onDetectLocation}
          disabled={isLoading}
          className="bg-white rounded-2xl p-4 border-2 border-dashed border-gray-300 items-center"
        >
          {isLoading ? (
            <>
              <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-3">
                <Ionicons name="sync" size={24} color="#3b82f6" />
              </View>
              <Text className="text-sm font-bold text-gray-900 mb-1">Detecting Location...</Text>
              <Text className="text-xs text-gray-500 text-center">
                Please wait while we get your location
              </Text>
            </>
          ) : (
            <>
              <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-3">
                <Ionicons name="navigate" size={24} color="#22c55e" />
              </View>
              <Text className="text-sm font-bold text-gray-900 mb-1">Detect Current Location</Text>
              <Text className="text-xs text-gray-500 text-center">
                Tap to automatically detect your location
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default LocationPicker