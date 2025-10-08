import { View, Text, Modal, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import StatusBadge from './StatusBadge'

const IssueDetailModal = ({ visible, issue, onClose }) => {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(issue?.comments || [])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!issue) return null

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'Anonymous',
        text: newComment.trim(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={onClose}
            className="flex-1"
          />

          {/* Modal Content */}
          <View className="bg-white rounded-t-3xl max-h-[90%]">
            {/* Handle Bar */}
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-3" />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Close Button */}
              <View className="px-5 pt-3 pb-2 flex-row justify-end">
                <TouchableOpacity
                  onPress={onClose}
                  className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={22} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Image Gallery */}
              {issue.images && issue.images.length > 0 && (
                <View className="mb-4">
                  <ScrollView 
                    horizontal 
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                      const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width)
                      setSelectedImageIndex(index)
                    }}
                  >
                    {issue.images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        className="w-screen h-64"
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                  {issue.images.length > 1 && (
                    <View className="absolute bottom-3 self-center bg-black/60 px-3 py-1.5 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        {selectedImageIndex + 1} / {issue.images.length}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Header */}
              <View className="px-5 pb-4 border-b border-gray-100">
                <Text className="text-2xl font-bold text-gray-900 mb-3">
                  {issue.title}
                </Text>

                <View className="flex-row items-center justify-between mb-3">
                  <View className="bg-gray-100 px-3 py-1.5 rounded-lg">
                    <Text className="text-sm font-semibold text-gray-700 capitalize">
                      {issue.category.replace('-', ' ')}
                    </Text>
                  </View>
                  <StatusBadge status={issue.status} size="large" />
                </View>

                {/* Stats Row */}
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center">
                    <Ionicons name="eye-outline" size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-600 ml-1.5 font-medium">{issue.views} views</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-600 ml-1.5 font-medium">{comments.length} comments</Text>
                  </View>
                </View>
              </View>

              {/* Description */}
              <View className="px-5 py-4 border-b border-gray-100">
                <Text className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                  Description
                </Text>
                <Text className="text-base text-gray-700 leading-6">
                  {issue.description}
                </Text>
              </View>

              {/* Details */}
              <View className="px-5 py-4 border-b border-gray-100">
                <Text className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                  Details
                </Text>
                <View className="space-y-3">
                  <DetailRow 
                    icon="location" 
                    label="Location" 
                    value={issue.location}
                  />
                  <DetailRow 
                    icon="business" 
                    label="District" 
                    value={issue.district}
                  />
                  <DetailRow 
                    icon="calendar" 
                    label="Reported On" 
                    value={`${new Date(issue.reportedDate).toLocaleDateString()} at ${issue.time}`}
                  />
                  {issue.status === 'resolved' && issue.resolvedDate && (
                    <DetailRow 
                      icon="checkmark-done" 
                      label="Resolved On" 
                      value={new Date(issue.resolvedDate).toLocaleDateString()}
                    />
                  )}
                  <DetailRow 
                    icon="map" 
                    label="Coordinates" 
                    value={`${issue.coordinates.lat.toFixed(4)}, ${issue.coordinates.lng.toFixed(4)}`}
                  />
                </View>
              </View>

              {/* Comments Section */}
              <View className="px-5 py-4 bg-gray-50">
                <Text className="text-base font-bold text-gray-900 mb-4">
                  Community Comments ({comments.length})
                </Text>

                {/* Comments List */}
                <View className="space-y-3 mb-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <View key={comment.id} className="bg-white rounded-xl p-4">
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-2">
                              <Ionicons name="person" size={16} color="#22c55e" />
                            </View>
                            <Text className="text-sm font-semibold text-gray-900">
                              {comment.user}
                            </Text>
                          </View>
                          <Text className="text-xs text-gray-500">
                            {comment.date} {comment.time}
                          </Text>
                        </View>
                        <Text className="text-sm text-gray-700 leading-5">
                          {comment.text}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <View className="bg-white rounded-xl p-6 items-center">
                      <Ionicons name="chatbubbles-outline" size={40} color="#d1d5db" />
                      <Text className="text-sm text-gray-500 mt-2">No comments yet</Text>
                      <Text className="text-xs text-gray-400 mt-1">Be the first to comment</Text>
                    </View>
                  )}
                </View>

                {/* Add Comment Input */}
                <View className="bg-white rounded-xl p-3 border-2 border-gray-200">
                  <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Add a comment..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    className="text-sm text-gray-900 min-h-[60px] max-h-[120px] mb-2"
                  />
                  <TouchableOpacity 
                    onPress={handleAddComment}
                    disabled={!newComment.trim()}
                    className={`py-2.5 rounded-lg flex-row items-center justify-center ${
                      newComment.trim() ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <Ionicons 
                      name="send" 
                      size={18} 
                      color={newComment.trim() ? 'white' : '#9ca3af'} 
                    />
                    <Text className={`text-sm font-semibold ml-2 ${
                      newComment.trim() ? 'text-white' : 'text-gray-400'
                    }`}>
                      Post Comment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="px-5 py-4 pb-6 flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-gray-100 py-3.5 rounded-xl flex-row items-center justify-center">
                  <Ionicons name="share-social-outline" size={20} color="#374151" />
                  <Text className="text-sm font-semibold text-gray-700 ml-2">Share</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-green-500 py-3.5 rounded-xl flex-row items-center justify-center">
                  <Ionicons name="navigate-outline" size={20} color="white" />
                  <Text className="text-sm font-semibold text-white ml-2">Navigate</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

// Helper Component
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

export default IssueDetailModal