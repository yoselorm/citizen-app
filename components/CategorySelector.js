import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <View className="px-5 pt-6">
      <View className="mb-6">
        <Text className="text-base text-gray-600 leading-6 mb-1">
          What type of issue would you like to report?
        </Text>
        <Text className="text-sm text-gray-500">
          Select the category that best matches your concern
        </Text>
      </View>

      <View className="gap-3">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelect(category.id)}
            className={`bg-white rounded-2xl p-4 flex-row items-center border-2 ${
              selectedCategory === category.id 
                ? 'border-green-500' 
                : 'border-gray-200'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: selectedCategory === category.id ? 0.1 : 0.05,
              shadowRadius: 3,
              elevation: selectedCategory === category.id ? 3 : 1
            }}
          >
            <View 
              className="w-14 h-14 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: category.color + '20' }}
            >
              <Text className="text-3xl">{category.icon}</Text>
            </View>
            
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900 mb-1">
                {category.name}
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                {category.description}
              </Text>
            </View>

            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              selectedCategory === category.id 
                ? 'border-green-500 bg-green-500' 
                : 'border-gray-300'
            }`}>
              {selectedCategory === category.id && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default CategorySelector