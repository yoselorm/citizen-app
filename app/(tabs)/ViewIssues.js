import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import IssueCard from '../../components/IssueCard'
import FilterChips from '../../components/FilterChips'
import IssueDetailModal from '../../components/IssueDetailModal'
import EmptyState from '../../components/EmptyState'

const ViewIssues = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Mock issues data with images
  const issues = [
    {
      id: 1,
      category: 'sanitation',
      title: 'Indiscriminate waste dumping',
      description: 'Large pile of rubbish dumped near main market entrance. Creating health hazard and bad odor in the area. Residents are complaining about flies and rats.',
      location: 'Makola Market, Accra',
      coordinates: { lat: 5.6037, lng: -0.1870 },
      district: 'Accra Metropolitan',
      status: 'pending',
      reportedDate: '2025-10-05T09:30:00',
      time: '09:30 AM',
      images: [
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800',
        'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
        'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800'
      ],
      comments: [
        {
          id: 1,
          user: 'Anonymous',
          text: 'This has been here for over 2 weeks now. Please help!',
          date: '2025-10-05',
          time: '10:15 AM'
        },
        {
          id: 2,
          user: 'Anonymous',
          text: 'The smell is unbearable especially in the evening',
          date: '2025-10-05',
          time: '02:30 PM'
        }
      ],
      icon: '🗑️',
      priority: 'high',
      views: 234
    },
    {
      id: 2,
      category: 'water',
      title: 'Broken water pipeline',
      description: 'Main water pipeline burst causing flooding on the street. Urgent repair needed.',
      location: 'Osu, Accra',
      coordinates: { lat: 5.6098, lng: -0.1920 },
      district: 'Accra Metropolitan',
      status: 'in-progress',
      reportedDate: '2025-10-04T14:15:00',
      resolvedDate: null,
      time: '02:15 PM',
      images: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      ],
      comments: [
        {
          id: 1,
          user: 'Anonymous',
          text: 'Water board team is on site now',
          date: '2025-10-06',
          time: '11:00 AM'
        }
      ],
      icon: '💧',
      priority: 'high',
      views: 189
    },
    {
      id: 3,
      category: 'security',
      title: 'Non-functioning streetlight',
      description: 'Streetlight has been out for 2 weeks. Area is dark and unsafe at night.',
      location: 'Labone, Accra',
      coordinates: { lat: 5.6120, lng: -0.1850 },
      district: 'Accra Metropolitan',
      status: 'resolved',
      reportedDate: '2025-10-01T18:45:00',
      resolvedDate: '2025-10-03T16:30:00',
      time: '06:45 PM',
      images: [
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'
      ],
      comments: [
        {
          id: 1,
          user: 'Anonymous',
          text: 'Fixed! Thank you assembly',
          date: '2025-10-03',
          time: '05:00 PM'
        }
      ],
      icon: '💡',
      priority: 'medium',
      views: 156
    },
    {
      id: 4,
      category: 'roads',
      title: 'Dangerous pothole on main road',
      description: 'Large pothole causing damage to vehicles and traffic congestion during rush hours.',
      location: 'Spintex Road, Accra',
      coordinates: { lat: 5.6450, lng: -0.1234 },
      district: 'Accra Metropolitan',
      status: 'pending',
      reportedDate: '2025-10-06T11:20:00',
      time: '11:20 AM',
      images: [
        'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800',
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
      ],
      comments: [],
      icon: '🛣️',
      priority: 'high',
      views: 312
    }
  ]

  // Filter issues based on selected filter
  const filteredIssues = selectedFilter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === selectedFilter)

  const handleIssuePress = (issue) => {
    setSelectedIssue(issue)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setTimeout(() => setSelectedIssue(null), 300)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 py-4 bg-white">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-2xl font-bold text-gray-900">All Issues</Text>
          <View className="bg-green-100 px-3 py-1.5 rounded-full">
            <Text className="text-sm font-bold text-green-700">
              {filteredIssues.length}
            </Text>
          </View>
        </View>
        <Text className="text-sm text-gray-500">Track reported issues in your area</Text>
      </View>

      {/* Filter Chips */}
      <FilterChips 
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        issues={issues}
      />

      {/* Issues List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredIssues.length > 0 ? (
          <View className="px-5 pt-4 gap-3">
            {filteredIssues.map((issue) => (
              <IssueCard 
                key={issue.id}
                issue={issue}
                onPress={() => handleIssuePress(issue)}
              />
            ))}
          </View>
        ) : (
          <EmptyState filterType={selectedFilter} />
        )}
      </ScrollView>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal
          visible={modalVisible}
          issue={selectedIssue}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  )
}

export default ViewIssues