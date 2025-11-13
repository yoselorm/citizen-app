import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('week') // 'week', 'month', 'year'
  const [menuVisible, setMenuVisible] = useState(false)
  const [selectedView, setSelectedView] = useState('analytics') // 'analytics', 'citizen', 'assembly'
  const screenWidth = Dimensions.get('window').width

  // Mock data for analytics
  const stats = {
    totalIssues: 1247,
    resolved: 892,
    pending: 218,
    inProgress: 137,
    avgResolutionTime: 3.2, // days
    citizenEngagement: 78 // percentage
  }

  // Trend data for line chart
  const trendData = {
    labels: timeframe === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeframe === 'month'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: timeframe === 'week'
        ? [12, 19, 15, 25, 22, 18, 24]
        : timeframe === 'month'
        ? [45, 52, 48, 61]
        : [142, 156, 148, 172, 165, 189],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 3
    }]
  }

  // Category distribution for pie chart
  const categoryData = [
    {
      name: 'Sanitation',
      population: 425,
      color: '#ef4444',
      legendFontColor: '#374151',
      legendFontSize: 12
    },
    {
      name: 'Water',
      population: 312,
      color: '#3b82f6',
      legendFontColor: '#374151',
      legendFontSize: 12
    },
    {
      name: 'Security',
      population: 198,
      color: '#f59e0b',
      legendFontColor: '#374151',
      legendFontSize: 12
    },
    {
      name: 'Roads',
      population: 176,
      color: '#8b5cf6',
      legendFontColor: '#374151',
      legendFontSize: 12
    },
    {
      name: 'Electricity',
      population: 136,
      color: '#ec4899',
      legendFontColor: '#374151',
      legendFontSize: 12
    }
  ]

  // Resolution rate by district (bar chart)
  const districtData = {
    labels: ['Accra', 'Kumasi', 'Tema', 'Cape Coast'],
    datasets: [{
      data: [87, 72, 81, 65]
    }]
  }

  // Top performing districts
  const topDistricts = [
    { name: 'Accra Metropolitan', resolved: 342, rate: 87, trend: 'up' },
    { name: 'Kumasi Metropolitan', resolved: 289, rate: 81, trend: 'up' },
    { name: 'Tema Metropolitan', resolved: 156, rate: 78, trend: 'down' },
    { name: 'Cape Coast Metropolitan', resolved: 105, rate: 65, trend: 'up' }
  ]

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#22c55e'
    }
  }

  const barChartConfig = {
    ...chartConfig,
    barPercentage: 0.7,
    fillShadowGradient: '#22c55e',
    fillShadowGradientOpacity: 1
  }

  const handleViewChange = () => {
    // setSelectedView(view)
    setMenuVisible(false)
    router.push('/(admin)')
    // Here you would navigate to the respective screen
    // navigation.navigate(view)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header with Menu Button */}
      <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Analytics</Text>
          <Text className="text-sm text-gray-500">Performance metrics</Text>
        </View>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          className="w-10 h-10 rounded-full bg-green-50 items-center justify-center"
        >
          <Ionicons name="menu" size={24} color="#22c55e" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Timeframe Selector */}
        <View className="flex-row px-5 gap-2 my-5">
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setTimeframe(period)}
              className={`flex-1 py-3 px-4 rounded-xl ${
                timeframe === period ? 'bg-green-500' : 'bg-white shadow-sm'
              }`}
            >
              <Text className={`text-center font-semibold ${
                timeframe === period ? 'text-white' : 'text-gray-600'
              }`}>
                {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'This Year'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

                {/* Issues Trend Chart */}
                <View className="px-5 mb-6">
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-base font-bold text-gray-900">
                Issues Trend
              </Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-xs text-gray-500 font-medium">Reports</Text>
              </View>
            </View>
            <LineChart
              data={trendData}
              width={screenWidth - 80}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{
                borderRadius: 12,
                marginVertical: 8
              }}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={true}
            />
          </View>
        </View>

        {/* Key Metrics Grid */}
        <View className="px-5 mb-6">
          <View className="flex-row gap-3 mb-3">
            {/* Total Issues */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center mb-3">
                <Ionicons name="document-text" size={22} color="#3b82f6" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {stats.totalIssues.toLocaleString()}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">Total Issues</Text>
            </View>

            {/* Resolved */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="w-10 h-10 rounded-xl bg-green-100 items-center justify-center mb-3">
                <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {stats.resolved}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">Resolved</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            {/* In Progress */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="w-10 h-10 rounded-xl bg-yellow-100 items-center justify-center mb-3">
                <Ionicons name="time" size={22} color="#f59e0b" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {stats.inProgress}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">In Progress</Text>
            </View>

            {/* Pending */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="w-10 h-10 rounded-xl bg-red-100 items-center justify-center mb-3">
                <Ionicons name="alert-circle" size={22} color="#ef4444" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {stats.pending}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">Pending</Text>
            </View>
          </View>
        </View>

        {/* Performance Indicators */}
        <View className="px-5 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-500">
              <Text className="text-xs text-gray-500 font-semibold mb-2">
                Avg. Resolution Time
              </Text>
              <Text className="text-3xl font-bold text-gray-900">
                {stats.avgResolutionTime}
                <Text className="text-lg text-gray-500"> days</Text>
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-down" size={16} color="#22c55e" />
                <Text className="text-xs text-green-500 ml-1 font-semibold">
                  15% faster
                </Text>
              </View>
            </View>

            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-500">
              <Text className="text-xs text-gray-500 font-semibold mb-2">
                Citizen Engagement
              </Text>
              <Text className="text-3xl font-bold text-gray-900">
                {stats.citizenEngagement}
                <Text className="text-lg text-gray-500">%</Text>
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#3b82f6" />
                <Text className="text-xs text-blue-500 ml-1 font-semibold">
                  8% increase
                </Text>
              </View>
            </View>
          </View>
        </View>



        {/* Category Distribution */}
        <View className="px-5 mb-6">
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <Text className="text-base font-bold text-gray-900 mb-4">
              Issues by Category
            </Text>
            <PieChart
              data={categoryData}
              width={screenWidth - 80}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={{
                borderRadius: 12
              }}
            />
          </View>
        </View>

        {/* District Performance */}
        <View className="px-5 mb-6">
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <Text className="text-base font-bold text-gray-900 mb-4">
              Resolution Rate by District
            </Text>
            <BarChart
              data={districtData}
              width={screenWidth - 80}
              height={200}
              chartConfig={barChartConfig}
              style={{
                borderRadius: 12,
                marginVertical: 8
              }}
              showValuesOnTopOfBars
              withInnerLines={false}
              fromZero
            />
          </View>
        </View>

        {/* Top Performing Districts */}
        <View className="px-5 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Top Performing Districts
          </Text>
          {topDistricts.map((district, index) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3">
                  <Text className="text-base font-bold text-gray-600">
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-900 mb-0.5">
                    {district.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {district.resolved} issues resolved
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <View className="flex-row items-center mb-0.5">
                  <Text className="text-lg font-bold text-gray-900">
                    {district.rate}%
                  </Text>
                  <Ionicons
                    name={district.trend === 'up' ? 'trending-up' : 'trending-down'}
                    size={18}
                    color={district.trend === 'up' ? '#22c55e' : '#ef4444'}
                    style={{ marginLeft: 4 }}
                  />
                </View>
                <View className={`px-2 py-1 rounded-xl ${
                  district.rate >= 80 ? 'bg-green-100' : district.rate >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Text className={`text-[10px] font-semibold ${
                    district.rate >= 80 ? 'text-green-700' : district.rate >= 70 ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {district.rate >= 80 ? 'EXCELLENT' : district.rate >= 70 ? 'GOOD' : 'NEEDS WORK'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* View Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View className="flex-1 justify-end">
          {/* Backdrop */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
            className="flex-1 bg-black/50"
          />
          
          {/* Menu Content */}
          <View className="bg-white rounded-t-3xl px-5 pb-8 pt-6">
            {/* Handle Bar */}
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
            
            <Text className="text-xl font-bold text-gray-900 mb-4">Select View</Text>
            
            {/* Citizen View Option */}
            <TouchableOpacity
              onPress={() => handleViewChange('citizen')}
              className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-3 active:bg-gray-100"
            >
              <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-4">
                <Ionicons name="people" size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  Citizen View
                </Text>
                <Text className="text-xs text-gray-500">
                  Report and track community issues
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Assembly Dashboard Option */}
            <TouchableOpacity
              onPress={() => handleViewChange()}
              // onPress={() => router.push('/(admin)')}

              className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-3 active:bg-gray-100"
            >
              <View className="w-12 h-12 rounded-xl bg-green-100 items-center justify-center mr-4">
                <Ionicons name="business" size={24} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  Assembly Dashboard
                </Text>
                <Text className="text-xs text-gray-500">
                  Manage and resolve reported issues
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Analytics Option (Current) */}
            <TouchableOpacity
              onPress={() => handleViewChange('analytics')}
              className="flex-row items-center bg-green-50 rounded-2xl p-4 border-2 border-green-500"
            >
              <View className="w-12 h-12 rounded-xl bg-green-100 items-center justify-center mr-4">
                <Ionicons name="bar-chart" size={24} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  Analytics View
                </Text>
                <Text className="text-xs text-gray-500">
                  View performance metrics and insights
                </Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              className="mt-4 bg-gray-100 rounded-2xl p-4 items-center active:bg-gray-200"
            >
              <Text className="text-base font-semibold text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Analytics