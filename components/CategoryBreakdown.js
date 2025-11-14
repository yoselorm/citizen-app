import { View, Text } from 'react-native'
import React from 'react'

const CategoryBreakdown = ({ data }) => {
  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm">
      <Text className="text-base font-bold text-gray-900 mb-4">
        Issues by Category
      </Text>
      <View className="gap-3">
        {data.map((category, index) => (
          <View key={index}>
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center flex-1">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <Text className="text-sm font-medium text-gray-900">
                  {category.name}
                </Text>
              </View>
              <Text className="text-sm font-bold text-gray-900">
                {category.count}
              </Text>
            </View>
            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <View 
                className="h-full rounded-full"
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default CategoryBreakdown