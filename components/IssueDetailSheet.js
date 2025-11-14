import { View, Text, Modal, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const IssueDetailSheet = ({ visible, issue, onClose, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(issue.status)
  const [assignTo, setAssignTo] = useState(issue.assignedTo || '')
  const [notes, setNotes] = useState('')

  const departments = [
    'Sanitation Department',
    'Water Department',
    'Roads Department',
    'Electrical Unit',
    'Security Unit'
  ]

  const handleUpdate = () => {
    onStatusUpdate(issue.id, selectedStatus, assignTo)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1"
        />

        <View className="bg-white rounded-t-3xl max-h-[85%]">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-3 mb-4" />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-5 pb-4 border-b border-gray-100">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-5xl">{issue.icon}</Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={22} color="#6b7280" />
                </TouchableOpacity>
              </View>

              <Text className="text-xl font-bold text-gray-900 mb-2">
                {issue.title}
              </Text>
              <Text className="text-sm text-gray-600">
                {issue.description}
              </Text>
            </View>

            {/* Images */}
            {issue.images && issue.images.length > 0 && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="px-5 py-4 border-b border-gray-100"
                contentContainerStyle={{ gap: 12 }}
              >
                {issue.images.map((img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img }}
                    className="w-32 h-32 rounded-xl"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            )}

            {/* Details */}
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                Issue Details
              </Text>
              <View className="space-y-3">
                <DetailRow icon="location" label="Location" value={issue.location} />
                <DetailRow icon="calendar" label="Reported" value={new Date(issue.reportedDate).toLocaleString()} />
                <DetailRow icon="eye" label="Views" value={issue.views} />
                <DetailRow icon="person" label="Reporter" value={issue.reporter} />
              </View>
            </View>

            {/* Status Management */}
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-900 mb-3">
                Update Status
              </Text>
              <View className="flex-row gap-2 mb-4">
                {['pending', 'in-progress', 'resolved'].map(status => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => setSelectedStatus(status)}
                    className={`flex-1 py-3 rounded-xl ${
                      selectedStatus === status ? 'bg-green-500' : 'bg-gray-100'
                    }`}
                  >
                    <Text className={`text-center text-xs font-bold ${
                      selectedStatus === status ? 'text-white' : 'text-gray-600'
                    }`}>
                      {status.replace('-', ' ').toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Assign Department */}
              <Text className="text-sm font-bold text-gray-900 mb-2">
                Assign To
              </Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3 border-2 border-gray-200 mb-4">
                <TextInput
                  value={assignTo}
                  onChangeText={setAssignTo}
                  placeholder="Select department..."
                  className="text-sm text-gray-900"
                />
              </View>

              {/* Notes */}
              <Text className="text-sm font-bold text-gray-900 mb-2">
                Add Notes (Optional)
              </Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any additional information..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="bg-gray-50 rounded-xl px-4 py-3 border-2 border-gray-200 text-sm text-gray-900"
              />
            </View>

            {/* Actions */}
            <View className="px-5 py-4 pb-6 flex-row gap-3">
              <TouchableOpacity 
                onPress={onClose}
                className="flex-1 bg-gray-100 py-3.5 rounded-xl"
              >
                <Text className="text-center text-sm font-bold text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleUpdate}
                className="flex-1 bg-green-500 py-3.5 rounded-xl"
              >
                <Text className="text-center text-sm font-bold text-white">
                  Update Issue
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const DetailRow = ({ icon, label, value }) => (
  <View className="flex-row items-center">
    <View className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center mr-3">
      <Ionicons name={icon} size={18} color="#6b7280" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-500 mb-0.5">{label}</Text>
      <Text className="text-sm font-medium text-gray-900">{value}</Text>
    </View>
  </View>
)

export default IssueDetailSheet