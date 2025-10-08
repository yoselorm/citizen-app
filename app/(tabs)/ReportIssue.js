import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import CategorySelector from '../../components/CategorySelector'
import ImageGallery from '../../components/ImageGallery'
import LocationPicker from '../../components/LocationPicker'
import SuccessModal from '../../components/SuccessModal'

const ReportIssue = ({ navigation }) => {
  const [step, setStep] = useState(1) // 1: Category, 2: Details, 3: Location & Images
  const [formData, setFormData] = useState({
    category: null,
    title: '',
    description: '',
    location: null,
    district: '',
    images: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Categories data
  const categories = [
    { 
      id: 'sanitation', 
      name: 'Sanitation', 
      icon: '🗑️',
      description: 'Waste disposal, drainage, cleaning',
      color: '#ef4444'
    },
    { 
      id: 'water', 
      name: 'Water Supply', 
      icon: '💧',
      description: 'Pipeline issues, water shortage',
      color: '#3b82f6'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: '🚨',
      description: 'Streetlights, safety concerns',
      color: '#f59e0b'
    },
    { 
      id: 'roads', 
      name: 'Roads', 
      icon: '🛣️',
      description: 'Potholes, road damage',
      color: '#8b5cf6'
    },
    { 
      id: 'electricity', 
      name: 'Electricity', 
      icon: '💡',
      description: 'Power outages, electrical issues',
      color: '#ec4899'
    },
    { 
      id: 'others', 
      name: 'Others', 
      icon: '📋',
      description: 'Other community issues',
      color: '#6b7280'
    }
  ]

  // Get current location
  const getCurrentLocation = async () => {
    try {
      setIsLoading(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions to continue')
        setIsLoading(false)
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords

      // Reverse geocode to get address
      const address = await Location.reverseGeocodeAsync({ latitude, longitude })
      
      if (address.length > 0) {
        const addr = address[0]
        const locationString = `${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`.trim()
        
        setFormData(prev => ({
          ...prev,
          location: { lat: latitude, lng: longitude },
          district: addr.city || addr.region || 'Unknown District'
        }))

        Alert.alert('Location Detected', locationString)
      }
      
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Alert.alert('Error', 'Failed to get location. Please try again.')
    }
  }

  // Pick images
  const pickImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable photo permissions to continue')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 5
      })

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri)
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
        }))
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images')
    }
  }

  // Take photo
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable camera permissions to continue')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
        allowsEditing: true
      })

      if (!result.canceled && result.assets) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, result.assets[0].uri].slice(0, 5)
        }))
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo')
    }
  }

  // Remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      title: category.name + ' Issue'
    }))
    setStep(2)
  }

  // Validate and submit
  const handleSubmit = async () => {
    // Validation
    if (!formData.category) {
      Alert.alert('Missing Information', 'Please select a category')
      return
    }
    if (!formData.description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description')
      return
    }
    if (!formData.location) {
      Alert.alert('Missing Information', 'Please add location')
      return
    }
    if (formData.images.length === 0) {
      Alert.alert('Missing Information', 'Please add at least one image')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Here you would upload images and submit to your backend
      console.log('Submitting report:', formData)

      setIsLoading(false)
      setShowSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          category: null,
          title: '',
          description: '',
          location: null,
          district: '',
          images: []
        })
        setStep(1)
        // navigation.goBack() or navigation.navigate('ViewIssues')
      }, 2500)

    } catch (error) {
      setIsLoading(false)
      Alert.alert('Error', 'Failed to submit report. Please try again.')
    }
  }

  const canProceed = () => {
    if (step === 1) return formData.category !== null
    if (step === 2) return formData.description.trim().length > 0
    if (step === 3) return formData.location !== null && formData.images.length > 0
    return false
  }

  const getStepTitle = () => {
    if (step === 1) return 'Select Category'
    if (step === 2) return 'Describe the Issue'
    return 'Location & Photos'
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            onPress={() => {
              if (step > 1) {
                setStep(step - 1)
              } else {
                // navigation.goBack()
              }
            }}
            className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>

          <View className="flex-1 ml-4">
            <Text className="text-xl font-bold text-gray-900">{getStepTitle()}</Text>
            <Text className="text-xs text-gray-500">Step {step} of 3</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="flex-row gap-2">
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              className={`flex-1 h-1.5 rounded-full ${
                s <= step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <CategorySelector
            categories={categories}
            selectedCategory={formData.category}
            onSelect={handleCategorySelect}
          />
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <View className="px-5 pt-6">
            {/* Selected Category Display */}
            <View className="bg-white rounded-2xl p-4 mb-6 flex-row items-center border-2 border-green-200">
              <Text className="text-4xl mr-3">
                {categories.find(c => c.id === formData.category)?.icon}
              </Text>
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-0.5">Category</Text>
                <Text className="text-lg font-bold text-gray-900">
                  {categories.find(c => c.id === formData.category)?.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setStep(1)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="pencil" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-2">
                Issue Title <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Brief title for the issue"
                className="bg-white rounded-xl px-4 py-3.5 text-base text-gray-900 border-2 border-gray-200"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Description Input */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-bold text-gray-700">
                  Description <Text className="text-red-500">*</Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  {formData.description.length}/500
                </Text>
              </View>
              <TextInput
                value={formData.description}
                onChangeText={(text) => {
                  if (text.length <= 500) {
                    setFormData({ ...formData, description: text })
                  }
                }}
                placeholder="Describe the issue in detail... What happened? When did you notice it? How is it affecting the community?"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-white rounded-xl px-4 py-3.5 text-base text-gray-900 border-2 border-gray-200 min-h-[140px]"
                placeholderTextColor="#9ca3af"
              />
              <Text className="text-xs text-gray-500 mt-2">
                💡 Tip: Include specific details like time, location markers, and impact
              </Text>
            </View>
          </View>
        )}

        {/* Step 3: Location & Images */}
        {step === 3 && (
          <View className="px-5 pt-6">
            {/* Location Section */}
            <LocationPicker
              location={formData.location}
              district={formData.district}
              onDetectLocation={getCurrentLocation}
              isLoading={isLoading}
            />

            {/* Images Section */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-bold text-gray-700">
                  Photos <Text className="text-red-500">*</Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  {formData.images.length}/5 photos
                </Text>
              </View>

              {/* Image Gallery */}
              <ImageGallery
                images={formData.images}
                onRemove={removeImage}
                onAddFromGallery={pickImages}
                onTakePhoto={takePhoto}
              />

              <Text className="text-xs text-gray-500 mt-2">
                📸 Add clear photos showing the issue from different angles
              </Text>
            </View>

            {/* Anonymous Notice */}
            <View className="bg-blue-50 rounded-2xl p-4 flex-row items-start border border-blue-200">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="shield-checkmark" size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-blue-900 mb-1">
                  Anonymous Reporting
                </Text>
                <Text className="text-xs text-blue-700 leading-5">
                  Your identity will remain anonymous. Only the issue details and location will be shared with the assembly.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4">
        {step < 3 ? (
          <TouchableOpacity
            onPress={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`py-4 rounded-xl flex-row items-center justify-center ${
              canProceed() ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <Text className={`text-base font-bold mr-2 ${
              canProceed() ? 'text-white' : 'text-gray-400'
            }`}>
              Continue
            </Text>
            <Ionicons 
              name="arrow-forward" 
              size={20} 
              color={canProceed() ? 'white' : '#9ca3af'} 
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!canProceed() || isLoading}
            className={`py-4 rounded-xl flex-row items-center justify-center ${
              canProceed() && !isLoading ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            {isLoading ? (
              <>
                <View className="animate-spin mr-2">
                  <Ionicons name="sync" size={20} color="white" />
                </View>
                <Text className="text-base font-bold text-white">
                  Submitting...
                </Text>
              </>
            ) : (
              <>
                <Ionicons 
                  name="checkmark-circle" 
                  size={22} 
                  color={canProceed() ? 'white' : '#9ca3af'} 
                />
                <Text className={`text-base font-bold ml-2 ${
                  canProceed() ? 'text-white' : 'text-gray-400'
                }`}>
                  Submit Report
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Success Modal */}
      <SuccessModal visible={showSuccess} />
    </SafeAreaView>
  )
}

export default ReportIssue