import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const AdminLogin = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Login
  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Demo credentials check
      if (formData.email === 'admin@accra.gov.gh' && formData.password === 'admin123') {
        // Success - Navigate to Assembly Dashboard
        // navigation.replace('AssemblyDashboard')
        Alert.alert('Login Successful', 'Welcome to Assembly Dashboard')
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.')
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header with Gradient */}
          <View className="bg-blue-900 pb-12 pt-8 px-6">
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              className="absolute inset-0"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Logo/Icon */}
            <View className="items-center mb-6">
              <View className="w-20 h-20 rounded-2xl bg-white/20 items-center justify-center mb-4">
                <Ionicons name="shield-checkmark" size={48} color="white" />
              </View>
              <Text className="text-3xl font-bold text-white mb-2">
                Assembly Portal
              </Text>
              <Text className="text-sm text-white/90">
                District Assembly Management System
              </Text>
            </View>

            {/* Ghana Coat of Arms or Badge */}
            <View className="items-center">
              <View className="flex-row items-center bg-white/10 px-4 py-2 rounded-full">
                <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center mr-2">
                  <Text className="text-white font-bold text-xs">GH</Text>
                </View>
                <Text className="text-white text-xs font-semibold">
                  Government of Ghana
                </Text>
              </View>
            </View>
          </View>

          {/* Login Form */}
          <View className="flex-1 px-6 -mt-6">
            <View className="bg-white rounded-3xl p-6 shadow-lg">
              <Text className="text-xl font-bold text-gray-900 mb-2">
                Sign In
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                Enter your credentials to access the dashboard
              </Text>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </Text>
                <View className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border-2 ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                }`}>
                  <Ionicons name="mail-outline" size={20} color="#6b7280" />
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => {
                      setFormData({ ...formData, email: text })
                      if (errors.email) setErrors({ ...errors, email: null })
                    }}
                    placeholder="admin@assembly.gov.gh"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    className="flex-1 ml-3 text-base text-gray-900"
                  />
                </View>
                {errors.email && (
                  <Text className="text-xs text-red-500 mt-1 ml-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Password
                </Text>
                <View className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border-2 ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                }`}>
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => {
                      setFormData({ ...formData, password: text })
                      if (errors.password) setErrors({ ...errors, password: null })
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    className="flex-1 ml-3 text-base text-gray-900"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-1"
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-xs text-red-500 mt-1 ml-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="mb-6">
                <Text className="text-sm font-semibold text-green-600 text-right">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={`py-4 rounded-xl flex-row items-center justify-center ${
                  isLoading ? 'bg-gray-300' : 'bg-green-500'
                }`}
              >
                {isLoading ? (
                  <>
                    <View className="animate-spin mr-2">
                      <Ionicons name="sync" size={20} color="white" />
                    </View>
                    <Text className="text-base font-bold text-white">
                      Signing In...
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="log-in-outline" size={22} color="white" />
                    <Text className="text-base font-bold text-white ml-2">
                      Sign In
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Demo Credentials */}
              <View className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="information-circle" size={18} color="#3b82f6" />
                  <Text className="text-xs font-bold text-blue-900 ml-2">
                    Demo Credentials
                  </Text>
                </View>
                <Text className="text-xs text-blue-700">
                  Email: admin@accra.gov.gh{'\n'}
                  Password: admin123
                </Text>
              </View>
            </View>

            {/* Security Notice */}
            <View className="mt-6 px-4">
              <View className="flex-row items-start">
                <Ionicons name="shield-checkmark-outline" size={16} color="#6b7280" className="mt-0.5" />
                <Text className="text-xs text-gray-500 ml-2 leading-5 flex-1">
                  This is a secure government portal. Unauthorized access is prohibited and will be prosecuted under Ghana's cybersecurity laws.
                </Text>
              </View>
            </View>

            {/* Support Link */}
            <View className="mt-6 items-center pb-8">
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={18} color="#6b7280" />
                <Text className="text-sm text-gray-600 ml-2">
                  Need help? Contact{' '}
                  <Text className="font-semibold text-green-600">IT Support</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AdminLogin