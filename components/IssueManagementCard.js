import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IssueManagementCard = ({ issue, onPress }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: '#f59e0b' }
      case 'in-progress': return { bg: 'bg-blue-100', text: 'text-blue-700', dot: '#3b82f6' }
      case 'resolved': return { bg: 'bg-green-100', text: 'text-green-700', dot: '#22c55e' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', dot: '#6b7280' }
    }
  }

  const statusColor = getStatusColor(issue.status)
  const timeAgo = getTimeAgo(issue.reportedDate)

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98]"
    >
      {issue.priority === 'high' && (
        <View className="h-1 bg-red-500" />
      )}

      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">{issue.icon}</Text>
              <View className={`px-2 py-1 rounded-md ${statusColor.bg}`}>
                <Text className={`text-xs font-bold ${statusColor.text}`}>
                  {issue.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
            <Text className="text-base font-bold text-gray-900 mb-1">
              {issue.title}
            </Text>
            <Text className="text-xs text-gray-500 capitalize">
              {issue.category} • {timeAgo}
            </Text>
          </View>

          {issue.images && issue.images.length > 0 && (
            <Image
              source={{ uri: issue.images[0] }}
              className="w-16 h-16 rounded-xl"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Description */}
        <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
          {issue.description}
        </Text>

        {/* Footer */}
        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-xs text-gray-600 ml-1" numberOfLines={1}>
              {issue.location}
            </Text>
          </View>

          {issue.assignedTo && (
            <View className="bg-green-50 px-2 py-1 rounded-md">
              <Text className="text-xs font-semibold text-green-700">
                {issue.assignedTo}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

// Helper function
const getTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

export default IssueManagementCard