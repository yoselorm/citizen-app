import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const QuickStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Issues',
      value: stats.total,
      icon: 'document-text',
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: 'time',
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: 'construct',
      color: '#8b5cf6',
      bgColor: '#ede9fe'
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: 'checkmark-circle',
      color: '#22c55e',
      bgColor: '#dcfce7'
    }
  ]

  return (
    <View>
      <Text className="text-base font-bold text-gray-900 mb-3">
        Overview
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {statCards.map((stat, index) => (
          <View 
            key={index}
            className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-sm"
          >
            <View 
              className="w-10 h-10 rounded-xl items-center justify-center mb-3"
              style={{ backgroundColor: stat.bgColor }}
            >
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </Text>
            <Text className="text-xs text-gray-500 font-medium">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Additional Metrics */}
      <View className="flex-row gap-3 mt-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border-l-4 border-green-500">
          <Text className="text-xs text-gray-500 mb-1">Avg Response Time</Text>
          <Text className="text-xl font-bold text-gray-900">{stats.avgResponseTime}</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border-l-4 border-blue-500">
          <Text className="text-xs text-gray-500 mb-1">Completion Rate</Text>
          <Text className="text-xl font-bold text-gray-900">{stats.completionRate}%</Text>
        </View>
      </View>
    </View>
  )
}

export default QuickStats