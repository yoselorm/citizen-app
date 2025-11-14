import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import IssueManagementCard from '../../components/IssueManagementCard'
import QuickStats from '../../components/QuickStats'
import CategoryBreakdown from '../../components/CategoryBreakdown'
import IssueDetailSheet from '../../components/IssueDetailSheet'

const Portal = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, in-progress

  // Mock assembly info (would come from auth)
  const assemblyInfo = {
    name: 'Accra Metropolitan Assembly',
    district: 'Accra',
    officer: 'Kwame Mensah',
    role: 'District Officer'
  }

  // Mock issues data
  const [issues, setIssues] = useState([
    {
      id: 1,
      category: 'sanitation',
      title: 'Indiscriminate waste dumping',
      description: 'Large pile of rubbish dumped near main market entrance. Creating health hazard.',
      location: 'Makola Market, Accra',
      coordinates: { lat: 5.6037, lng: -0.1870 },
      status: 'pending',
      priority: 'high',
      reportedDate: '2025-10-05T09:30:00',
      images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800'],
      reporter: 'Anonymous',
      views: 234,
      icon: '🗑️'
    },
    {
      id: 2,
      category: 'water',
      title: 'Broken water pipeline',
      description: 'Main water pipeline burst causing flooding on the street.',
      location: 'Osu, Accra',
      coordinates: { lat: 5.6098, lng: -0.1920 },
      status: 'in-progress',
      priority: 'high',
      reportedDate: '2025-10-04T14:15:00',
      assignedTo: 'Water Department',
      images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'],
      reporter: 'Anonymous',
      views: 189,
      icon: '💧'
    },
    {
      id: 3,
      category: 'roads',
      title: 'Dangerous pothole',
      description: 'Large pothole causing damage to vehicles.',
      location: 'Spintex Road, Accra',
      coordinates: { lat: 5.6450, lng: -0.1234 },
      status: 'pending',
      priority: 'high',
      reportedDate: '2025-10-06T11:20:00',
      images: ['https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800'],
      reporter: 'Anonymous',
      views: 312,
      icon: '🛣️'
    },
    {
      id: 4,
      category: 'security',
      title: 'Streetlight not working',
      description: 'Area unsafe at night due to broken streetlight.',
      location: 'Labone, Accra',
      coordinates: { lat: 5.6120, lng: -0.1850 },
      status: 'in-progress',
      priority: 'medium',
      reportedDate: '2025-10-03T18:45:00',
      assignedTo: 'Electrical Unit',
      images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'],
      reporter: 'Anonymous',
      views: 156,
      icon: '💡'
    }
  ])

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: 12, // Mock resolved count
    avgResponseTime: '2.5 hours',
    completionRate: 78
  }

  const categoryData = [
    { name: 'Sanitation', count: 15, percentage: 35, color: '#ef4444' },
    { name: 'Water', count: 12, percentage: 28, color: '#3b82f6' },
    { name: 'Roads', count: 8, percentage: 19, color: '#8b5cf6' },
    { name: 'Security', count: 5, percentage: 12, color: '#f59e0b' },
    { name: 'Others', count: 3, percentage: 6, color: '#6b7280' }
  ]

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  const handleIssuePress = (issue) => {
    setSelectedIssue(issue)
    setDetailVisible(true)
  }

  const handleStatusUpdate = (issueId, newStatus, assignedTo) => {
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus, assignedTo: assignedTo || issue.assignedTo }
        : issue
    ))
    setDetailVisible(false)
  }

  const filteredIssues = filterStatus === 'all' 
    ? issues 
    : issues.filter(i => i.status === filterStatus)

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white">
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          className="px-5 pt-4 pb-6"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-xs text-white/80 mb-1">Welcome back,</Text>
              <Text className="text-xl font-bold text-white mb-0.5">
                {assemblyInfo.officer}
              </Text>
              <Text className="text-xs text-white/90">
                {assemblyInfo.role} • {assemblyInfo.district}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => {/* Show menu */}}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <Ionicons name="notifications-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Quick Action Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 bg-white/20 rounded-xl p-3 flex-row items-center justify-center">
              <Ionicons name="map-outline" size={18} color="white" />
              <Text className="text-white font-semibold text-xs ml-2">Map View</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white/20 rounded-xl p-3 flex-row items-center justify-center">
              <Ionicons name="stats-chart-outline" size={18} color="white" />
              <Text className="text-white font-semibold text-xs ml-2">Reports</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Stats */}
        <View className="px-5 pt-5">
          <QuickStats stats={stats} />
        </View>

        {/* Category Breakdown */}
        <View className="px-5 pt-5">
          <CategoryBreakdown data={categoryData} />
        </View>

        {/* Issues Management Section */}
        <View className="px-5 pt-5 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Active Issues
            </Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-green-700">
                {filteredIssues.length} issues
              </Text>
            </View>
          </View>

          {/* Status Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ gap: 8 }}
          >
            {[
              { id: 'all', label: 'All Issues', count: issues.length },
              { id: 'pending', label: 'Pending', count: stats.pending },
              { id: 'in-progress', label: 'In Progress', count: stats.inProgress }
            ].map(filter => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setFilterStatus(filter.id)}
                className={`px-4 py-2 rounded-xl flex-row items-center ${
                  filterStatus === filter.id ? 'bg-green-500' : 'bg-white border border-gray-200'
                }`}
              >
                <Text className={`font-semibold text-sm ${
                  filterStatus === filter.id ? 'text-white' : 'text-gray-700'
                }`}>
                  {filter.label}
                </Text>
                <View className={`ml-2 px-2 py-0.5 rounded-full ${
                  filterStatus === filter.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  <Text className={`text-xs font-bold ${
                    filterStatus === filter.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {filter.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Issues List */}
          <View className="gap-3">
            {filteredIssues.map(issue => (
              <IssueManagementCard
                key={issue.id}
                issue={issue}
                onPress={() => handleIssuePress(issue)}
              />
            ))}
          </View>

          {filteredIssues.length === 0 && (
            <View className="bg-white rounded-2xl p-8 items-center">
              <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-3">
                <Ionicons name="checkmark-done-outline" size={32} color="#9ca3af" />
              </View>
              <Text className="text-base font-bold text-gray-900 mb-1">
                All Clear!
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                No {filterStatus} issues at the moment
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Issue Detail Sheet */}
      {selectedIssue && (
        <IssueDetailSheet
          visible={detailVisible}
          issue={selectedIssue}
          onClose={() => setDetailVisible(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </SafeAreaView>
  )
}

export default Portal