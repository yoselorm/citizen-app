import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const StatusBadge = ({ status, size = 'small' }) => {
  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: 'time',
      iconColor: '#ca8a04',
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: 'construct',
      iconColor: '#2563eb',
      label: 'In Progress'
    },
    resolved: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: 'checkmark-circle',
      iconColor: '#16a34a',
      label: 'Resolved'
    }
  }

  const config = statusConfig[status]
  const isLarge = size === 'large'

  return (
    <View className={`${config.bg} px-2.5 py-1.5 rounded-full flex-row items-center`}>
      <Ionicons 
        name={config.icon} 
        size={isLarge ? 16 : 12} 
        color={config.iconColor} 
      />
      <Text className={`${config.text} ${isLarge ? 'text-sm' : 'text-xs'} font-semibold ml-1`}>
        {config.label}
      </Text>
    </View>
  )
}

export default StatusBadge