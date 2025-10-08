import { View, Text, Modal } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Animated } from 'react-native'

const SuccessModal = ({ visible }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      }).start()
    } else {
      scaleAnim.setValue(0)
    }
  }, [visible])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-8">
        <Animated.View 
          style={{ transform: [{ scale: scaleAnim }] }}
          className="bg-white rounded-3xl p-8 items-center w-full max-w-sm"
        >
          <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
            <Ionicons name="checkmark-circle" size={50} color="#22c55e" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Report Submitted!
          </Text>
          
          <Text className="text-sm text-gray-600 text-center leading-5">
            Your report has been successfully submitted to the district assembly. You can track its progress in the issues feed.
          </Text>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default SuccessModal