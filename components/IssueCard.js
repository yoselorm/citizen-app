import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import StatusBadge from './StatusBadge'

const IssueCard = ({ issue, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98]"
      style={{ transform: [{ scale: 1 }] }}
    >
      {/* Priority Indicator */}
      {issue.priority === 'high' && (
        <View className="h-1 bg-red-500" />
      )}

      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <Text className="text-base font-bold text-gray-900 mb-1" numberOfLines={2}>
              {issue.title}
            </Text>
            <View className="flex-row items-center">
              <View className="bg-gray-100 px-2 py-1 rounded-md">
                <Text className="text-xs font-semibold text-gray-600 capitalize">
                  {issue.category.replace('-', ' ')}
                </Text>
              </View>
            </View>
          </View>
          <StatusBadge status={issue.status} />
        </View>

        {/* Image Gallery */}
        {issue.images && issue.images.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-3 -mx-1"
            contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
          >
            {issue.images.map((image, index) => (
              <View key={index} className="relative">
                <Image
                  source={{ uri: image }}
                  className="w-32 h-32 rounded-xl"
                  resizeMode="cover"
                />
                {index === 0 && issue.images.length > 1 && (
                  <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md">
                    <Text className="text-white text-xs font-bold">
                      1/{issue.images.length}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        {/* Description */}
        <Text className="text-sm text-gray-600 mb-3 leading-5" numberOfLines={2}>
          {issue.description}
        </Text>

        {/* Location & Meta Info */}
        <View className="space-y-2">
          <View className="flex-row items-center">
            <Ionicons name="location" size={14} color="#6b7280" />
            <Text className="text-xs text-gray-600 ml-1.5 flex-1" numberOfLines={1}>
              {issue.location}
            </Text>
          </View>

          <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={13} color="#6b7280" />
                <Text className="text-xs text-gray-600 ml-1">
                  {new Date(issue.reportedDate).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="eye-outline" size={13} color="#6b7280" />
                <Text className="text-xs text-gray-600 ml-1">{issue.views}</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-gray-50 px-2.5 py-1 rounded-full">
              <Ionicons name="chatbubble-outline" size={12} color="#6b7280" />
              <Text className="text-xs text-gray-600 ml-1 font-medium">
                {issue.comments.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default IssueCard
