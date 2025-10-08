import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const FilterChips = ({ selectedFilter, onFilterChange, issues }) => {
  const filters = [
    { 
      id: 'all', 
      label: 'All Issues', 
      icon: 'grid-outline',
      color: 'gray',
      count: issues.length 
    },
    { 
      id: 'pending', 
      label: 'Pending', 
      icon: 'time-outline',
      color: 'yellow',
      count: issues.filter(i => i.status === 'pending').length 
    },
    { 
      id: 'in-progress', 
      label: 'In Progress', 
      icon: 'construct-outline',
      color: 'blue',
      count: issues.filter(i => i.status === 'in-progress').length 
    },
    { 
      id: 'resolved', 
      label: 'Resolved', 
      icon: 'checkmark-done-outline',
      color: 'green',
      count: issues.filter(i => i.status === 'resolved').length 
    }
  ]

  const getChipStyles = (filter, isSelected) => {
    if (isSelected) {
      return {
        container: 'bg-green-500 border-green-500',
        text: 'text-white',
        icon: '#ffffff',
        badge: 'bg-green-600'
      }
    }
    return {
      container: 'bg-white border-gray-200',
      text: 'text-gray-700',
      icon: '#6b7280',
      badge: 'bg-gray-100'
    }
  }

  return (
    <View className="bg-white border-t border-b border-gray-100 py-3">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id
          const styles = getChipStyles(filter, isSelected)
          
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => onFilterChange(filter.id)}
              className={`flex-row items-center px-4 py-2.5 rounded-xl border-2 ${styles.container}`}
              style={{ elevation: isSelected ? 2 : 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: isSelected ? 0.1 : 0, shadowRadius: 2 }}
            >
              <Ionicons 
                name={filter.icon} 
                size={18} 
                color={styles.icon} 
              />
              <Text className={`ml-2 font-bold text-sm ${styles.text}`}>
                {filter.label}
              </Text>
              <View className={`ml-2 px-2 py-0.5 rounded-full ${styles.badge}`}>
                <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default FilterChips