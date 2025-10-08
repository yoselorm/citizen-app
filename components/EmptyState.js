import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const EmptyState = ({ filterType }) => {
  const emptyMessages = {
    all: {
      icon: 'document-text-outline',
      title: 'No Issues Yet',
      description: 'Be the first to report an issue in your community'
    },
    pending: {
      icon: 'time-outline',
      title: 'No Pending Issues',
      description: 'All reported issues are being addressed'
    },
    'in-progress': {
      icon: 'construct-outline',
      title: 'Nothing In Progress',
      description: 'No issues are currently being worked on'
    },
    resolved: {
      icon: 'checkmark-done-outline',
      title: 'No Resolved Issues',
      description: 'Completed issues will appear here'
    }
  }

  const message = emptyMessages[filterType] || emptyMessages.all

  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Ionicons name={message.icon} size={48} color="#9ca3af" />
      </View>
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
        {message.title}
      </Text>
      <Text className="text-sm text-gray-500 text-center">
        {message.description}
      </Text>
    </View>
  )
}

export default EmptyState